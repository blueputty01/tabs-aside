import React, { MouseEventHandler, useState } from 'react';
import styles from './Tab.scss';
import Icon from 'shared/components/Icon';
import CloseButton from './CloseButton';

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
  onClose?: Function;
}

export default function Tab(props: Props) {
  return (
    <div
      className={[
        props.top && styles.top,
        props.bottom && styles.bottom,
        styles.tab,
        props.hover && !props.selected && props.hoverClass,
        props.selected && styles.selected,
      ].join(' ')}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <img className={styles.icon} src={`chrome://favicon/${props.url}`}></img>
      <span className={styles.title}>{props.title}</span>
      {props.onClose && <CloseButton></CloseButton>}
    </div>
  );
}
