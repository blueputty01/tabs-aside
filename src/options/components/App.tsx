import 'shared/global.css';
import Section from './Section';
import Header from 'shared/components/Header';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import ThemeHandler from 'shared/utils/ThemeHandler';
import { MdRefresh } from '@react-icons/all-files/md/MdRefresh';
import { Listbox, Transition } from '@headlessui/react';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { BsCheck } from '@react-icons/all-files/bs/BsCheck';
import { Fragment } from 'react';
import classnames from 'classnames';
import type SessionData from 'shared/types/Session';

const themes = ['light', 'dark', 'system'];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function ModeSelector() {
  const [theme, setTheme] = useChromeStorageLocal('theme', themes[0]);

  return (
    <Listbox value={theme} onChange={setTheme}>
      {({ open }) => (
        <div className="flex items-center gap-2">
          <Listbox.Label as="span">
            Theme (dark mode is experimental)
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="bg-theme-white relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500  dark:ring-slate-800 sm:text-sm sm:leading-6">
              <span className="flex items-center">{capitalize(theme)}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <FiChevronDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="bg-theme-white absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:ring-white dark:ring-opacity-90 sm:text-sm">
                {themes.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classnames(
                        active ? 'bg-blue-600 text-white dark:bg-blue-800' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        {capitalize(option)}
                        {selected ? (
                          <span
                            className={classnames(
                              active ? 'text-white' : 'text-blue-500',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <BsCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue, isPersistent, error] = useChromeStorageLocal(
    'sessions',
    [] as SessionData[]
  );
  return (
    <>
      <ThemeHandler />
      <Header page="settings" />
      <main className="section-outer text-base">
        <Section title="General">
          <ModeSelector />
        </Section>

        <Section title="Advanced">
          <button
            type="button"
            onClick={() => {
              chrome.storage.local.clear();
              window.location.reload();
            }}
            className="button flex items-center gap-2 rounded-lg px-4 py-2 shadow-sm"
          >
            <MdRefresh className="text-xl" />
            Reset
          </button>
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
              <a href="https://chrome.google.com/webstore/detail/tabs-aside/nboikgnmjgjcnnhencinblbaikdccdlb">
                Chrome Web Store listing
              </a>{' '}
              (I won&apos;t get notified of posts there).
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
