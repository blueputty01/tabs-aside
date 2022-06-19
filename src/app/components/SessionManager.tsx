import { useEffect, useState } from 'react';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionCreation from './SessionCreation/SessionCreation';

import Session from './Session';
import { SessionData, SessionStore } from 'shared/types/Session';
import { TabData, TabStore } from 'shared/types/Tab';

import { v4 as uuidv4 } from 'uuid';

export default function SessionManager() {
    const [keys, setKeys, isPersistent, error] = useChromeStorageLocal(
        'sessions',
        [] as string[]
    );

    const [sessions, setSessions] = useState([] as SessionData[]);

    useEffect(() => {
        sessions.forEach((session: SessionData) => {
            chrome.storage.local.set({ id: session.id, session });
        });
    }, [sessions]);

    useEffect(() => {
        keys.forEach((key: string) => {
            chrome.storage.local.get(key, (res) => {
                setSessions((prev) => {
                    return [...prev, { ...res, id: key } as SessionData];
                });
            });
        });
        console.log(keys, sessions);
    }, [keys]);

    const saveSession = (
        title: string,
        checked: boolean,
        tabs: TabData[][]
    ) => {
        const sessionId = uuidv4();

        const tabIds: number[] = [];
        const filtTabs = tabs.map((curr: TabData[]): TabStore[] => {
            const lean = curr.map((tab: TabData): TabStore => {
                tabIds.push(tab.id);
                return { title: tab.title, url: tab.url };
            });
            return lean;
        });

        setSessions((prev: SessionData[]): SessionData[] => {
            return [
                ...prev,
                { title, tabs: filtTabs, id: sessionId } as SessionData,
            ];
        });

        setKeys((prev: string[]): string[] => {
            console.log('hi');

            return [...prev, sessionId];
        });

        if (checked) {
            chrome.tabs.remove(tabIds);
        }
    };

    const handler = () => {};

    const Sessions = sessions.map((session: SessionData) => (
        <Session
            deleteHandler={handler}
            rightClickHandler={handler}
            overflowClickHandler={handler}
            key={session.id}
            title={session.title}
            tabs={session.tabs}
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
