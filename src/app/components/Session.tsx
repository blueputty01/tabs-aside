import { MouseEventHandler, useRef, useState } from 'react';
import styles from './Session.scss';
import SessionData from 'shared/types/Session';
import { TabStore } from 'shared/types/Tab';
import { ifError } from 'assert';

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
    const div = divRef.current! as HTMLElement;
    if (e.target === divRef.current) {
      setHover(false);
    }
  };

  const toggle = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
  };

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
    </div>
  );
}
