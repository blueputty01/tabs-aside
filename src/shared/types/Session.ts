import { TabStore } from './Tab';

export default interface SessionData {
    id: string;
    title: string;
    tabs: TabStore[][];
}

export type SessionData = {
    id: string;
    title: string;
    tabs: TabStore[][];
};
