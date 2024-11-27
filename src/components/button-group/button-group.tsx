import { PropsWithChildren } from 'react';

export function ButtonGroup({ children }: PropsWithChildren) {
  return (
    <>
      <div className="c-button-group">{children}</div>
      <style>{`
      .c-button-group {
        display: flex;
        justify-content: space-between;
      }
    `}</style>
    </>
  );
}
