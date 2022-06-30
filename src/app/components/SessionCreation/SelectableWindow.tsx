import {
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Window, { TabStatesI, WindowProps } from '../shared/Window';
import styles from './SelectableWindow.scss';

import { useIsMount } from 'shared/utils/utils';
import { TabData } from 'shared/types/Tab';
import OpenTabs from './OpenTabs';

interface SelectableWindowProps extends WindowProps {
  tabs: TabData[];
  index: number;
  selectionHandler: (tabs: TabData[], id: number) => void;
}

interface SelectableTabProps extends TabData {
  favIconUrl: string;
  key: string;
  selected: boolean;
  top: boolean;
  bottom: boolean;
}

export default function SelectableWindow(props: SelectableWindowProps) {
  const [windowSelected, setWindowSelection] = useState(false);
  const [selected, setSelected] = useState({} as TabStatesI);

  const addSelectedProp = () => {
    return props.tabs!.map((tab, i): SelectableTabProps => {
      const key = tab.id!.toString();

      if (tab.favIconUrl === undefined) {
        tab.favIconUrl = `chrome://favicon/${tab.url}`;
      }
      let top = false;
      let bottom = false;
      const prevTab = props.tabs![i - 1];
      if (!selected[prevTab?.id.toString()]) {
        top = true;
      }
      const nextTab = props.tabs![i + 1];
      if (!selected[nextTab?.id.toString()]) {
        bottom = true;
      }

      return {
        title: tab.title!,
        url: tab.url!,
        favIconUrl: tab.favIconUrl!,
        id: tab.id!,
        selected: selected[key] || false,
        top,
        bottom,
        key: key,
      };
    });
  };

  const tabData = useMemo(addSelectedProp, [props.tabs, selected]);

  const isMount = useIsMount();

  const selectionsRef = useRef([] as TabData[]);

  const windowClickHandler = (event: React.MouseEvent) => {
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
        for (const key of stateKeys) {
          if (newStates[key]) {
            selectedCount++;
          }
        }
        if (selectedCount === tabData.length) {
          setWindowSelection(true);
        }
      }
    } else {
      if (windowSelected) {
        setWindowSelection(false);
      }
    }

    setSelected((prevStates) => {
      return { ...prevStates, ...newStates };
    });
  };

  useEffect(() => {
    if (!isMount) {
      //possibly inefficient (requires remap every selection)
      const tabs: TabData[] = tabData.filter((tab) => tab.selected);
      selectionsRef.current = tabs;
      props.selectionHandler(tabs, props.index);
    }
  }, [selected]);

  return (
    <Window
      tabs={tabData}
      index={props.index}
      tabClickHandler={tabClickHandler}
      windowClickHandler={windowClickHandler}
      spanClasses={windowSelected && styles.selected}
      containerClass={windowSelected && styles.selected}
      hoverClass={!windowSelected && styles.hover}
    ></Window>
  );
}
