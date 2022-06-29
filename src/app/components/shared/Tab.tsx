import { MouseEventHandler } from 'react';
import styles from './Tab.scss';

export interface Props {
  title: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  url: string;
  favIconUrl: string;
  className?: string;
}

export default function Tab(props: Props) {
  return (
    <div
      className={[styles.tab, props.className].join(' ')}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <img className={styles.icon} src={`chrome://favicon/${props.url}`}></img>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}
