import OpenTabs from '../SessionCreation/OpenTabs';
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

export default function SessionWindow(props: SessionWindowProps) {
  const tabClickHandler = (event: MouseEvent, key: string) => {
    // possibly add helper method later to generate id?
    const [{ url }] = props.tabs.filter(
      (tab: TabData) => tab.id.toString() === key
    );
    chrome.tabs.create({ url, active: false });
  };

  const windowClickHandler = (event: MouseEvent) => {
    openWindow(props.tabs);
  };

  return (
    <Window
      index={props.index}
      tabClickHandler={tabClickHandler}
      windowClickHandler={windowClickHandler}
      tabs={props.tabs}
      onClose={() => {}}
     />
  );
}
