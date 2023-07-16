import { useEffect, useRef, useState } from 'react';
import type React from 'react';

interface Title {
  title: string;
  renameMode: boolean;
  className?: string;
  saveRename: (title: string) => void;
}

export default function SessionTitle({
  renameMode,
  className,
  title,
  saveRename,
}: Title) {
  const ref = useRef<HTMLInputElement>(null);

  // in flux title during rename
  const [inputTitle, setInputTitle] = useState(title);

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  useEffect(() => {
    if (renameMode) {
      if (ref.current) {
        ref.current.focus();
        ref.current.select();
      }
    }
  }, [renameMode]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveRename(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveRename((e.target as HTMLInputElement).value);
    }
  };

  return renameMode ? (
    <input
      className={className}
      value={inputTitle}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      ref={ref}
    />
  ) : (
    <div className={className}>{title}</div>
  );
}
