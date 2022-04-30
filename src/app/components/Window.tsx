import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';
import styles from './Window.scss';

import { TabData } from './Tab';

type WindowSelectionHandler = (tabs: TabData[]) => void;
interface WindowProps extends chrome.windows.Window {
  i: number;
  onSelectionChange: WindowSelectionHandler;
}

export default function Window(props: WindowProps) {
  interface TabData {
    title: string;
    url: string;
    favIconUrl: string;
    id: number;
    key: string;
    selected: boolean;
    hover: boolean;
  }

  interface tabStatesI {
    [key: string]: boolean;
  }

  const getDefault = () => {
    const defSel: tabStatesI = {};
    props.tabs!.forEach((tab) => {
      const key = tab.id!.toString();
      defSel[key] = false;
    });
    return defSel;
  };

  const [windowSelected, setWindowSelection] = useState(false);
  const [hovered, setHovered] = useState(getDefault);
  const [selected, setSelected] = useState(getDefault);

  const tabData: TabData[] = props.tabs!.map((tab): TabData => {
    const key = tab.id!.toString();
    return {
      title: tab.title!,
      url: tab.url!,
      favIconUrl: tab.favIconUrl!,
      id: tab.id!,
      key: key,
      selected: selected[key],
      hover: hovered[key],
    };
  });

  const windowMouseEnterHandler = (event: React.MouseEvent) => {
    windowHoverHandler(true);
  };

  const windowMouseLeaveHandler = (event: React.MouseEvent) => {
    windowHoverHandler(false);
  };

  const windowHoverHandler = (mouse: boolean) => {
    const newStates = { ...hovered };
    tabData.forEach((tab) => {
      newStates[tab.key] = mouse;
    });
    setHovered(newStates);
  };

  const windowClickHandler = (event: React.MouseEvent) => {
    const newStates = { ...selected };
    tabData.forEach((tab) => {
      newStates[tab.key] = windowSelected;
    });
    setSelected(newStates);
    setWindowSelection(!windowSelected);
  };

  const tabClickHandler = (event: React.MouseEvent, key: string, i: number) => {
    const newStates = { ...selected };
    newStates[key] = !newStates[key];
    setSelected(newStates);

    if (selected) {
      if (!windowSelected) {
        const stateKeys = Object.keys(newStates);

        let all = true;

        for (const key of stateKeys) {
          if (!newStates[key]) {
            all = false;
            break;
          }
        }
        if (all) {
          setWindowSelection(true);
        }
      }
    } else {
      if (windowSelected) {
        setWindowSelection(false);
      }
    }

    setSelected((prevStates) => {
      return { ...prevStates, ...newStates };
    });
  };

  const tabHoverHandler = (
    event: React.MouseEvent,
    key: string,
    hover: boolean
  ) => {
    setHovered((prevState) => {
      return { ...prevState, [key]: hover };
    });
  };

  const TabList = tabData.map((tab, i) => {
    return (
      <Tab
        onMouseEnter={(event) => {
          tabHoverHandler(event, tab.key, true);
        }}
        onMouseLeave={(event) => {
          tabHoverHandler(event, tab.key, false);
        }}
        {...tab}
        hover={tab.hover}
        onClick={(event) => {
          tabClickHandler(event, tab.key, i);
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
        onMouseEnter={windowMouseEnterHandler}
        onMouseLeave={windowMouseLeaveHandler}
        onClick={windowClickHandler}
      >
        {props.i == 0 ? 'Current Window' : `Window ${props.i + 1}`}
      </span>
      {TabList}
    </React.Fragment>
  );
}

export type { WindowSelectionHandler };
