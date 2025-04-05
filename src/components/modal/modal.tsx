import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './modal.scss';

export function Modal({
  className,
  children,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={clsx(className, 'bh-modal')}>
      <div className="bh-modal__overlay"></div>
      <div className="bh-modal__container">{children}</div>
    </div>
  );
}
