import React, { useEffect, useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation/SessionCreation';

import Session from './Session';
import { TabStore, SessionStore } from './Session';
import { TabData } from './Tab';

type SessionKeys = string[];

export default function SessionManager() {
  const [keys, setKeys, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionKeys[]
  );

  const [sessions, setSessions] = useState([] as SessionStore[]);

  const newSess: SessionStore[] = [];
  console.log('hi');

  keys.forEach((key: string) => {
    console.log('ff');

    const [session, setSession, isPersistent, error] = useChromeStorageLocal(
      'sessions',
      [] as SessionStore[]
    );
    newSess.push(session);
  });
  useEffect(() => {
    setSessions(newSess);
  }, [sessions, keys]);

  const saveSession = (title: string, checked: boolean, tabs: TabData[][]) => {
    const ids: number[] = [];
    const flatTabs = tabs.map((curr: TabData[]): TabStore[] => {
      const lean = curr.map((tab: TabData): TabStore => {
        ids.push(tab.id);
        return { title: tab.title, url: tab.url };
      });
      return lean;
    });

    setKeys((prev: SessionStore[]): SessionStore[] => {
      return [...prev, { title, tabs: flatTabs } as SessionStore];
    });

    if (checked) {
      chrome.tabs.remove(ids);
    }
  };

  const handler = (e: React.MouseEvent) => {
    console.log((e.target as HTMLDivElement).key);
  };

  const Sessions = keys.map((key: string) => (
    <Session
      deleteHandler={handler}
      rightClickHandler={handler}
      overflowClickHandler={handler}
      key={key}
      title={''}
      tabs={[]}
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
