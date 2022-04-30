import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionCreate.scss';
import Window from './Window';

import { WindowSelectionHandler } from './Window';
import { TabData } from './Tab';

type SelectionHandler = (tabs: TabData[]) => void;

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

  const selRef = useRef([] as TabData[]);

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
    if (windows == []) {
      return;
    }
    getWindows();
  }, []);

  const reordered = [...windows];

  if (typeof windows[0] != 'undefined') {
    const curr = windows.findIndex((window) => window.id === currWin);

    //to, from
    reordered.splice(0, 0, reordered.splice(curr, 1)[0]);
  }

  const onSelectionChange: WindowSelectionHandler = (tabs) => {
    selRef.current = [...selRef.current, ...tabs];
    props.onSelectionChange(selRef.current);
  };

  const windowElements = reordered.map((window, i) => (
    <Window
      {...window}
      key={window.id}
      i={i}
      selectionHandler={onSelectionChange}
    ></Window>
  ));

  return <div className={props.className}>{windowElements}</div>;
}

export type { SelectionHandler };
