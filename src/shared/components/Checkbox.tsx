import classnames from 'classnames';
import type { ChangeEventHandler } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export default function Checkbox({ checked, onChange, id }: CheckboxProps) {
  return (
    <div className="flex cursor-pointer items-center">
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        type="checkbox"
        value=""
        className={classnames(
          'relative h-5 w-5 appearance-none rounded-full border-2 border-slate-800 bg-gray-100 text-blue-600 ring-offset-2 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600',
          'after:absolute after:left-[0.35rem] after:top-0.5 after:block after:h-[0.6rem] after:w-[0.35rem] after:rotate-45 after:appearance-none after:border-b-2 after:border-r-2 after:border-white checked:after:content-[""]'
        )}
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Close selected tabs
      </label>
    </div>
  );
}
