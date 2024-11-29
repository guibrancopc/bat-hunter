import { PropsWithChildren } from 'react';

export function ButtonGroup({ children }: PropsWithChildren) {
  return (
    <>
      <div className="bh-button-group">{children}</div>
      <style>{`
      .bh-button-group {
        display: flex;
        justify-content: space-between;
      }
    `}</style>
    </>
  );
}
