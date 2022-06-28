import { MouseEventHandler } from 'react';
import styles from './Session.scss';
import SessionData from 'shared/types/Session';
import { TabStore } from 'shared/types/Tab';

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
  const openAll = () => {
    console.log(props);
    props.windows.forEach((savedWindow: TabStore[]) => {
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
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            props.overflowClickHandler(e, props.id);
          }}
        >
          ⋮
        </button>
      </div>
    </div>
  );
}
