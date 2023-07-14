import { FormEvent, useRef, useState } from 'react';
import SessionData from 'shared/types/Session';
import { TabData, TabStore } from 'shared/types/Tab';
import Window, { openWindow } from './SessionWindow';
import Title from './Title';

export type actionHandler = (e: React.MouseEvent<any>, id: string) => void;
interface SessionComponentProps extends SessionData {
  contextHandler: actionHandler;
  overflowClickHandler: actionHandler;
  renameMode: boolean;
  saveRename: (title: string) => void;
}

export default function Session(props: SessionComponentProps) {
  const divRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const openAll = () => {
    props.windows.forEach((savedWindow: TabStore[]) => {
      openWindow(savedWindow);
    });
  };

  const mouseIn = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const mouseOut = (e: React.MouseEvent) => {
    if (e.target === divRef.current) {
      setHover(false);
    }
  };

  const toggle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      setIsOpen((isOpen) => {
        return !isOpen;
      });
    }
  };

  const Windows = props.windows.map((window, i) => {
    const idSet = new Set();

    const tabData = window.map((tab): TabData => {
      let id = tab.title;
      if (!idSet.has(id)) {
        let i = 0;
        let newId = id;
        while (idSet.has(newId)) {
          newId = `${id} ${i}`;
          i++;
        }
        id = newId;
      }
      idSet.add(id);
      return {
        ...tab,
        id,
      };
    }) as TabData[];

    return <Window key={window.length} index={i + 1} tabs={tabData}></Window>;
  });

  function ButtonContainer() {
    return (
      <div>
        <button onClick={openAll}>Open All</button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            props.overflowClickHandler(e, props.id);
          }}
        >
          ⋮
        </button>
      </div>
    );
  }

  return (
    <div
      className={[
        // styles.session,
        // isOpen ? styles.selected : styles.collapsed,
      ].join(' ')}
    >
      <div
        ref={divRef}
        onMouseOver={mouseIn}
        onMouseOut={mouseOut}
        onClick={toggle}
        onContextMenu={(e: React.MouseEvent) => {
          props.contextHandler(e, props.id);
        }}
        className={[
          // styles.titleBar,
          // !props.renameMode && hover && styles.hover,
        ].join(' ')}
      >
        <Title
          title={props.title}
          renameMode={props.renameMode}
          //
          saveRename={props.saveRename}
        ></Title>
        <ButtonContainer></ButtonContainer>
      </div>
      {isOpen && <div>{Windows}</div>}
    </div>
  );
}
