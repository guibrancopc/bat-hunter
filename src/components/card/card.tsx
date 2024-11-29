import { PropsWithChildren } from 'react';

export const Card = ({ children, id }: PropsWithChildren<{ id?: string }>) => {
  return (
    <div className="bh-card" id={id}>
      {children}
    </div>
  );
};
