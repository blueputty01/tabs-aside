import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="section-inner py-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children}
    </section>
  );
}
