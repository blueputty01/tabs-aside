import { MouseEvent } from 'react';
import { TabData } from 'shared/types/Tab';
import Window, { WindowProps } from '../shared/Window';
import styles from './SessionWindow.scss';

interface SessionWindowProps extends WindowProps {
  tabs: TabData[];
  index: number;
}

export default function SessionWindow(props: SessionWindowProps) {
  const tabClickHandler = (event: MouseEvent, key: string) => {};
  const windowClickHandler = (event: MouseEvent) => {};

  return (
    <Window
      index={props.index}
      tabClickHandler={tabClickHandler}
      windowClickHandler={windowClickHandler}
      tabs={props.tabs}
      hoverClass={styles.hover}
    ></Window>
  );
}
