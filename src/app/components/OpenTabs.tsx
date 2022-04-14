import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionCreate.scss';
import Tab from './Tab';

interface props {
  className: string;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Window() {}

export default function OpenTabs(props: props) {
  const def: chrome.windows.Window[] = [];
  const [windows, setWindows] = useState(def);

  const getWindows = () => {
    chrome.windows.getCurrent({}, (currWin: chrome.windows.Window) => {
      chrome.windows.getAll(
        { populate: true },
        (windows: chrome.windows.Window[]) => {
          console.log(windows);
          setWindows(windows);
        }
      );
    });
  };

  useEffect(() => {
    console.log('hi');

    if (windows == []) {
      return;
    }
    getWindows();
  }, []);

  const windowElements = windows.map((window) => {
    return (
      <div key={window.id}>
        {window.tabs!.map((tab) => {
          return (
            <Tab
              title={tab.title!}
              url={tab.url!}
              faviconUrl={tab.favIconUrl!}
              key={tab.id?.toString()}
            ></Tab>
          );
        })}
      </div>
    );
  });

  return <div className={props.className}>{windowElements}</div>;
}
