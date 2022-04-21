import React, { FormEventHandler, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionCreate.scss';
import utils from '../../shared/scss/utils.scss';

import CloseIcon from '../../shared/img/icons/close.svg';
import OpenTabs from './OpenTabs';

interface props {
  title: string;
  closeAll: boolean;
  isOpen: boolean;
  nameChangeHandler: FormEventHandler;
  checkChangeHandler: FormEventHandler;
  closeModal: MouseEventHandler;
  onSubmit: MouseEventHandler;
}

Modal.setAppElement('#root');

export default function SessionCreate(props: props) {
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
          value={props.title}
          onChange={props.nameChangeHandler}
          className={styles.title}
        />
        <button onClick={props.closeModal} className={styles.close}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles.openTabContainer}>
        <span>Select tabs:</span>
        <OpenTabs className={styles.openTabs}></OpenTabs>
      </div>

      <div className={styles.lastRow}>
        <label className={styles.closeCreate}>
          <input
            type="checkbox"
            className={styles.closeCreate}
            checked={props.closeAll}
            onChange={props.checkChangeHandler}
          />
          <span className={styles.closeCreate}>Close selected tabs</span>
        </label>
        <button
          onClick={props.onSubmit}
          className={[styles.doneCreate, utils.accent].join(' ')}
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
