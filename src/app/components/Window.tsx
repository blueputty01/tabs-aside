import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';
import styles from './Window.scss';

interface WindowProps extends chrome.windows.Window {
  i: number;
}

export default function Window(props: WindowProps) {
  interface tabObj {
    title: string;
    url: string;
    favIconUrl: string;
    id: number;
    key: string;
    selected: boolean;
    hover: boolean;
  }

  const defSel: { [key: string]: { hover: boolean; selected: boolean } } = {};

  const [tabStates, setTabStates] = useState(defSel);

  const tabData: tabObj[] = props.tabs!.map((tab): tabObj => {
    const key = tab.id!.toString();
    return {
      title: tab.title!,
      url: tab.url!,
      favIconUrl: tab.favIconUrl!,
      id: tab.id!,
      key: key,
      selected: tabStates[key]?.selected || false,
      hover: tabStates[key]?.hover || false,
    };
  });

  const hoverHandler = (event: React.MouseEvent) => {
    const newSel = { ...tabStates };
    for (const key in newSel) {
      flipState(key, 'hover');
    }
  };

  const flipState = (key: string, state: string) => {
    const newSel = { ...tabStates };
    if (typeof tabStates[key] == 'undefined') {
      const newObj = { selected: false, hover: false };
      newObj[state as keyof typeof newObj] = true;
      newSel[key] = newObj;
    } else {
      const obj = newSel[key];
      obj[state as keyof typeof obj] = !obj[state as keyof typeof obj];
    }
    setTabStates(newSel);
  };

  const tabClickHandler = (event: React.MouseEvent, key: string) => {
    flipState(key, 'selected');
  };

  const tabHoverHandler = (event: React.MouseEvent, key: string) => {
    flipState(key, 'hover');
  };

  const TabList = tabData.map((tab) => {
    return (
      <Tab
        hoverHandler={(event) => {
          tabHoverHandler(event, tab.key);
        }}
        {...tab}
        hover={tab.hover}
        onClick={(event) => {
          tabClickHandler(event, tab.key);
        }}
      ></Tab>
    );
  });

  return (
    <React.Fragment>
      <span
        className={styles.windowLabel}
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      >
        {props.i == 0 ? 'Current Window' : `Window ${props.i + 1}`}
      </span>
      {TabList}
    </React.Fragment>
  );
}
