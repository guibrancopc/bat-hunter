import { PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import './modal.scss';

export function Modal({
  className,
  children,
  header,
  footer,
  open,
  onClose,
  preventOverlayClosing,
}: PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  preventOverlayClosing?: boolean;
}>) {
  const [eventListenerCallback, setEventListenerCallback] =
    useState<(e: KeyboardEvent) => void | undefined>();

  // Set the keyup event listener to close modal only while it's open
  useEffect(() => {
    if (open) {
      const cb = onEscape(onClose);
      setEventListenerCallback(() => cb);
      return;
    }

    if (eventListenerCallback) {
      clearOnEscape(eventListenerCallback);
      setEventListenerCallback(undefined);
    }
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={clsx(className, 'bh-modal')}>
      <div
        className="bh-modal__overlay"
        onClick={() => !preventOverlayClosing && onClose?.()}
      ></div>
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

function onEscape(cb?: () => void) {
  function eventListenerCallback(e: KeyboardEvent) {
    if (e.key === 'Escape') cb?.();
  }

  window.addEventListener('keyup', eventListenerCallback);

  return eventListenerCallback;
}

function clearOnEscape(cb: (e: KeyboardEvent) => void) {
  window.removeEventListener('keyup', cb);
}
