import { ReactNode } from 'react';
import styles from './Section.scss';

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export default function Section(props: SectionProps) {
  return (
    <section className={styles.section}>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  );
}
