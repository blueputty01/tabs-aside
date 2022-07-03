import { useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation';

import Session, { actionHandler } from './Session';
import { TabData, TabStore } from 'shared/types/Tab';
import SessionData from 'shared/types/Session';
import { v4 as uuidv4 } from 'uuid';
import Menu, { MenuItem, Point } from './Menu';

import styles from './SessionManager.scss';
import { ProgressPlugin } from 'webpack';

export default function SessionManager() {
  const [sessions, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [triggerId, setTriggerId] = useState('');
  const [menuLoc, setMenuLoc] = useState([0, 0] as Point);
  const [triggerElement, setTrigger] = useState(null as unknown as HTMLElement);

  const saveSession = (
    title: string,
    checked: boolean,
    windows: chrome.tabs.Tab[][]
  ) => {
    const ids: number[] = [];

    const cleanWindows = windows.map(
      (window: chrome.tabs.Tab[]): TabStore[] => {
        const cleanWindow = window.map((tab: chrome.tabs.Tab): TabStore => {
          ids.push(tab.id!);
          return { title: tab.title!, url: tab.url! };
        });
        return cleanWindow;
      }
    );
    setSessions((prev: SessionData[]): SessionData[] => {
      return [
        ...prev,
        { title, windows: cleanWindows, id: uuidv4() } as SessionData,
      ];
    });

    if (checked) {
      chrome.tabs.remove(ids);
    }
  };

  const menuActionHandler: actionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    const target = e.target as HTMLElement;

    const rect = target.getBoundingClientRect();

    let snapX = rect.right - rect.width / 2;
    let snapY = rect.bottom - rect.height / 2;

    setTriggerId(id);
    setTrigger(target);
    setMenuLoc([snapX, snapY]);
    setMenuVisibility(true);
  };

  const contextHandler: actionHandler = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    setTriggerId(id);
    setTrigger(null as unknown as HTMLElement);
    setMenuLoc([e.clientX, e.clientY]);
    setMenuVisibility(true);
  };

  const Sessions = sessions.map((session: SessionData) => (
    <Session
      contextHandler={contextHandler}
      overflowClickHandler={menuActionHandler}
      key={session.id}
      {...session}
    ></Session>
  ));

  const onMenuExit = () => {
    setMenuVisibility(false);
  };

  const deleteSession = (id: string) => {
    setSessions((prev: SessionData[]) => {
      return prev.filter((session: SessionData) => session.id !== id);
    });
  };

  const renameSession = (id: string) => {
    const session = sessions.find((session: SessionData) => session.id === id);
  };

  type MenuHandler = (id: string) => void;

  interface menuItem {
    label: string;
    handler: MenuHandler;
  }

  const menuMap: menuItem[] = [
    { label: 'Rename', handler: renameSession },
    { label: 'Delete', handler: deleteSession },
  ];

  const MenuItems = menuMap.map((item: menuItem) => {
    return (
      <MenuItem
        key={item.label}
        onClick={item.handler}
        label={item.label}
      ></MenuItem>
    );
  });

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
      <div className={styles.sessionContainer}>{Sessions}</div>
      <Menu
        loc={menuLoc}
        trigger={triggerElement}
        visibility={menuVisibility}
        onExit={onMenuExit}
        id={triggerId}
      >
        {MenuItems}
      </Menu>
    </main>
  );
}

export type { TabStore };
