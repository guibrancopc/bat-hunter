import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './text.scss';

export function Text({
  size = 'md',
  weight = 'light',
  children,
}: PropsWithChildren<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'medium' | 'bold';
}>) {
  return (
    <span
      className={clsx(
        'bh-text',
        `bh-text__size--${size}`,
        `bh-text__weight--${weight}`
      )}
    >
      {children}
    </span>
  );
}
