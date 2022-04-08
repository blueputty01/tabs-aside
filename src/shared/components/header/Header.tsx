import React from 'react';
import './Header.scss';
import Logo from './Logo';
import Button from './Button';

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

  return (
    <header>
      <Logo></Logo>
      <div className="button-container">
        <Button type="settings" onClick={settingsHandler}></Button>
        {fullscreen && (
          <Button type="fullscreen" onClick={fullscreenHandler}></Button>
        )}
      </div>
    </header>
  );
}
