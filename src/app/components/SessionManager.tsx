import React from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation/SessionCreation';

import Session from './Session';
import { TabStore, SessionStore } from './Session';
import TabData from 'shared/types/TabData';

type SessionKeys = string[];

export default function SessionManager() {
  const [sessionData, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionKeys[]
  );

  console.log(sessionData);

  const saveSession = (title: string, checked: boolean, tabs: TabData[][]) => {
    const ids: number[] = [];
    const flatTabs = tabs.map((curr: TabData[]): TabStore[] => {
      const lean = curr.map((tab: TabData): TabStore => {
        ids.push(tab.id);
        return { title: tab.title, url: tab.url };
      });
      return lean;
    });
    setSessions((prev: SessionStore[]): SessionStore[] => {
      return [...prev, { title, tabs: flatTabs } as SessionStore];
    });

    if (checked) {
      chrome.tabs.remove(ids);
    }
  };

  const handler = (e: React.MouseEvent) => {
    console.log((e.target as HTMLDivElement).key);
  };

  const Sessions = sessionData.map((key: string) => (
    <Session
      deleteHandler={handler}
      rightClickHandler={handler}
      overflowClickHandler={handler}
      key={key}
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
