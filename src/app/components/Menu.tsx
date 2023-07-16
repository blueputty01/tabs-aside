import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface MenuProps {
  visibility: boolean;
  loc: Point;
  trigger: HTMLElement | null;
  children: React.ReactNode;
  id: string;
  onExit: () => void;
}

export type Point = [number, number];

const getWidth = () =>
  Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );

const getHeight = () =>
  Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );

export default function Menu({
  loc,
  trigger,
  onExit,
  visibility,
  children,
  id,
}: MenuProps) {
  const absorbedEvent = useRef(false);

  const menu = useRef(null);

  const pageH = getHeight();
  const pageW = getWidth();

  const clickX = loc[0];
  const clickY = loc[1];

  const [left, setLeft] = useState(clickX);
  const [top, setTop] = useState(clickY);

  useLayoutEffect(() => {
    if (menu.current !== null) {
      const rect = (menu.current as HTMLDivElement).getBoundingClientRect();

      let newLeft = clickX;
      if (clickX + rect.width > pageW) {
        while (newLeft + rect.width > pageW) {
          newLeft -= rect.width;
        }
      }
      setLeft(newLeft);

      let newTop = clickY;
      if (clickY + rect.height > pageH) {
        while (newTop + rect.height > pageH) {
          newTop -= rect.height;
        }
      }
      setTop(newTop);
    }
  }, [clickX, clickY]);

  const locStyles = {
    top,
    left,
    display: visibility ? 'flex' : 'none',
  };

  const windowHandler = (e: MouseEvent) => {
    if (absorbedEvent.current || trigger == null) {
      absorbedEvent.current = false;
      onExit();
    } else if (e.target === trigger) {
      absorbedEvent.current = true;
    }
  };

  useEffect(() => {
    window.addEventListener('click', windowHandler);
    return () => {
      window.removeEventListener('click', windowHandler);
    };
  }, [onExit]);

  const iDItems = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { id });
    }
    return null;
  });

  return (
    <div ref={menu} style={locStyles}>
      {iDItems}
    </div>
  );
}

interface MenuItemProps {
  label: string;
  onClick: Function;
  id?: string;
}

export function MenuItem({ id, onClick, label }: MenuItemProps) {
  const clickHandler = () => {
    onClick(id);
  };

  return (
    <button key={label} type="button" onClick={clickHandler} tabIndex={0}>
      {label}
    </button>
  );
}
