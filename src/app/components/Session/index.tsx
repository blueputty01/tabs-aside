import { MouseEventHandler, useRef, useState } from 'react';
import styles from './index.scss';
import SessionData from 'shared/types/Session';
import { TabData, TabStore } from 'shared/types/Tab';
import Window from './SessionWindow';

export type actionHandler = (
  e: React.MouseEvent<HTMLButtonElement>,
  id: string
) => void;
interface SessionComponentProps extends SessionData {
  deleteHandler: actionHandler;
  rightClickHandler: actionHandler;
  overflowClickHandler: actionHandler;
}

export default function Session(props: SessionComponentProps) {
  const divRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const openAll = () => {
    console.log(props);
    props.windows.forEach((savedWindow: TabStore[]) => {
      const urls = savedWindow.map((tab: TabStore) => {
        return tab.url;
      });
      chrome.windows.create({ url: urls });
    });
  };

  const mouseIn = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const mouseOut = (e: React.MouseEvent) => {
    if (e.target === divRef.current) {
      setHover(false);
    }
  };

  const toggle = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
  };

  console.log(props.windows);

  const Tabs = props.windows.map((window, i) => {
    const idSet = new Set();

    const tabData = window.map((tab): TabData => {
      let id = tab.title;
      if (!idSet.has(id)) {
        let i = 0;
        let newId = id;
        while (idSet.has(newId)) {
          newId = `${id} ${i}`;
          i++;
        }
        id = newId;
      }
      idSet.add(id);
      return {
        ...tab,
        id,
      };
    }) as TabData[];

    return <Window key={window.length} index={i + 1} tabs={tabData}></Window>;
  });

  return (
    <div
      className={[
        styles.session,
        isOpen ? styles.selected : styles.collapsed,
      ].join(' ')}
    >
      <div
        ref={divRef}
        onMouseOver={mouseIn}
        onMouseOut={mouseOut}
        onClick={toggle}
        className={[styles.titleBar, hover ? styles.hover : ''].join(' ')}
      >
        <div className={styles.title}>{props.title}</div>
        <div className={styles.buttonContainer}>
          <button onClick={openAll}>Open All</button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              props.overflowClickHandler(e, props.id);
            }}
          >
            ⋮
          </button>
        </div>
      </div>
      {isOpen && <div className={styles.windows}>{Tabs}</div>}
    </div>
  );
}
