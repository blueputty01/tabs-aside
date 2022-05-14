import React from 'react';
import './App.scss';
import Header from 'shared/components/header/Header';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import { SessionStore } from '../../app/components/Session';

export default function App() {
  const [value, setValue, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionStore[]
  );
  return (
    <div>
      <Header page="Settings"></Header>
      <main>
        <section className="advanced">
          <div>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        </section>
      </main>
    </div>
  );
}
