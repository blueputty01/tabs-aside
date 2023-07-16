import Window from '../Window';
import type { MouseEvent } from 'react';
import type { TabData, TabStore } from 'shared/types/Tab';
import type { WindowProps } from '../Window';

interface SessionWindowProps extends WindowProps {
  tabs: TabData[];
  index: number;
}

export function openWindow(tabs: TabStore[]) {
  const urls = tabs.map((tab: TabStore) => tab.url);
  chrome.windows.create({ url: urls });
}

export default function SessionWindow({ tabs, index }: SessionWindowProps) {
  const tabClickHandler = (event: MouseEvent, key: string) => {
    // possibly add helper method later to generate id?
    const [{ url }] = tabs.filter((tab: TabData) => tab.id.toString() === key);
    chrome.tabs.create({ url, active: false });
  };

  const windowClickHandler = () => {
    openWindow(tabs);
  };

  return (
    <Window
      index={index}
      tabClickHandler={tabClickHandler}
      windowClickHandler={windowClickHandler}
      tabs={tabs}
      onClose={() => {}}
    />
  );
}
