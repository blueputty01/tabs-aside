import React, { useState } from 'react';
import './App.scss';
import Header from './Header';
import CreateButton from './Create';
import SessionCreate from './SessionCreate';

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

  const [isOpen, setOpen] = useState(false);

  const addHandler = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const submitNewSession = () => {
    setOpen(false);
  };

  console.log('loaded');

  return (
    <React.Fragment>
      <Header fullscreen={full}></Header>
      <main>
        <CreateButton autoFocus={true} onClick={addHandler}></CreateButton>
        <SessionCreate
          isOpen={isOpen}
          closeModal={closeModal}
          onSubmit={submitNewSession}
        ></SessionCreate>
      </main>
    </React.Fragment>
  );
}
