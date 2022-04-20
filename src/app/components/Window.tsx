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

  interface tabStatesI {
    [key: string]: { hover: boolean; selected: boolean };
  }

  const [windowSelected, setWindowSelection] = useState(false);

  const defSel: tabStatesI = {};

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
    const newStates = { ...tabStates };
    tabData.forEach((tab) => {
      flipState(newStates, tab.key, 'hover');
    });

    setTabStates(newStates);
  };

  const clickHandler = (event: React.MouseEvent) => {
    const newStates = { ...tabStates };
    tabData.forEach((tab) => {
      flipState(newStates, tab.key, 'selected', !windowSelected);
    });
    setTabStates(newStates);
    setWindowSelection(!windowSelected);
  };

  const flipState = (
    states: tabStatesI,
    key: string,
    state: string,
    def?: boolean
  ): boolean => {
    const defNull = typeof def === 'undefined';
    let newState: boolean = defNull ? true : def;
    if (typeof tabStates[key] == 'undefined') {
      const newObj = { selected: false, hover: false };
      newObj[state as keyof typeof newObj] = newState;
      states[key] = newObj;
    } else {
      const obj = states[key];
      if (defNull) {
        newState = !obj[state as keyof typeof obj];
      }
      obj[state as keyof typeof obj] = newState;
    }
    return newState;
  };

  const tabClickHandler = (event: React.MouseEvent, key: string) => {
    const newStates = { ...tabStates };
    const selected = flipState(newStates, key, 'selected');
    setTabStates(newStates);

    if (windowSelected) {
      if (!selected) {
        setWindowSelection(false);
      }
    } else {
      if (selected) {
        const stateKeys = Object.keys(newStates);

        if (tabData.length === stateKeys.length) {
          let all = true;

          for (const key of stateKeys) {
            if (!newStates[key].selected) {
              all = false;
              break;
            }
          }
          if (all) {
            setWindowSelection(true);
          }
        }
      }
    }
  };

  const tabHoverHandler = (event: React.MouseEvent, key: string) => {
    const newStates = { ...tabStates };
    const selected = flipState(newStates, key, 'hover');
    setTabStates(newStates);
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
        className={[styles.windowLabel, windowSelected && styles.selected].join(
          ' '
        )}
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
        onClick={clickHandler}
      >
        {props.i == 0 ? 'Current Window' : `Window ${props.i + 1}`}
      </span>
      {TabList}
    </React.Fragment>
  );
}
