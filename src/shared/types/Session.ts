import TabData from './TabData';

export default interface SessionStore {
  title: string;
  tabs: TabData[][];
}
