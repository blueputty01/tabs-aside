import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import styles from './Tab.scss';

interface props {
  title: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
  hoverHandler: MouseEventHandler;
  url: string;
  favIconUrl: string;
}

export default function Tab(props: props) {
  return (
    <div
      className={[
        styles.tab,
        props.hover && !props.selected && styles.hoverBlue,
        props.selected && styles.active,
      ].join(' ')}
      onClick={props.onClick}
      onMouseEnter={props.hoverHandler}
      onMouseLeave={props.hoverHandler}
    >
      <img className={styles.icon} src={`chrome://favicon/${props.url}`}></img>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}
