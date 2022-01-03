import React from 'react';
import './App.scss';
import Header from './Header';

export default function App() {
  const queryString = window.location.search;
  console.log(queryString);
  if (queryString.length > 0) {
    import('./App-popup.scss').then(() => {
      console.log();
    });
  }
  return (
    <div>
      <Header></Header>
      <main></main>
    </div>
  );
}
