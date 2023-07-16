import type { TabStore } from './Tab';

export default interface SessionData {
  id: string;
  title: string;
  windows: TabStore[][];
}
