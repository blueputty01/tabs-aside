import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from './SessionCreate.scss';
import utils from '../../shared/scss/utils.scss';

import CloseIcon from '../../shared/img/icons/close.svg';
import OpenTabs from './OpenTabs';

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
      <div className={styles.row1}>
        <input
          type="text"
          placeholder="Session name"
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
          <input type="checkbox" className={styles.closeCreate} />
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
