import Header from 'app/components/Header';
import SessionManager from 'app/components/SessionManager';
import ThemeHandler from 'shared/utils/ThemeHandler';
import { useMemo } from 'react';
import 'shared/global.css';

export default function App() {
  const isPopup = (): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    const popup = urlParams.get('popup') === 'true';
    if (popup) {
      document.documentElement.classList.add('popup');
    }
    return popup;
  };

  const isPop = useMemo(() => isPopup(), []);

  return (
    <>
      <ThemeHandler />
      <Header isPopup={isPop} />
      <SessionManager />
    </>
  );
}
