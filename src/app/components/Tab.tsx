import classnames from 'classnames';
import { MouseEventHandler } from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';

interface Props {
  title: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  url: string;
  hoverClass?: string;
  top?: boolean;
  bottom?: boolean;
  onClose?: Function;
}

function faviconURL(u: string) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', u);
  url.searchParams.set('size', '16');
  return url.toString();
}

export default function Tab({
  url,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onClose,
  selected,
}: Props) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classnames(
        'relative flex w-full cursor-pointer items-center space-x-2 overflow-hidden rounded-md px-2 py-1 hover:bg-gray-100',
        selected && 'bg-gray-200'
      )}
      title={`${title}\n${url}`}
    >
      <img src={faviconURL(url)} className="h-4"></img>
      <span
        className={classnames(
          'grow overflow-hidden text-clip whitespace-nowrap bg-gradient-to-r from-slate-900 from-95% to-transparent bg-clip-text text-transparent'
        )}
      >
        {title}
      </span>
      {onClose && (
        <button className="rounded-button text-xl">
          <IoMdClose />
        </button>
      )}
    </div>
  );
}
