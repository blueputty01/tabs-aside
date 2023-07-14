import classnames from 'classnames';

interface LogoProps {
  page?: string;
  className?: string;
}

export default function Logo({ page, className }: LogoProps) {
  let title: string = 'tabs aside';
  if (typeof page !== 'undefined') {
    title += ` \\\\ ${page}`;
  }
  return (
    <span
      className={classnames(
        'flex items-center font-semibold tracking-tight text-lg gap-2',
        className
      )}
    >
      <img src="./icon48.png" alt="logo" id="logo" className="h-full" />
      {title}
    </span>
  );
}
