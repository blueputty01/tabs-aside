import React, { MouseEventHandler } from 'react';

interface Icon {
  type?: string;
  onClick: MouseEventHandler;
}

export default function Icon(props: Icon) {
  return (
    <button title={props.type} onClick={props.onClick}>
      <img
        src={`/img/icons/${props.type}.svg`}
        alt={props.type}
        draggable="false"
      />
    </button>
  );
}
