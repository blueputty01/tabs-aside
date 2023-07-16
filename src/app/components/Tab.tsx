import classnames from 'classnames';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import type { MouseEventHandler } from 'react';

interface Props {
  title: string;
  selected?: boolean;
  onClick?: MouseEventHandler;
  url: string;
  onClose?: Function;
}

function faviconURL(u: string) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', u);
  url.searchParams.set('size', '16');
  return url.toString();
}

export default function Tab({ url, title, onClick, onClose, selected }: Props) {
  return (
    <div
      className={classnames(
        'relative flex w-full items-center space-x-2 overflow-hidden rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
        selected ? 'bg-blue-200' : 'hover:bg-blue-100'
      )}
      title={`${title}\n${url}`}
    >
      <button
        onClick={onClick}
        type="button"
        className={classnames(
          'flex grow cursor-pointer items-center gap-2 overflow-hidden text-clip whitespace-nowrap bg-gradient-to-r from-slate-900 from-95% to-transparent bg-clip-text text-left text-transparent dark:from-slate-100'
        )}
      >
        <img src={faviconURL(url)} alt="favicon" className="h-4" />
        {title}
      </button>
      {onClose && (
        <button
          className="button rounded-full p-1 text-slate-500"
          type="button"
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
}
