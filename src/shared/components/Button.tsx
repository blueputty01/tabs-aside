import React from 'react';

interface props {
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ alt, onClick, children, className }: props) {
  return (
    <button id={alt} className={className} title={alt} onClick={onClick}>
      {children}
    </button>
  );
}
