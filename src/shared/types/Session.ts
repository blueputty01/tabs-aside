import TabData from './Tab';

export default interface SessionStore {
  title: string;
  tabs: TabData[][];
}
