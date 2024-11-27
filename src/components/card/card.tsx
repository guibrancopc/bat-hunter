import { PropsWithChildren } from 'react';

export const Card = ({ children, id }: PropsWithChildren<{ id?: string }>) => {
  return (
    <div className="c-card" id={id}>
      {children}
    </div>
  );
};
