import { PropsWithChildren } from 'react';
import './card.scss';

export const Card = ({ children, id }: PropsWithChildren<{ id?: string }>) => {
  return (
    <div className="bh-card" id={id}>
      {children}
    </div>
  );
};
