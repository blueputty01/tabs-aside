import React, { FormEvent, useState } from 'react';
import SessionCreation from './SessionCreation';

export default function SessionManager() {
  const saveSession = () => {};

  return (
    <main>
      <SessionCreation save={saveSession}></SessionCreation>
    </main>
  );
}
