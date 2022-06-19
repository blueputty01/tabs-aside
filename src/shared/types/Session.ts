import { TabStore } from './Tab';

export interface SessionStore {
    title: string;
    tabs: TabStore[][];
}

export type SessionData = {
    id: string;
    title: string;
    tabs: TabStore[][];
};
