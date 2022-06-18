import { TabStore } from './Tab';

export default interface SessionStore {
    title: string;
    tabs: TabStore[][];
}
