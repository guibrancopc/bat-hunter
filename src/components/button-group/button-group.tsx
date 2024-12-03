import { PropsWithChildren } from 'react';
import './button-group.scss';
import clsx from 'clsx';

export function ButtonGroup({
  children,
  flex,
}: PropsWithChildren<{ flex?: boolean }>) {
  const className = {
    'bh-button-group--flex': flex,
  };

  return <div className={clsx('bh-button-group', className)}>{children}</div>;
}
