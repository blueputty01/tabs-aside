import OpenTabs from './OpenTabs';
import Checkbox from 'shared/components/Checkbox';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { MdClose } from '@react-icons/all-files/md/MdClose';
import type { FormEvent, MouseEventHandler } from 'react';
import type { SelectionHandler } from './OpenTabs';

import type { TabData } from 'shared/types/Tab';

interface CreateModalProps {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  saveHandler: (
    title: string,
    checked: boolean,
    tabs: chrome.tabs.Tab[][]
  ) => void;
}

Modal.setAppElement('#root');

export default function CreateModal({
  isOpen,
  closeModal,
  saveHandler,
}: CreateModalProps) {
  const defaultTitle = '';
  const defaultChecked = false;

  const [title, setTitle] = useState(defaultTitle);
  const [closeAll, setChecked] = useState(defaultChecked);
  const [selected, setSelected] = useState([] as chrome.tabs.Tab[][]);

  useEffect(() => {
    if (!isOpen) {
      setTitle(defaultTitle);
      setChecked(defaultChecked);
    }
  }, [isOpen]);

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setTitle(inputEle.value);
  };

  const checkChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setChecked(inputEle.checked);
  };

  const onSelectionChange: SelectionHandler = (tabs: TabData[][]) => {
    setSelected(tabs as chrome.tabs.Tab[][]);
  };

  const save = () => {
    saveHandler(title, closeAll, selected);
  };

  const closeAnimateModal: MouseEventHandler = (e) => {
    closeModal(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeAnimateModal}
      contentLabel="Session Modal"
      overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-25 section-outer p-5 z-20"
      className="section-inner bg-theme-white flex max-h-full flex-col overflow-hidden rounded-lg p-5 shadow-md"
      closeTimeoutMS={100}
    >
      <div className="mb-5 flex gap-2">
        <input
          type="text"
          placeholder="Session name"
          value={title}
          onChange={nameChangeHandler}
          className="flex h-10 w-full rounded-md border-2 border-slate-300 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={closeAnimateModal}
          type="button"
          className="rounded-button ml-2 h-10 w-10 text-xl text-slate-500"
        >
          <MdClose />
        </button>
      </div>

      <span className="mb-1">Select tabs:</span>
      <OpenTabs onSelectionChange={onSelectionChange} className="mb-5" />

      <div className="flex justify-between">
        <Checkbox
          checked={closeAll}
          onChange={checkChangeHandler}
          id="close-checkbox"
        />
        <button
          onClick={save}
          type="button"
          className="button-accent rounded-lg px-5 py-2 shadow-md"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
