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
  const defaultTitle = '';
  const defaultChecked = false;

  const [isOpen, setOpen] = useState(true);
  const [title, setTitle] = useState(defaultTitle);
  const [checked, setChecked] = useState(defaultChecked);

  const addHandler = () => {
    setOpen(true);
  };

  const clear = () => {
    setTitle(defaultTitle);
    setChecked(defaultChecked);
  };

  const closeModal = () => {
    setOpen(false);
    clear();
  };

  const submitNewSession = () => {
    // save(title, checked, null);
    setOpen(false);
    clear();
  };

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setTitle(inputEle.value);
  };

  const checkHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setChecked(inputEle.checked);
  };

  return (
    <React.Fragment>
      <CreateButton autoFocus={true} onClick={addHandler}></CreateButton>
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        onSubmit={submitNewSession}
        title={title}
        closeAll={checked}
        nameChangeHandler={nameChangeHandler}
        checkChangeHandler={checkHandler}
      ></CreateModal>
    </React.Fragment>
  );
}
