import React from 'react';
import './Header.scss';
import Logo from './Logo';

interface props {
  type: string;
}

export default function Button({ type }: props) {
  return (
    <button id={type} title={type}>
      <img src={`/img/icons/${type}.svg`} alt={type} draggable="false" />
    </button>
  );
}
