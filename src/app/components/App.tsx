import React from 'react';
import './App.scss';
import Header from './Header';
import SessionManager from './SessionManager';

export default function App() {
  const isPopup = (): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    const popup = urlParams.get('popup') === 'true';
    return popup;
  };

  const isPop = isPopup();

  if (isPop) {
    import('../styles/popup.scss');
  }

  return (
    <React.Fragment>
      <Header isPopup={isPop}></Header>
      <SessionManager></SessionManager>
    </React.Fragment>
  );
}
