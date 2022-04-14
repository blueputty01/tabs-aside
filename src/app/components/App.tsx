import React from 'react';
import './App.scss';
import Header from './Header';
import Create from './Create';

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
      <main>
        <Create autoFocus={true}></Create>
      </main>
    </React.Fragment>
  );
}
