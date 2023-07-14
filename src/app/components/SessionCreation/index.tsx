import { FormEvent, useState } from 'react';
import CreateButton from './Create';
import CreateModal from './CreateModal';
import { TabData } from 'shared/types/Tab';
import React from 'react';

interface props {
  saveHandler: (
    title: string,
    checked: boolean,
    tabs: chrome.tabs.Tab[][]
  ) => void;
}

export default function SessionManager(props: props) {
  const [isOpen, setOpen] = useState(false);

  const addHandler = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const submitNewSession = (
    title: string,
    checked: boolean,
    tabs: chrome.tabs.Tab[][]
  ) => {
    props.saveHandler(title, checked, tabs);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CreateButton autoFocus={true} onClick={addHandler} />
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        saveHandler={submitNewSession}
      />
    </React.Fragment>
  );
}
