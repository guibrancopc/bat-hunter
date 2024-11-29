import { PropsWithChildren } from 'react';

type Props = {
  onClick: () => void;
  kind?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
};

export function Button({
  children,
  disabled,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button className="bh-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
