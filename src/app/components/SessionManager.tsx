import React, { FormEvent, useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation/SessionCreation';

import Session from './Session';
import { TabStore, SessionComponentProps, SessionStore } from './Session';

export default function SessionManager() {
  const [sessionData, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionStore[]
  );

  console.log(sessionData);

  const saveSession = (title: string, checked: boolean, tabs: TabStore[][]) => {
    const flatTabs = tabs.map((curr: TabStore[]): TabStore[] => {
      const lean = curr.map((tab: TabStore): TabStore => {
        return { title: tab.title, url: tab.url };
      });
      return lean;
    });
    setSessions((prev: SessionStore[]): SessionStore[] => {
      return [...prev, { title, tabs: flatTabs } as SessionStore];
    });
  };

  const Sessions = sessionData.map((session: SessionStore) => (
    <Session
      deleteHandler={function (
        event: React.MouseEvent<Element, MouseEvent>
      ): void {
        throw new Error('Function not implemented.');
      }}
      title={session.title}
      tabs={session.tabs}
      key={session.title}
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
