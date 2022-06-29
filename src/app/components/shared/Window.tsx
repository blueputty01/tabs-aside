import { Fragment, useMemo, useState } from 'react';
import Tab from './Tab';
import styles from './Window.scss';

import { TabData } from 'shared/types/Tab';

export interface TabProps extends TabData {
  favIconUrl: string;
  key: string;
  hover: boolean;
}

export interface WindowProps {
  index: number;
  tabClickHandler: (event: React.MouseEvent, key: string) => void;
  windowClickHandler: (event: React.MouseEvent) => void;
  tabs: TabProps[];
  spanClasses?: string[];
}

interface tabStatesI {
  [key: string]: boolean;
}

export default function Window(props: WindowProps) {
  const [hover, setHover] = useState({} as tabStatesI);

  const tabData = useMemo(() => {
    return props.tabs.map((tab) => {
      const key = tab.id!.toString();

      return {
        ...tab,
        hover: hover[key] || false,
      };
    });
  }, [props.tabs]);

  const windowHoverHandler = (mouse: boolean) => {
    const newStates = { ...hover };
    tabData.forEach((tab) => {
      newStates[tab.key] = mouse;
    });
    setHover(newStates);
  };

  const tabHoverHandler = (
    event: React.MouseEvent,
    key: string,
    hover: boolean
  ) => {
    setHover((prevState) => {
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

  const TabList = useMemo(getTabComps, [props.tabs]);

  return (
    <Fragment>
      <span
        className={[styles.windowLabel, props.spanClasses].join(' ')}
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
