import React from 'react';
import Header from 'shared/components/header/Header';
import Icon from 'shared/components/Icon';

interface props {
  isPopup: boolean;
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

  const buttons = (
    <React.Fragment>
      <Icon type="settings" onClick={settingsHandler}></Icon>
      {props.isPopup && (
        <Icon type="fullscreen" onClick={fullscreenHandler}></Icon>
      )}
    </React.Fragment>
  );

  return <Header buttons={buttons}></Header>;
}
