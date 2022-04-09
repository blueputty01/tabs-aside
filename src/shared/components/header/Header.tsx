import React, { MouseEventHandler } from 'react';
import styles from './Header.scss';
import Logo from './Logo';
import Button from '../Button';

interface props {
  fullscreen: boolean;
}

export default function Header({ fullscreen }: props) {
  const settingsHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    link('options.html');
  };

  const fullscreenHandler = () => {
    link('app.html');
  };

  const link = (url: string): void => {
    chrome.tabs.create({
      url: url,
      active: true,
    });
  };

  interface Icon {
    type?: string;
    onClick: MouseEventHandler;
  }

  const Icon = (props: Icon) => {
    return (
      <Button alt={props.type} onClick={props.onClick}>
        <img
          src={`/img/icons/${props.type}.svg`}
          alt={props.type}
          draggable="false"
        />
      </Button>
    );
  };

  return (
    <header>
      <Logo></Logo>
      <div className={styles.buttonContainer}>
        <Icon type="settings" onClick={settingsHandler}></Icon>
        {fullscreen && (
          <Icon type="fullscreen" onClick={fullscreenHandler}></Icon>
        )}
      </div>
    </header>
  );
}
