import React, { FormEvent, useState } from "react";
import { useChromeStorageLocal } from "shared/utils/chrome.storage";
import SessionCreation from "./SessionCreation/SessionCreation";

import { TabStore, SessionI } from "./Session";

export default function SessionManager() {
  const [value, setValue, isPersistent, error] = useChromeStorageLocal(
    "sessions",
    [] as Session[]
  );

  console.log(value);

  const saveSession = (title: string, checked: boolean, tabs: TabStore[][]) => {
    const flatTabs = tabs.reduce(
      (prev: TabStore[], curr: TabStore[]): TabStore[] => {
        const lean = curr.map((tab: TabStore): TabStore => {
          return { title: tab.title, url: tab.url };
        });
        return [...prev, ...lean];
      },
      []
    );
    setValue((prev: SessionI[]): SessionI[] => {
      return [...prev, { title, tabs: flatTabs }];
    });
  };

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
      <div>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </main>
  );
}

export type { Session, TabStore };
