import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionCreate.scss';

import CloseIcon from '../../shared/img/icons/close.svg';

interface props {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  onSubmit: MouseEventHandler;
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
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
      <button onClick={props.closeModal} className={styles.close}>
        <CloseIcon />
      </button>
      <input type="text" className={styles.title} />
      <span>Select tabs:</span>
      <div className={styles.openTabs}></div>
      <label htmlFor="" className={styles.closeCreate}>
        <input type="checkbox" />
        <span>Close selected tabs</span>
      </label>
      <button onClick={props.onSubmit} className={styles.doneCreate}>
        Done
      </button>
    </Modal>
  );
}
