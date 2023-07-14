import {
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { IoMdAdd } from '@react-icons/all-files/io/IoMdAdd';

interface CreateProps {
  autoFocus?: boolean;
  onClick?: MouseEventHandler;
}

export default function CreateButton(props: CreateProps) {
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
      className="button flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 shadow-md"
      onClick={props.onClick}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      autoFocus={props.autoFocus}
    >
      <IoMdAdd size={25} />
      Add Session
    </button>
  );
}
