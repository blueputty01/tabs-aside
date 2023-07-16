import Logo from 'shared/components/Logo';
import type React from 'react';

interface HeaderProps {
  buttons?: React.ReactNode;
  page?: string;
}

export default function Header({ buttons, page }: HeaderProps) {
  return (
    <header className="section-outer bg-theme-white sticky top-0 z-20 shadow-sm">
      <div className="section-inner flex flex-wrap items-center py-3">
        <Logo page={page} className="h-7" />
        <div className="ml-auto flex">{buttons && buttons}</div>
      </div>
    </header>
  );
}
