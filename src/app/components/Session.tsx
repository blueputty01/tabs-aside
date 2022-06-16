import { MouseEventHandler } from 'react';
import styles from './Session.scss';
import SessionStore from 'shared/types/Session';

interface SessionComponentProps extends SessionStore {
  deleteHandler: MouseEventHandler;
  rightClickHandler: MouseEventHandler;
  overflowClickHandler: MouseEventHandler;
}

interface TabStore {
  title: string;
  url: string;
}

export default function Session(props: SessionComponentProps) {
  const openAll = () => {
    props.tabs.forEach((savedWindow: TabStore[]) => {
      const urls = savedWindow.map((tab: TabStore) => {
        return tab.url;
      });
      chrome.windows.create({ url: urls });
    });
  };

  return (
    <div className={[styles.session, styles.collapsed].join(' ')}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.buttonContainer}>
        <button onClick={openAll}>Open All</button>
        <button>⋮</button>
      </div>
    </div>
  );
}

export type { SessionComponentProps, TabStore, SessionStore };
