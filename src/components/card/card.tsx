import { PropsWithChildren } from 'react';
import './card.scss';
import clsx from 'clsx';

export const Card = ({
  id,
  children,
  className,
}: PropsWithChildren<{ id?: string; className?: string }>) => {
  return (
    <div className={clsx('bh-card', className)} id={id}>
      {children}
    </div>
  );
};
