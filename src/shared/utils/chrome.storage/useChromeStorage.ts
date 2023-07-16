import storage from './storage';
import { useCallback, useEffect, useState } from 'react';
import type { SetStateAction} from 'react';

/**
 * Basic hook for storage
 * @param {string} key
 * @param {*} initialValue
 * @param {'sync' | 'local' | 'managed'} storageArea
 * @returns {[*, function(*= any): void, boolean, string]}
 */
export default function useChromeStorage(
  key: string,
  initialValue: any,
  storageArea: 'sync' | 'local' | 'managed'
) {
  const [INITIAL_VALUE] = useState(() => typeof initialValue === 'function' ? initialValue() : initialValue);
  const [STORAGE_AREA] = useState(storageArea);
  const [state, setState] = useState(INITIAL_VALUE);
  const [isPersistent, setIsPersistent] = useState(true);
  const [globalError, setError] = useState('');

  useEffect(() => {
    storage
      .get(key, INITIAL_VALUE, STORAGE_AREA)
      .then((res: any) => {
        setState(res);
        setIsPersistent(true);
        setError('');
      })
      .catch((error: SetStateAction<string>) => {
        setIsPersistent(false);
        setError(error);
      });
  }, [key, INITIAL_VALUE, STORAGE_AREA]);

  const updateValue = useCallback(
    (newValue: (arg0: any) => any) => {
      const toStore =
        typeof newValue === 'function' ? newValue(state) : newValue;
      storage
        .set(key, toStore, STORAGE_AREA)
        .then(() => {
          setIsPersistent(true);
          setError('');
        })
        .catch((error: SetStateAction<string>) => {
          // set newValue to local state because chrome.storage.onChanged won't be fired in error case
          setState(toStore);
          setIsPersistent(false);
          setError(error);
        });
    },
    [STORAGE_AREA, key, state]
  );

  useEffect(() => {
    const onChange = (
      changes: { [x: string]: chrome.storage.StorageChange },
      areaName: 'sync' | 'local' | 'managed'
    ) => {
      if (areaName === STORAGE_AREA && key in changes) {
        setState(changes[key].newValue);
        setIsPersistent(true);
        setError('');
      }
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, [key, STORAGE_AREA]);

  return [state, updateValue, isPersistent, globalError];
}
