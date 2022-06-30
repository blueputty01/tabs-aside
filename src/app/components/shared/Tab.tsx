import { MouseEventHandler } from 'react';
import styles from './Tab.scss';

interface Props {
  title: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  url: string;
  hoverClass?: string;
  top?: boolean;
  bottom?: boolean;
  // favIconUrl: string; manifest v3
}

export default function Tab(props: Props) {
  return (
    <div
      className={[
        props.top && styles.top,
        props.bottom && styles.bottom,
        styles.tab,
        props.hover && !props.selected ? props.hoverClass : null,
        props.selected ? styles.selected : null,
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
