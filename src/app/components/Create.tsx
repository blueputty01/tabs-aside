import React from 'react';
import Button from '../../shared/components/Button';
import styles from './Create.scss';

import Add from './add.svg';

export default function Header() {
  return (
    <Button alt="add" className={[styles.add].join('')} onClick={() => {}}>
      <Add />
      Add Session
    </Button>
  );
}
