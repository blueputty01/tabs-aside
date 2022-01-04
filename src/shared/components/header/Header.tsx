import React from 'react';
import './Header.scss';
import Logo from './Logo';
import Button from './Button';

interface props {
  fullscreen: boolean;
}

export default function Header({ fullscreen }: props) {
  return (
    <header>
      <Logo></Logo>
      <div className="button-container">
        <Button type="settings"></Button>
        {fullscreen && <Button type="fullscreen"></Button>}
      </div>
    </header>
  );
}
