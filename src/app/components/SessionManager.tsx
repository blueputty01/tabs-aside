import React, { useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation/SessionCreation';

import Session from './Session';
import { TabData, TabStore } from 'shared/types/Tab';
import { SessionStore } from 'shared/types/Session';

type SessionKeys = string[];

export default function SessionManager() {
    const [keys, setKeys, isPersistent, error] = useChromeStorageLocal(
        'sessions',
        [] as SessionKeys[]
    );

    const [sessions, setSessions] = useState([] as SessionStore[]);

    const saveSession = (
        title: string,
        checked: boolean,
        tabs: TabData[][]
    ) => {
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

        setKeys((prev: SessionStore[]): SessionStore[] => {
            return [...prev, { title, tabs: flatTabs } as SessionStore];
        });

        if (checked) {
            chrome.tabs.remove(ids);
        }
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
