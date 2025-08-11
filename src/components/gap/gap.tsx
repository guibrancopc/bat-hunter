import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import './gap.scss';

const GAP_SIZE_MAP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

type GapSizeType = keyof typeof GAP_SIZE_MAP;

export const Gap = ({
  align = 'start',
  justify = 'normal',
  size = 'sm',
  wrap = false,
  vertical = false,
  className,
  children,
  fullWidth = false,
  fullHeight = false,
}: PropsWithChildren<{
  align?: 'stretch' | 'start' | 'center' | 'end' | 'baseline';
  justify?:
    | 'normal'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'center'
    | 'stretch';
  size?: GapSizeType;
  wrap?: boolean;
  vertical?: boolean;
  className?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
}>) => {
  const controlClasses = {
    [`bh-gap--size-${size}`]: true,
    [`bh-gap--align-${align}`]: true,
    [`bh-gap--justify-${justify}`]: true,
    'bh-gap--vertical': vertical,
    'bh-gap--wrap': wrap,
    'bh-gap--full-width': fullWidth,
    'bh-gap--full-height': fullHeight,
  };

  return (
    <div className={clsx('bh-gap', className, controlClasses)}>{children}</div>
  );
};
