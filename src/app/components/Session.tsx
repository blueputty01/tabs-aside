import { MouseEventHandler } from 'react';
import styles from './Session.scss';
import SessionData from 'shared/types/Session';
import { TabStore } from 'shared/types/Tab';

interface SessionComponentProps extends SessionData {
    deleteHandler: MouseEventHandler;
    rightClickHandler: MouseEventHandler;
    overflowClickHandler: MouseEventHandler;
}

export default function Session(props: SessionComponentProps) {
    const openAll = () => {
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
                <button>⋮</button>
            </div>
        </div>
    );
}
