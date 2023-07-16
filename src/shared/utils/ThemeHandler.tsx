import { useChromeStorageLocal } from 'shared/utils/chrome.storage';
import { useLayoutEffect } from 'react';

export default function ThemeHandler() {
  const [theme] = useChromeStorageLocal('theme', undefined);
  useLayoutEffect(() => {
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}
