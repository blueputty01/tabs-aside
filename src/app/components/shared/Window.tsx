import { Fragment, useEffect, useState } from 'react';
import Tab from './Tab';
import styles from './Window.scss';

import { TabData } from 'shared/types/Tab';
export interface TabStatesI {
  [key: string]: boolean;
}

export interface TabProps extends TabData {
  favIconUrl: string;
  key: string;
  hover: boolean;
}

export interface WindowProps {
  i: number;
  tabClickHandler: (event: React.MouseEvent, key: string, i: number) => void;
  windowClickHandler: (event: React.MouseEvent) => void;
  tabs: TabProps[];
  defaultTabPropHandler: (tabs: TabStatesI) => void;
  spanClassName: string;
}

export default function Window(props: WindowProps) {
    const getDefault = () => {
    const defSel: TabStatesI = {};
    props.tabs!.forEach((tab) => {
      const key = tab.id!.toString();
      defSel[key] = false;
    });
    return defSel;
  };

  useEffect(() => {
    props.defaultTabPropHandler(getDefault());
  }, [props.tabs]);

  const [hovered, setHovered] = useState(getDefault);

  const windowMouseEnterHandler = (event: React.MouseEvent) => {
    windowHoverHandler(true);
  };

  const windowMouseLeaveHandler = (event: React.MouseEvent) => {
    windowHoverHandler(false);
  };

  const windowHoverHandler = (mouse: boolean) => {
    const newStates = { ...hovered };
    props.tabs.forEach((tab) => {
      newStates[tab.key] = mouse;
    });
    setHovered(newStates);
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

  const TabList = props.tabs.map((tab, i) => {
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
          props.tabClickHandler(event, tab.key, i);
        }}
      ></Tab>
    );
  });

  return (
    <Fragment>
      <span
        className={[styles.windowLabel, props.spanClassName].join(' ')}
        onMouseEnter={windowMouseEnterHandler}
        onMouseLeave={windowMouseLeaveHandler}
        onClick={props.windowClickHandler}
      >
        {props.i == 0 ? 'Current Window' : `Window ${props.i + 1}`}
      </span>
      {TabList}
    </Fragment>
  );
}
