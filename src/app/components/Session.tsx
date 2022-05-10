import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Tab from "./Tab";
import styles from "./Session.scss";

interface SessionI {
  title: string;
  tabs: TabData[];
  deleteHandler: MouseEventHandler;
}

interface TabStore {
  title: string;
  url: string;
}

export default function Session(props: SessionI) {
  return (
    <div className={styles.session}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.buttonContainer}>⋮</div>
    </div>
  );
}

export type { SessionI, TabStore };
