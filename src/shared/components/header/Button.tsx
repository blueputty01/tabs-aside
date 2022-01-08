import React from 'react';
import './Header.scss';
import Logo from './Logo';

interface props {
  type: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ type, onClick }: props) {
  return (
    <button id={type} title={type} onClick={onClick}>
      <img src={`/img/icons/${type}.svg`} alt={type} draggable="false" />
    </button>
  );
}
