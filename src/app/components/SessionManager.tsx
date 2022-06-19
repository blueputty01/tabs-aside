import { useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation';

import Session from './Session';
import { TabData, TabStore } from 'shared/types/Tab';
import SessionData from 'shared/types/Session';
import { v4 as uuidv4 } from 'uuid';

export default function SessionManager() {
  const [sessions, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );

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

  const handler = () => {};

  const Sessions = sessions.map((session: SessionData) => (
    <Session
      deleteHandler={handler}
      rightClickHandler={handler}
      overflowClickHandler={handler}
      key={session.id}
      {...session}
    ></Session>
  ));

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
      <div>{Sessions}</div>
    </main>
  );
}

export type { TabStore };
