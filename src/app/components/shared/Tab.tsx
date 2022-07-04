import React, { MouseEventHandler, useState } from 'react';
import styles from './Tab.scss';
import Icon from 'shared/components/Icon';

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
  closable?: boolean;
}

export default function Tab(props: Props) {
  console.log(props.closable);

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
      {props.closable && (
        <Icon
          onClick={function (
            event: React.MouseEvent<Element, MouseEvent>
          ): void {
            throw new Error('Function not implemented.');
          }}
          type="close"
          className={styles.close}
        ></Icon>
      )}
    </div>
  );
}
