import { useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation';

import Session, { actionHandler } from './Session';
import { TabData, TabStore } from 'shared/types/Tab';
import SessionData from 'shared/types/Session';
import { v4 as uuidv4 } from 'uuid';
import Menu, { Point } from './Menu';

export default function SessionManager() {
  const [sessions, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [menuLoc, setMenuLoc] = useState([0, 0] as Point);

  console.log(sessions);

  const saveSession = (
    title: string,
    checked: boolean,
    windows: TabData[][]
  ) => {
    const ids: number[] = [];
    const cleanWindows = windows.map((window: TabData[]): TabStore[] => {
      const cleanWindow = window.map((tab: TabData): TabStore => {
        ids.push(tab.id);
        return { title: tab.title, url: tab.url };
      });
      return cleanWindow;
    });
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

  const handler: actionHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setMenuLoc([e.clientX, e.clientY]);
    setMenuVisibility(true);
  };

  const Sessions = sessions.map((session: SessionData) => (
    <Session
      deleteHandler={handler}
      rightClickHandler={handler}
      overflowClickHandler={handler}
      key={session.id}
      {...session}
    ></Session>
  ));

  const onMenuExit = () => {
    setMenuVisibility(false);
  };

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
      <div>{Sessions}</div>
      <Menu
        loc={menuLoc}
        visibility={menuVisibility}
        onExit={onMenuExit}
      ></Menu>
    </main>
  );
}

export type { TabStore };
