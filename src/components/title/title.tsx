import './title.scss';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
  size?: 'h1' | 'h2' | 'h3' | 'h4';
  weight?: 'light' | 'medium' | 'bold';
  className?: string;
  center?: boolean;
};

export function Title({
  size = 'h2',
  weight = 'light',
  className,
  center,
  children,
}: PropsWithChildren<Props>) {
  const internalClassName = clsx(
    className,
    `bh-title bh-title-weight--${weight}`,
    {
      'bh-title--center': center,
    }
  );

  return (
    <>
      {size === 'h1' ? (
        <h1 className={internalClassName}>{children}</h1>
      ) : size === 'h2' ? (
        <h2 className={internalClassName}>{children}</h2>
      ) : size === 'h3' ? (
        <h3 className={internalClassName}>{children}</h3>
      ) : size === 'h4' ? (
        <h4 className={internalClassName}>{children}</h4>
      ) : null}
    </>
  );
}
