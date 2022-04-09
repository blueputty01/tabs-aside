import React from 'react';
import styles from './Logo.scss';

export default function Logo() {
  return (
    <React.Fragment>
      <img src="./icon48.png" alt="logo" id="logo" className={styles.logo} />
      <span>Tabs Aside</span>
    </React.Fragment>
  );
}
