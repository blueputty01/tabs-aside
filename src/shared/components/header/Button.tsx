import React from 'react';
import './Header.scss';
import Logo from './Logo';

interface props {
  fullscreen: boolean;
}

export default function Button({ fullscreen }: props) {
  return (
    <header>
      <Logo></Logo>
      <div className="button-container">
        <button id="fullscreen-button" title="Open this pop-up in a new window">
          <img
            src="/img/icons/fullscreen.svg"
            alt="fullscreen"
            draggable="false"
          />
        </button>

        <button id="settings-button" title="Settings">
          <img src="/img/icons/settings.svg" alt="settings" draggable="false" />
        </button>
      </div>
    </header>
  );
}
