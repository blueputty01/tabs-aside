import SelectableWindow from './SelectableWindow';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';
import type { TabData } from 'shared/types/Tab';

type SelectionHandler = (tabs: TabData[][]) => void;
interface OpenTabProps {
  className?: string;
  onSelectionChange: SelectionHandler;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface WindowStore {
  [key: number]: TabData[];
}

export default function OpenTabs({
  onSelectionChange,
  className,
}: OpenTabProps) {
  const [openWindows, setWindows] = useState([] as chrome.windows.Window[]);
  const [currWin, setCurr] = useState(-1);

  const selRef = useRef({} as WindowStore);

  const getWindows = async () => {
    const currentWindow = await chrome.windows.getCurrent({});
    const windowResult = await chrome.windows.getAll({ populate: true });

    setWindows(windowResult);
    setCurr(currentWindow.id!);
  };

  const addListeners = () => {
    chrome.tabs.onUpdated.addListener(
      (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
        // if the title or url changes, update the window list
        if (changeInfo.title || changeInfo.url) {
          getWindows();
        }
      }
    );

    chrome.tabs.onAttached.addListener(getWindows);
    chrome.tabs.onRemoved.addListener(getWindows);
  };

  useEffect(() => {
    addListeners();
    getWindows();
  }, []);

  const reordered = [...openWindows];

  if (typeof openWindows[0] !== 'undefined') {
    const curr = openWindows.findIndex((window) => window.id === currWin);

    // to, from
    reordered.splice(0, 0, reordered.splice(curr, 1)[0]);
  }

  const selectionHandler = (tabs: TabData[], id: number) => {
    selRef.current[id] = tabs;
    const vals = Object.values(selRef.current);
    onSelectionChange(vals);
  };

  const Windows = reordered.map((window, i) => (
    <SelectableWindow
      key={window.id}
      index={i === 0 ? -1 : i + 1}
      selectionHandler={selectionHandler}
      tabs={window.tabs as unknown as TabData[]}
    />
  ));

  return (
    <div
      className={classnames(
        className,
        'flex flex-col overflow-y-auto rounded border-y-2 border-slate-300'
      )}
    >
      {Windows}
    </div>
  );
}

export type { SelectionHandler };
