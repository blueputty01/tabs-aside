import React from 'react';
import './App.scss';
import Header from '../../shared/components/header/Header';
import { useChromeStorageLocal } from '../../shared/utils/chrome.storage';
import { Session } from '../../app/components/SessionManager';

export default function App() {
  const [value, setValue, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as Session[]
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
