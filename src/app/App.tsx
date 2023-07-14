import { useMemo } from 'react';
import Header from 'app/components/Header';
import SessionManager from 'app/components/SessionManager';
import 'shared/global.css';

export default function App() {
  const isPopup = (): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    const popup = urlParams.get('popup') === 'true';
    return popup;
  };

  const isPop = useMemo(() => isPopup(), []);

  return (
    <>
      <Header isPopup={isPop} />
      <SessionManager />
    </>
  );
}
