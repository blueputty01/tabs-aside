import React from 'react';
import styles from './Logo.scss';

interface props {
  page?: string;
}

export default function Logo(props: props) {
  let title: string = 'Tabs Aside';
  if (typeof props.page !== 'undefined') {
    title += ` \\\\ ${props.page}`;
  }
  return (
    <React.Fragment>
      <img src="./icon48.png" alt="logo" id="logo" className={styles.logo} />
      <span>{title}</span>
    </React.Fragment>
  );
}
