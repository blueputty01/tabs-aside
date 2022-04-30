import React, { FormEvent, useState } from 'react';
import SessionCreation from './SessionCreation';

import { TabData } from './Tab';

export default function SessionManager() {
  const saveSession = (title: string, checked: boolean, tabs: TabData[]) => {};

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
    </main>
  );
}
