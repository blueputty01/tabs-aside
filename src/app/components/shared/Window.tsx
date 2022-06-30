import { Fragment, useMemo, useState } from 'react';
import Tab from './Tab';
import styles from './Window.scss';

import { TabData } from 'shared/types/Tab';

interface TabState extends TabData {
  key: string;
  hover: boolean;
}

export interface WindowProps {
  index: number;
  tabs: TabData[];
}

interface WindowChildProps extends WindowProps {
  tabClickHandler: (event: React.MouseEvent, key: string) => void;
  windowClickHandler: (event: React.MouseEvent) => void;
  spanClasses?: string[];
  hoverClass?: string;
}

export interface TabStatesI {
  [key: string]: boolean;
}

export default function Window(props: WindowChildProps) {
  const [tabHoverStates, setTabHoverStates] = useState({} as TabStatesI);
  const [windowHover, setWindowHover] = useState(false);

  const addHoverProp = (): TabState[] => {
    return props.tabs.map((tab): TabState => {
      const key = tab.id!.toString();
      const hoverState = tabHoverStates[key];
      let hoverProp = typeof hoverState === 'undefined' ? false : hoverState;

      return {
        ...tab,
        key,
        hover: hoverProp,
      };
    });
  };

  const tabData = useMemo(addHoverProp, [props.tabs, tabHoverStates]);

  const windowHoverHandler = (mouse: boolean) => {
    setWindowHover(mouse);
    const newStates = { ...tabHoverStates };
    tabData.forEach((tab) => {
      newStates[tab.key] = mouse;
    });
    setTabHoverStates(newStates);
  };

  const tabHoverHandler = (
    event: React.MouseEvent,
    key: string,
    hover: boolean
  ) => {
    setTabHoverStates((prevState) => {
      return { ...prevState, [key]: hover };
    });
  };

  const windowMouseEnterHandler = (event: React.MouseEvent) => {
    windowHoverHandler(true);
  };

  const windowMouseLeaveHandler = (event: React.MouseEvent) => {
    windowHoverHandler(false);
  };

  const getTabComps = () =>
    tabData.map((tab) => {
      return (
        <Tab
          onMouseEnter={(event) => {
            tabHoverHandler(event, tab.key, true);
          }}
          onMouseLeave={(event) => {
            tabHoverHandler(event, tab.key, false);
          }}
          {...tab}
          onClick={(event) => {
            props.tabClickHandler(event, tab.key);
          }}
        ></Tab>
      );
    });

  const TabList = useMemo(getTabComps, [tabData]);

  return (
    <Fragment>
      <span
        className={[
          windowHover && props.hoverClass,
          styles.windowLabel,
          props.spanClasses,
        ].join(' ')}
        onMouseEnter={windowMouseEnterHandler}
        onMouseLeave={windowMouseLeaveHandler}
        onClick={props.windowClickHandler}
      >
        {props.index == 0 ? 'Current Window' : `Window ${props.index + 1}`}
      </span>
      {TabList}
    </Fragment>
  );
}
