import Header from 'shared/components/Header';
import { IoMdSettings } from '@react-icons/all-files/io/IoMdSettings';
import { MdFullscreen } from '@react-icons/all-files/md/MdFullscreen';

interface HeaderProps {
  isPopup: boolean;
}

const link = (url: string): void => {
  chrome.tabs.create({
    url,
    active: true,
  });
};

export default function PopupHeader({ isPopup }: HeaderProps) {
  const buttons = (
    <>
      <button
        type="button"
        onClick={() => link('options.html')}
        className="rounded-button h-10 w-10 text-xl"
      >
        <IoMdSettings />
      </button>
      {isPopup && (
        <button
          type="button"
          onClick={() => link('app.html')}
          className="rounded-button h-10 w-10 text-xl"
        >
          <MdFullscreen />
        </button>
      )}
    </>
  );

  return <Header buttons={buttons} />;
}
