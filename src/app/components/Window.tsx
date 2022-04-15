import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';
import styles from './Window.scss';

interface WindowProps extends chrome.windows.Window {
  i: number;
}

export default function Window(props: WindowProps) {
  const [hover, setHover] = useState(false);

  const mouseEnterHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(true);
  };

  const mouseExitHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
  };

  return (
    <React.Fragment>
      <span
        className={styles.windowLabel}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseExitHandler}
      >
        {props.i == 0 ? 'Current Window' : `Window ${props.i + 1}`}
      </span>
      {props.tabs!.map((tab) => {
        return (
          <Tab
            title={tab.title!}
            url={tab.url!}
            faviconUrl={tab.favIconUrl!}
            key={tab.id?.toString()}
            hover={hover}
          ></Tab>
        );
      })}
    </React.Fragment>
  );
}
