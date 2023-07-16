import CreateModal from './CreateModal';
import { useState } from 'react';
import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';

interface SessionManagerProps {
  saveHandler: (
    title: string,
    checked: boolean,
    tabs: chrome.tabs.Tab[][]
  ) => void;
}

export default function SessionManager({ saveHandler }: SessionManagerProps) {
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
    saveHandler(title, checked, tabs);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        title="Crate a session"
        className="button-accent bg-theme-white flex h-14 w-full items-center justify-center gap-2 rounded-lg shadow-md"
        onClick={addHandler}
      >
        <IoMdAdd size={25} />
        Add Session
      </button>
      <CreateModal
        isOpen={isOpen}
        closeModal={closeModal}
        saveHandler={submitNewSession}
      />
    </>
  );
}
