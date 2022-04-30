const storage = {
  get: (
    key: string,
    defaultValue: any,
    storageArea: 'sync' | 'local' | 'managed'
  ) => {
    const keyObj = defaultValue === undefined ? key : { [key]: defaultValue };
    return new Promise((resolve, reject) => {
      chrome.storage[storageArea].get(keyObj, (items) => {
        const error = chrome.runtime.lastError;
        if (error) return reject(error);
        resolve(items[key]);
      });
    });
  },
  set: (key: string, value: any, storageArea: 'sync' | 'local' | 'managed') =>
    new Promise<void>((resolve, reject) => {
      chrome.storage[storageArea].set({ [key]: value }, () => {
        const error = chrome.runtime.lastError;
        error ? reject(error) : resolve();
      });
    }),
};

export default storage;
