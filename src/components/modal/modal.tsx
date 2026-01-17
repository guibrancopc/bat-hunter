import { PropsWithChildren, useState } from 'react';
import clsx from 'clsx';
import './modal.scss';

export function Modal({
  className,
  children,
  header,
  footer,
  open,
  onClose,
}: PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}>) {
  if (!open) {
    return null;
  }

  return (
    <div className={clsx(className, 'bh-modal')}>
      <div className="bh-modal__overlay" onClick={onClose}></div>
      <div className="bh-modal__container">
        <button className="bh-modal__close-button" onClick={onClose}>
          &#x2715;
        </button>
        {header && <header>{header}</header>}
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
      </div>
    </div>
  );
}
