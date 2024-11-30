import { PropsWithChildren } from 'react';
import './button-group.scss';

export function ButtonGroup({ children }: PropsWithChildren) {
  return <div className="bh-button-group">{children}</div>;
}
