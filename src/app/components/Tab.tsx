import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import styles from './Tab.scss';

interface Props {
  title: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  url: string;
  favIconUrl: string;
}
interface TabData {
  title: string;
  url: string;
}

export default function Tab(props: Props) {
  return (
    <div
      className={[
        styles.tab,
        props.hover && !props.selected ? styles.hoverBlue : null,
        props.selected ? styles.active : null,
      ].join(' ')}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <img className={styles.icon} src={`chrome://favicon/${props.url}`}></img>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}

export type { TabData };
