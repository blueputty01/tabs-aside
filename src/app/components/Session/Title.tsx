import React, { useEffect, useRef, useState } from 'react';

interface TitleProps {
  title: string;
  renameMode: boolean;
  className?: string;
  saveRename: (title: string) => void;
}

export default function Title(props: TitleProps) {
  const ref = useRef<HTMLInputElement>(null);

  //in flux title during rename
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    setTitle(title);
  }, [props.title]);

  useEffect(() => {
    if (props.renameMode) {
      if (ref.current) {
        ref.current.focus();
        ref.current.select();
      }
    }
  }, [props.renameMode]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.saveRename(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.saveRename((e.target as HTMLInputElement).value);
    }
  };

  return props.renameMode ? (
    <input
      className={props.className}
      value={title}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      ref={ref}
    ></input>
  ) : (
    <div>{props.title}</div>
  );
}
