import React from 'react';
import './App.scss';
import Header from '../../shared/components/header/Header';

export default function App() {
  return (
    <div>
      <Header fullscreen={false}></Header>
      <main></main>
    </div>
  );
}
