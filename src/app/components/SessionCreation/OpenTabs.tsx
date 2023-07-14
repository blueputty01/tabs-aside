import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { TabData } from 'shared/types/Tab';
import SelectableWindow from './SelectableWindow';

type SelectionHandler = (tabs: TabData[][]) => void;
interface OpenTabProps {
  // className: string;
  onSelectionChange: SelectionHandler;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface WindowStore {
  [key: number]: TabData[];
}

export default function OpenTabs(props: OpenTabProps) {
  const [windows, setWindows] = useState([] as chrome.windows.Window[]);
  const [currWin, setCurr] = useState(-1);

  const selRef = useRef({} as WindowStore);

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
    addListeners();
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
    const vals = Object.values(selRef.current);
    props.onSelectionChange(vals);
  };

  const Windows = reordered.map((window, i) => {
    return (
      <SelectableWindow
        key={window.id}
        index={i == 0 ? -1 : i + 1}
        selectionHandler={onSelectionChange}
        tabs={window.tabs as unknown as TabData[]}
      />
    );
  });

  return (
    <div className="flex flex-col overflow-y-auto rounded-lg border-2 border-slate-300">
      {Windows}
    </div>
  );
}

export type { SelectionHandler };
