import { PropsWithChildren } from 'react';
import './button.scss';
import clsx from 'clsx';

type Props = {
  onClick: () => void;
  kind?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
};

export function Button({
  kind = 'secondary',
  children,
  disabled,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      className={clsx('bh-button', `bh-button--${kind}`)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
