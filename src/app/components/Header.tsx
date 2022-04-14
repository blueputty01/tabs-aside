import React from 'react';
import Header from '../../shared/components/header/Header';
import Icon from '../../shared/components/Icon';

interface props {
  fullscreen: boolean;
}

export default function PopupHeader(props: props) {
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

  const buttons = <Icon type="settings" onClick={settingsHandler}></Icon>;
  {
    props.fullscreen && (
      <Icon type="fullscreen" onClick={fullscreenHandler}></Icon>
    );
  }

  return <Header buttons={buttons}></Header>;
}
