import React from 'react';
import './App.scss';
import Header from '../../shared/components/header/Header';

export default function App() {
  function fullscreen(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    const popup = urlParams.get('popup') === 'true';
    return popup;
  }

  const full = fullscreen();

  if (full) {
    import('../styles/popup.scss');
  }

  return (
    <React.Fragment>
      <Header fullscreen={full}></Header>
      <main></main>
    </React.Fragment>
  );
}
