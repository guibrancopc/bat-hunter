import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './text.scss';

export function Text({
  size = 'md',
  weight = 'light',
  align,
  secondary,
  block,
  className,
  children,
}: PropsWithChildren<{
  className?: string;
  block?: boolean;
  secondary?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: 'light' | 'medium' | 'bold';
  align?: 'left' | 'center' | 'right';
}>) {
  const _block = block || !!align;

  return (
    <span
      className={clsx(
        className,
        'bh-text',
        `bh-text__size--${size}`,
        `bh-text__weight--${weight}`,
        {
          'bh-text--secondary': secondary,
          'bh-text--block': _block,
          [`bh-text__align--${align}`]: align,
        }
      )}
    >
      {children}
    </span>
  );
}
