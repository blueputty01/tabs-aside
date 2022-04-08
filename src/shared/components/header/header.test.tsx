// Header.test.js

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Header from './Header';

let container: HTMLElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

it('renders with or without a name', () => {
  act(() => {
    render(<Header fullscreen={false}></Header>, container);
  });
  expect(container.textContent).toBe('Hey, stranger');

  act(() => {
    render(<Header fullscreen={true}></Header>, container);
  });
  expect(container.textContent).toBe('Header, Jenny!');
});
