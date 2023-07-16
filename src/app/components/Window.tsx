import Tab from './Tab';
import { useState } from 'react';

import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import classnames from 'classnames';
import type { TabData } from 'shared/types/Tab';

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
  selected?: boolean;
  onClose?: Function;
}

export interface TabStatesI {
  [key: string]: boolean;
}

export default function Window({
  tabs,
  tabClickHandler,
  onClose,
  windowClickHandler,
  selected,
  index,
}: WindowChildProps) {
  const [windowHover, setWindowHover] = useState(false);

  return (
    <div
      className={classnames(
        'group mb-1 rounded-md last:mb-0',
        windowHover && !selected && 'bg-blue-100',
        selected && 'bg-blue-200'
      )}
    >
      <div
        className="flex w-full pr-2 text-slate-500"
        onMouseOver={() => {
          setWindowHover(true);
        }}
        onFocus={() => {
          setWindowHover(true);
        }}
        onBlur={() => {
          setWindowHover(false);
        }}
        onMouseLeave={() => {
          setWindowHover(false);
        }}
      >
        <button
          onClick={windowClickHandler}
          type="button"
          className="grow rounded-lg px-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {index === -1 ? 'Current Window' : `Window ${index}`}
        </button>
        {onClose && (
          <button className="button rounded-full p-1" type="button">
            <IoMdClose />
          </button>
        )}
      </div>
      <div className="pl-4">
        {tabs.map((tab) => (
          <Tab
            {...tab}
            key={tab.id}
            onClick={(event) => {
              tabClickHandler(event, tab.id.toString());
            }}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
