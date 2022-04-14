import React from 'react';
import styles from './Header.scss';
import Logo from './Logo';

interface props {
  buttons?: React.ReactNode;
  page?: string;
}

export default function Header(props: props) {
  return (
    <header>
      <Logo page={props.page}></Logo>
      <div className={styles.buttonContainer}>
        {props.buttons ? props.buttons : ''}
      </div>
    </header>
  );
}
