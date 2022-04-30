import { useCallback, useEffect } from 'react';
import useChromeStorage from './useChromeStorage';

export default function createChromeStorageStateHook(
  key: string,
  initialValue: any,
  storageArea: 'sync' | 'local' | 'managed'
) {
  const consumers: any = [];

  return function useCreateChromeStorageHook() {
    const [value, setValue, isPersistent, error] = useChromeStorage(
      key,
      initialValue,
      storageArea
    );

    const setValueAll = useCallback((newValue: any) => {
      consumers.forEach((consumer: (arg0: any) => void) => {
        consumer(newValue);
      });
    }, []);

    useEffect(() => {
      consumers.push(setValue);
      return () => {
        consumers.splice(consumers.indexOf(setValue), 1);
      };
    }, [setValue]);

    return [value, setValueAll, isPersistent, error];
  };
}
