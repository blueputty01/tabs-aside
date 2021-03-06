import { Fragment, MouseEvent, useMemo, useState } from 'react';
import Tab from './Tab';
import styles from './Window.scss';

import { TabData } from 'shared/types/Tab';
import CloseButton from './CloseButton';

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
  containerClass?: string;
  spanClasses?: string[];
  hoverClass?: string;
  onClose?: Function;
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

  const tabComp = () =>
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
          hoverClass={props.hoverClass}
          onClose={props.onClose}
        ></Tab>
      );
    });

  const TabList = useMemo(tabComp, [tabData]);

  return (
    <div
      className={[
        props.containerClass,
        styles.window,
        windowHover && props.hoverClass,
      ].join(' ')}
    >
      <div
        className={[styles.windowLabel, props.spanClasses].join(' ')}
        onMouseEnter={windowMouseEnterHandler}
        onMouseLeave={windowMouseLeaveHandler}
        onClick={props.windowClickHandler}
      >
        <span>
          {props.index == -1 ? 'Current Window' : `Window ${props.index}`}
        </span>
        {props.onClose && <CloseButton></CloseButton>}
      </div>
      {TabList}
    </div>
  );
}
