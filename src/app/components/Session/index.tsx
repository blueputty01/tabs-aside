import Window, { openWindow } from './SessionWindow';
import SessionTitle from './Title';
import { useRef, useState, Fragment } from 'react';
import classnames from 'classnames';
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical';
import { Menu, Transition, Popover } from '@headlessui/react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  autoPlacement,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from '@floating-ui/react';
import type SessionData from 'shared/types/Session';
import type { TabData, TabStore } from 'shared/types/Tab';

export type ActionHandler = (e: React.MouseEvent<any>, id: string) => void;
interface SessionComponentProps extends SessionData {
  saveRename: (title: string) => void;
}

function OverflowMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-button inline-flex h-7 w-7 items-center justify-center">
        <BsThreeDotsVertical aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? 'bg-slate-300 ' : ''
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Rename
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Session({
  windows,
  title,
  saveRename,
  id,
}: SessionComponentProps) {
  const divRef = useRef(null);

  const [renameMode, setRenameMode] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const [isPopover, setIsPopover] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open: isPopover,
    onOpenChange: setIsPopover,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const openAll = () => {
    windows.forEach((savedWindow: TabStore[]) => {
      openWindow(savedWindow);
    });
  };

  const checkIfButton = (e: React.MouseEvent) =>
    ['BUTTON', 'svg', 'path'].includes((e.target as HTMLElement).tagName);

  const mouseIn = (e: React.MouseEvent) => {
    if (!checkIfButton(e)) {
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const mouseOut = () => {
    setHover(false);
  };

  const toggle = (e: React.MouseEvent) => {
    if (!checkIfButton(e)) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const Windows = windows.map((window, i) => {
    const idSet = new Set();

    const tabData = window.map((tab): TabData => {
      let tempId = tab.title;
      if (!idSet.has(tempId)) {
        let idCount = 0;
        let newId = tempId;
        while (idSet.has(newId)) {
          newId = `${tempId} ${idCount}`;
          idCount++;
        }
        tempId = newId;
      }
      idSet.add(tempId);
      return {
        ...tab,
        id: tempId,
      };
    }) as TabData[];

    return <Window key={window.length} index={i + 1} tabs={tabData} />;
  });

  const solutions = [
    {
      name: 'Insights',
      description: 'Measure actions your users take',
      href: '##',
      icon: BsThreeDotsVertical,
    },
    {
      name: 'Automations',
      description: 'Create your own targeted content',
      href: '##',
      icon: BsThreeDotsVertical,
    },
  ];

  // console.log(isPopover);

  return (
    <div
      className={classnames(
        !isOpen && 'rounded-b',
        'bg-theme-white rounded-lg border border-slate-300 shadow-sm dark:border-slate-700'
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        ref={divRef}
        onMouseOver={mouseIn}
        onMouseOut={mouseOut}
        onClick={toggle}
        onContextMenu={(e: React.MouseEvent) => {}}
        className={classnames(
          !isOpen && 'rounded-b-none',

          'flex h-14 w-full  cursor-pointer items-center rounded-lg px-2 py-1',
          hover && 'bg-slate-100 dark:bg-slate-800'
        )}
      >
        <SessionTitle
          title={title}
          renameMode={renameMode}
          saveRename={saveRename}
          className="grow"
        />
        <button
          type="button"
          onClick={openAll}
          className="button h-7 rounded-lg px-3"
        >
          Open All
        </button>
        <Popover className="relative">
          {({ open: isPopoverOpen }) => (
            <>
              <Popover.Button
                ref={refs.setReference}
                {...getReferenceProps()}
                className="rounded-button flex h-7 w-7 items-center justify-center"
              >
                <BsThreeDotsVertical />
              </Popover.Button>
              {isPopoverOpen && (
                <FloatingFocusManager context={context} modal={false}>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel
                      className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm origin-top-right -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
                      ref={refs.setFloating}
                      style={floatingStyles}
                      {...getFloatingProps()}
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                <item.icon aria-hidden="true" />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </FloatingFocusManager>
              )}
            </>
          )}
        </Popover>
      </div>

      {isOpen && (
        <div className="flex flex-col items-stretch p-2">
          {Windows.length ? (
            Windows
          ) : (
            <span className="text-slate-500">No tabs are present</span>
          )}
          <button type="button" className="button rounded-lg text-slate-500">
            <span>Add Window</span>
          </button>
        </div>
      )}
    </div>
  );
}
