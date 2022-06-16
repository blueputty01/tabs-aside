import React, {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionModal.scss';
import utils from 'shared/scss/utils.scss';

import CloseIcon from '../../shared/img/icons/close.svg';
import OpenTabs from './SessionCreation/OpenTabs';

import { SelectionHandler } from './SessionCreation/OpenTabs';
import TabData from 'shared/types/TabData';

interface props {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  save: (title: string, checked: boolean, tabs: TabData[][]) => void;
}

Modal.setAppElement('#root');

export default function SessionCreate(props: props) {
  const defaultTitle = '';
  const defaultChecked = false;

  const [title, setTitle] = useState(defaultTitle);
  const [closeAll, setChecked] = useState(defaultChecked);
  const [selected, setSelected] = useState([] as TabData[][]);

  useEffect(() => {
    if (!props.isOpen) {
      setTitle(defaultTitle);
      setChecked(defaultChecked);
    }
  }, [props.isOpen]);

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setTitle(inputEle.value);
  };

  const checkChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputEle = event.target as HTMLInputElement;
    setChecked(inputEle.checked);
  };

  const onSelectionChange: SelectionHandler = (tabs: TabData[][]) => {
    setSelected(tabs);
  };

  const save = () => {
    props.save(title, closeAll, selected);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      contentLabel="Session Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={100}
    >
      <div className={styles.row1}>
        <input
          type="text"
          placeholder="Session name"
          value={title}
          onChange={nameChangeHandler}
          className={styles.title}
        />
        <button onClick={props.closeModal} className={styles.close}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles.openTabContainer}>
        <span>Select tabs:</span>
        <OpenTabs
          className={styles.openTabs}
          onSelectionChange={onSelectionChange}
        ></OpenTabs>
      </div>

      <div className={styles.lastRow}>
        <label className={styles.closeCreate}>
          <input
            type="checkbox"
            className={styles.closeCreate}
            checked={closeAll}
            onChange={checkChangeHandler}
          />
          <span className={styles.closeCreate}>Close selected tabs</span>
        </label>
        <button
          onClick={save}
          className={[styles.doneCreate, utils.accent].join(' ')}
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
