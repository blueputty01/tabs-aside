import Window from '../Window';
import { useIsMount } from 'shared/utils/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { TabStatesI, WindowProps } from '../Window';
import type { TabData } from 'shared/types/Tab';

interface SelectableWindowProps extends WindowProps {
  tabs: TabData[];
  index: number;
  selectionHandler: (tabs: TabData[], id: number) => void;
}

interface SelectableTabProps extends TabData {
  key: string;
  selected: boolean;
  top: boolean;
  bottom: boolean;
}

export default function SelectableWindow({
  tabs,
  selectionHandler,
  index,
}: SelectableWindowProps) {
  const [windowSelected, setWindowSelection] = useState(false);
  const [selected, setSelected] = useState({} as TabStatesI);

  const addSelectedProp = () =>
    tabs!.map((tab, i): SelectableTabProps => {
      const key = tab.id!.toString();

      let top = false;
      let bottom = false;
      const prevTab = tabs![i - 1];
      if (!selected[prevTab?.id.toString()]) {
        top = true;
      }
      const nextTab = tabs![i + 1];
      if (!selected[nextTab?.id.toString()]) {
        bottom = true;
      }

      return {
        title: tab.title!,
        url: tab.url!,
        id: tab.id!,
        selected: selected[key] || false,
        top,
        bottom,
        key,
      };
    });

  const tabData = useMemo(addSelectedProp, [tabs, selected]);

  const isMount = useIsMount();

  const selectionsRef = useRef([] as TabData[]);

  const windowClickHandler = () => {
    const newStates = { ...selected };
    tabData.forEach((tab) => {
      newStates[tab.key] = !windowSelected;
    });
    setSelected(newStates);
    setWindowSelection(!windowSelected);
  };

  const tabClickHandler = (event: React.MouseEvent, key: string) => {
    const newStates = { ...selected };
    const newState = !newStates[key];
    newStates[key] = newState;

    if (newState) {
      if (!windowSelected) {
        const stateKeys = Object.keys(newStates);

        let selectedCount = 0;

        stateKeys.forEach((k) => {
          if (newStates[k]) {
            selectedCount++;
          }
        });

        if (selectedCount === tabData.length) {
          setWindowSelection(true);
        }
      }
    } else if (windowSelected) {
      setWindowSelection(false);
    }

    setSelected((prevStates) => ({ ...prevStates, ...newStates }));
  };

  useEffect(() => {
    if (!isMount) {
      // possibly inefficient (requires remap every selection)
      const selectedTabs: TabData[] = tabData.filter((tab) => tab.selected);
      selectionsRef.current = selectedTabs;
      selectionHandler(selectedTabs, index);
    }
  }, [selected]);

  return (
    <Window
      tabs={tabData}
      index={index}
      selected={windowSelected}
      tabClickHandler={tabClickHandler}
      windowClickHandler={windowClickHandler}
    />
  );
}
