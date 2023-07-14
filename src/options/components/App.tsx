import React, { Fragment } from 'react';
import 'shared/global.css';
import Header from 'shared/components/Header';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import SessionData from 'shared/types/Session';
import Section from './Section';

export default function App() {
  const [value, setValue, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );
  return (
    <Fragment>
      <Header page="Settings"></Header>
      <main>
        <Section title="General"></Section>
        <Section title="Advanced">
          <div>
            Debugging data
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        </Section>
        <Section title="About">
          <div className="container">
            <p>
              <a href="https://chrome.google.com/webstore/detail/tabs-aside/nboikgnmjgjcnnhencinblbaikdccdlb">
                Tabs Aside{' '}
              </a>
              by <a href="https://blueputty01.github.io">Alexander Yang</a>
            </p>
            <p>
              Problem/cool idea? Contact the developer by emailing{' '}
              <a href="mailto:blueputty01@gmail.com">blueputty01@gmail.com</a>{' '}
              (preferred) or by posting on the support page under the Tabs Aside{' '}
              {''}
              <a href="https://chrome.google.com/webstore/detail/tabs-aside/nboikgnmjgjcnnhencinblbaikdccdlb">
                Chrome Web Store listing
              </a>{' '}
              (I won't get notified of posts there).
            </p>
          </div>
        </Section>
      </main>
    </Fragment>
  );
}
