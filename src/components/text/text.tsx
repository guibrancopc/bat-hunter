import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './text.scss';

export function Text({
  size = 'md',
  weight = 'light',
  className,
  children,
}: PropsWithChildren<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'medium' | 'bold';
}>) {
  return (
    <span
      className={clsx(
        className,
        'bh-text',
        `bh-text__size--${size}`,
        `bh-text__weight--${weight}`
      )}
    >
      {children}
    </span>
  );
}
