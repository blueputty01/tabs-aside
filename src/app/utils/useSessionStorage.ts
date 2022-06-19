import { useChromeStorage } from 'shared/utils/chrome.storage/useChromeStorage';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import SessionStore from 'shared/types/Session';
import { useChromeStorageLocal } from 'shared/utils/chrome.storage';

type SessionKeys = string[];

/**
 * Basic hook for storage
 * @param {string} key
 * @param {*} initialValue
 * @param {'sync' | 'local' | 'managed'} storageArea
 * @returns {[*, function(*= any): void, boolean, string]}
 */
export default function useSessionStorage(
  key: string,
  initialValue: any,
  storageArea: 'sync' | 'local' | 'managed'
) {
  const [keys, setKeys, isPersistent, error] = useChromeStorageLocal(
    'sessionKeys',
    [] as SessionKeys
  );

  const [sessions, updateSessions] = useState([] as SessionStore[]);

  useEffect(() => {
    useChromeStorageLocal('')
  }, [keys]);

  useChromeStorageLocal('sessionKeys', [] as SessionKeys);

  return [sessions, updateSessions, isPersistent, error];
}
