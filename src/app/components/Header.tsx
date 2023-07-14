import React from 'react';
import Header from 'shared/components/Header';
import { IoMdSettings } from '@react-icons/all-files/io/IoMdSettings';
import { MdFullscreen } from '@react-icons/all-files/md/MdFullscreen';

interface HeaderProps {
  isPopup: boolean;
}

const settingsHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  link('options.html');
};

const fullscreenHandler = () => {
  link('app.html');
};

const link = (url: string): void => {
  chrome.tabs.create({
    url: url,
    active: true,
  });
};

export default function PopupHeader(props: HeaderProps) {
  const buttons = (
    <React.Fragment>
      <button onClick={settingsHandler} className="rounded-button">
        <IoMdSettings />
      </button>
      {props.isPopup && (
        <button onClick={fullscreenHandler} className="rounded-button">
          <MdFullscreen />
        </button>
      )}
    </React.Fragment>
  );

  return <Header buttons={buttons} />;
}
