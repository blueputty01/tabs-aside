import React, { FormEvent, useState } from 'react';
import CreateButton from './Create';
import CreateModal from './SessionModal';

interface tabData {
  title: string;
  url: string;
}

interface props {
  save: (title: string, checked: boolean, tabs: tabData[]) => void;
}

export default function SessionManager(props: props) {
  const [isOpen, setOpen] = useState(true);

  const addHandler = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const submitNewSession = () => {
    // save(title, checked, null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CreateButton autoFocus={true} onClick={addHandler}></CreateButton>
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        save={submitNewSession}
      ></CreateModal>
    </React.Fragment>
  );
}
