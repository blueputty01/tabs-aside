import { MouseEvent } from 'react';
import Window, { TabStatesI } from '../shared/Window';

export default function SessionWindow() {
  return (
    <Window
      index={0}
      tabClickHandler={function (
        event: MouseEvent<Element, MouseEvent>,
        key: string,
        i: number
      ): void {
        throw new Error('Function not implemented.');
      }}
      windowClickHandler={function (
        event: MouseEvent<Element, MouseEvent>
      ): void {
        throw new Error('Function not implemented.');
      }}
      defaultTabPropHandler={function (tabs: TabStatesI): void {
        throw new Error('Function not implemented.');
      }}
    ></Window>
  );
}
