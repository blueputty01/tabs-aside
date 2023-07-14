import { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import Modal from 'react-modal';

import Checkbox from 'shared/components/Checkbox';

import { MdClose } from '@react-icons/all-files/md/MdClose';
import OpenTabs from './OpenTabs';

import { SelectionHandler } from './OpenTabs';
import { TabData } from 'shared/types/Tab';

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
      overlayClassName="fixed inset-0 bg-slate-900 bg-opacity-25 section-outer p-5"
      className="section-inner flex max-h-full flex-col gap-y-3 overflow-hidden rounded-lg bg-white p-5 shadow-md"
      closeTimeoutMS={100}
    >
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Session name"
          value={title}
          onChange={nameChangeHandler}
          className="flex h-10 w-full rounded-md border-2 border-slate-300 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button onClick={closeAnimateModal} className="rounded-button ml-2">
          <MdClose />
        </button>
      </div>

      <span>Select tabs:</span>
      <OpenTabs onSelectionChange={onSelectionChange}></OpenTabs>

      <div className="flex justify-between">
        <Checkbox
          checked={closeAll}
          onChange={checkChangeHandler}
          id="close-checkbox"
        />
        <button
          onClick={save}
          className="button rounded-lg px-5 py-2 text-blue-500 shadow-md"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
