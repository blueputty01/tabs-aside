import { MouseEventHandler } from 'react';

interface Icon {
  type?: string;
  onClick: MouseEventHandler;
  className?: string;
}

export default function Icon(props: Icon) {
  return (
    <button
      title={props.type}
      onClick={props.onClick}
      className={props.className}
    >
      <img
        src={`/img/icons/${props.type}.svg`}
        alt={props.type}
        draggable="false"
      />
    </button>
  );
}
