import React from 'react';
import styles from './Header.scss';
import Logo from './Logo';

interface props {
  buttons?: React.ReactNode;
}

export default function Header(props: props) {
  return (
    <header>
      <Logo></Logo>
      <div className={styles.buttonContainer}>
        {props.buttons ? props.buttons : ''}
      </div>
    </header>
  );
}
