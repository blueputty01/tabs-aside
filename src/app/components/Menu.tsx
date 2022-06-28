import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Menu.scss';

interface MenuProps {
  visibility: boolean;
  loc: Point;
  triggerElement: HTMLElement;
  onExit: () => void;
}

export type Point = [number, number];

const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
};

const getHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
};

export default function Menu(props: MenuProps) {
  const menu = useRef(null);

  const pageH = getHeight();
  const pageW = getWidth();

  const clickX = props.loc[0];
  const clickY = props.loc[1];

  const [left, setLeft] = useState(clickX);
  const [top, setTop] = useState(clickY);

  useLayoutEffect(() => {
    if (menu.current !== null) {
      const divBox = (menu.current as HTMLDivElement).getBoundingClientRect();

      let newLeft = clickX;
      if (clickX + divBox.width > pageW) {
        while (newLeft + divBox.width > pageW) {
          newLeft -= divBox.width;
        }
      }
      setLeft(newLeft);

      let newTop = clickY;
      if (clickY + divBox.height > pageH) {
        while (newTop + divBox.height > pageH) {
          newTop -= divBox.height;
        }
      }
      setTop(newTop);
    }
  }, [clickX, clickY]);

  let locStyles = {
    top,
    left,
    display: props.visibility ? 'flex' : 'none',
  };

  const windowHandler = (e: MouseEvent) => {
    if (!(e.clientX === clickX && e.clientY == clickY)) {
      props.onExit();
    }
  };

  useEffect(() => {
    window.addEventListener('click', windowHandler);
    return () => {
      window.removeEventListener('click', windowHandler);
    };
  }, [props.onExit]);

  return (
    <div ref={menu} className={styles.menu} style={locStyles}>
      <span>Rename</span>
      <span>Delete</span>
    </div>
  );
}
