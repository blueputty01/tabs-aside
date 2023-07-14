import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export default function Section(props: SectionProps) {
  return (
    <section>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  );
}
