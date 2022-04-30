import React, {
  MouseEventHandler,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Create.scss';
import utils from 'shared/scss/utils.scss';

import AddIcon from './add.svg';

interface props {
  autoFocus?: boolean;
  onClick?: MouseEventHandler;
}

export default function CreateButton(props: props) {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const [hasFocus, setFocus] = useState(false);

  useEffect(() => {
    if (document.hasFocus() && ref.current?.contains(document.activeElement)) {
      setFocus(true);
    }
  }, []);

  return (
    <button
      title="Crate a session"
      className={[styles.add, utils.accent].join(' ')}
      onClick={props.onClick}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      autoFocus={props.autoFocus}
    >
      <AddIcon />
      Add Session
    </button>
  );
}
