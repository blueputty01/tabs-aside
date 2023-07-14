import React from 'react';
import Logo from 'shared/components/Logo';

interface props {
  buttons?: React.ReactNode;
  page?: string;
}

export default function Header(props: props) {
  return (
    <header className="section-outer border  border-slate-300">
      <div className="section-inner flex flex-wrap items-center py-3">
        <Logo page={props.page} className="h-7" />
        <div className="ml-auto flex">{props.buttons && props.buttons}</div>
      </div>
    </header>
  );
}
