import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { TabData } from 'shared/types/Tab';
import SelectableWindow from './SelectableWindow';

type SelectionHandler = (tabs: TabData[][]) => void;
interface OpenTabProps {
  className: string;
  onSelectionChange: SelectionHandler;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function OpenTabs(props: OpenTabProps) {
  const def: chrome.windows.Window[] = [];
  const [windows, setWindows] = useState(def);
  const [currWin, setCurr] = useState(-1);

  const selRef = useRef([] as TabData[][]);

  const addListeners = () => {
    chrome.tabs.onUpdated.addListener(
      (
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        tab: chrome.tabs.Tab
      ) => {
        if (changeInfo.title || changeInfo.url) {
          getWindows();
        }
      }
    );

    chrome.tabs.onAttached.addListener(
      (tabId: number, attachInfo: chrome.tabs.TabAttachInfo) => {
        getWindows();
      }
    );

    chrome.tabs.onRemoved.addListener((tabId: number) => {
      getWindows();
    });
  };

  //TODO: check perf of this
  addListeners();

  const getWindows = () => {
    chrome.windows.getCurrent({}, (curr) => {
      chrome.windows.getAll(
        { populate: true },
        (windows: chrome.windows.Window[]) => {
          setWindows(windows);
          setCurr(curr.id!);
        }
      );
    });
  };

  useEffect(() => {
    getWindows();
  }, []);

  const reordered = [...windows];

  if (typeof windows[0] != 'undefined') {
    const curr = windows.findIndex((window) => window.id === currWin);

    //to, from
    reordered.splice(0, 0, reordered.splice(curr, 1)[0]);
  }

  const onSelectionChange = (tabs: TabData[], id: number) => {
    selRef.current[id] = tabs;
    props.onSelectionChange(selRef.current);
  };

  const Windows = reordered.map((window, i) => (
    <SelectableWindow
      {...window}
      key={window.id}
      i={i}
      selectionHandler={onSelectionChange}
    ></SelectableWindow>
  ));

  return <div className={props.className}>{Windows}</div>;
}

export type { SelectionHandler };
