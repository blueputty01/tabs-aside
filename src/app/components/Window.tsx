import Tab from './Tab';
import { useMemo, useState } from 'react';

import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import type { TabData } from 'shared/types/Tab';

interface TabState extends TabData {
  key: string;
  hover: boolean;
}

export interface WindowProps {
  index: number;
  tabs: TabData[];
  className?: string;
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

export default function Window({
  tabs,
  tabClickHandler,
  hoverClass,
  onClose,
  windowClickHandler,
  index,
}: WindowChildProps) {
  const [tabHoverStates, setTabHoverStates] = useState({} as TabStatesI);
  const [windowHover, setWindowHover] = useState(false);

  const addHoverProp = (): TabState[] =>
    tabs.map((tab): TabState => {
      const key = tab.id!.toString();
      const hoverState = tabHoverStates[key];
      const hoverProp = typeof hoverState === 'undefined' ? false : hoverState;

      return {
        ...tab,
        key,
        hover: hoverProp,
      };
    });

  const tabData = useMemo(addHoverProp, [tabs, tabHoverStates]);

  const windowHoverHandler = (mouse: boolean) => {
    setWindowHover(mouse);
  };

  const tabHoverHandler = (
    event: React.MouseEvent,
    key: string,
    hover: boolean
  ) => {
    setTabHoverStates((prevState) => ({ ...prevState, [key]: hover }));
  };

  const windowMouseEnterHandler = () => {
    windowHoverHandler(true);
  };

  const windowMouseLeaveHandler = () => {
    windowHoverHandler(false);
  };

  const tabComp = () =>
    tabData.map((tab) => (
      <Tab
        onMouseEnter={(event) => {
          tabHoverHandler(event, tab.key, true);
        }}
        onMouseLeave={(event) => {
          tabHoverHandler(event, tab.key, false);
        }}
        {...tab}
        key={tab.key}
        onClick={(event) => {
          tabClickHandler(event, tab.key);
        }}
        hoverClass={hoverClass}
        onClose={onClose}
      />
    ));

  const TabList = useMemo(tabComp, [tabData]);

  return (
    <div
      onMouseEnter={windowMouseEnterHandler}
      onMouseLeave={windowMouseLeaveHandler}
      className="mb-1 rounded-md last:mb-0"
    >
      <div className="block w-full px-2 text-slate-500">
        <button
          onClick={windowClickHandler}
          type="button"
          className="w-full text-left"
        >
          {index === -1 ? 'Current Window' : `Window ${index}`}
        </button>
        {onClose && (
          <button className="rounded-button text-xl" type="button">
            <IoMdClose />
          </button>
        )}
      </div>
      <div className="pl-4"> {TabList}</div>
    </div>
  );
}
