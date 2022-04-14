import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Tab.scss';

interface props {
  title: string;
  url: string;
  faviconUrl: string;
}

export default function Tab(props: props) {
  return (
    <div className={styles.tab}>
      <img className={styles.icon} src={`chrome://favicon/${props.url}`}></img>
      <span className={styles.title}>{props.title}</span>
    </div>
  );
}
