import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';
import styles from './Window.scss';

interface WindowProps extends chrome.windows.Window {
  i: number;
}

export default function Window(props: WindowProps) {
  const [hover, setHover] = useState(false);

  const hoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setHover(!hover);
  };

  const tabClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);
  };

  return (
    <React.Fragment>
      <span
        className={styles.windowLabel}
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
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
            onClick={tabClickHandler}
          ></Tab>
        );
      })}
    </React.Fragment>
  );
}
