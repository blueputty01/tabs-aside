import SessionCreation from './SessionCreation';
import Session from './Session';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';

import { v4 as uuidv4 } from 'uuid';
import { useMemo, useState } from 'react';
import type { TabStore } from 'shared/types/Tab';
import type SessionData from 'shared/types/Session';

export default function SessionManager() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sessions, setSessions, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );

  const [renaming, setRenaming] = useState([] as string[]);

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
    setSessions((prev: SessionData[]): SessionData[] => [
      ...prev,
      { title, windows: cleanWindows, id: uuidv4() } as SessionData,
    ]);

    if (checked) {
      chrome.tabs.remove(ids);
    }
  };

  const saveRename = (title: string, id: string) => {
    setSessions((prev: SessionData[]) => {
      const session = prev.find((prevSession) => prevSession.id === id);
      if (typeof session !== 'undefined') {
        session.title = title;
      } else {
        throw new Error('Session not found');
      }
      return prev;
    });
    setRenaming((prev: string[]) => prev.filter((localId) => localId !== id));
  };

  const sessionComp = () =>
    sessions.map((session: SessionData): React.ReactElement => {
      return (
        <Session
          key={session.id}
          saveRename={(title: string) => {
            saveRename(title, session.id);
          }}
          {...session}
        />
      );
    });

  const Sessions: React.ReactElement[] = useMemo(sessionComp, [
    sessions,
    renaming,
  ]);

  const onMenuExit = () => {
    setMenuVisibility(false);
  };

  const deleteSession = (id: string) => {
    setSessions((prev: SessionData[]) =>
      prev.filter((session: SessionData) => session.id !== id)
    );
  };

  const renameSession = (id: string) => {
    setRenaming((prev: string[]) => [...prev, id]);
  };

  return (
    <main className="section-outer relative min-h-fit ">
      <div className="section-inner flex min-h-fit flex-col gap-3 py-7 md:grid md:grid-cols-2 md:items-start md:py-12 lg:grid-cols-3">
        <SessionCreation saveHandler={saveSession} />
        {Sessions}
      </div>
    </main>
  );
}

export type { TabStore };
