import { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';
import styles from './Window.scss';

import { useIsMount } from 'shared/utils/utils';
import { TabData } from 'shared/types/Tab';

interface WindowProps extends chrome.windows.Window {
  i: number;
  selectionHandler: (tabs: TabData[], id: number) => void;
}

export default function Window(props: WindowProps) {
  interface TabProps extends TabData {
    favIconUrl: string;
    key: string;
    selected: boolean;
    hover: boolean;
  }

  interface tabStatesI {
    [key: string]: boolean;
  }

  const isMount = useIsMount();

  const selectionsRef = useRef([] as TabProps[]);

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

  const tabData: TabProps[] = props.tabs!.map((tab): TabProps => {
    const key = tab.id!.toString();

    if (tab.favIconUrl === undefined) {
      tab.favIconUrl = `chrome://favicon/${tab.url}`;
    }

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
      newStates[tab.key] = !windowSelected;
    });
    setSelected(newStates);
    setWindowSelection(!windowSelected);
  };

  const tabClickHandler = (event: React.MouseEvent, key: string, i: number) => {
    const newStates = { ...selected };
    const newState = !newStates[key];
    newStates[key] = newState;

    if (newState) {
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

  useEffect(() => {
    if (!isMount) {
      //possibly inefficient (requires remap every selection)
      const tabs: TabProps[] = tabData.filter((tab) => tab.selected);
      selectionsRef.current = tabs;
      props.selectionHandler(tabs, props.i);
    }
  }, [selected]);

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
    <Fragment>
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
    </Fragment>
  );
}
