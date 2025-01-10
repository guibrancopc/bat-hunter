import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type FragmentedValuesType = {
  horizontal?: number;
  vertical?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type MarginPaddingValueType = FragmentedValuesType | number;

export function Gutter({
  margin,
  padding,
  display,
  className,
  children,
}: PropsWithChildren<{
  margin?: MarginPaddingValueType;
  padding?: MarginPaddingValueType;
  className?: string;
  display?: 'block' | 'inline' | 'inline-block';
}>) {
  const marginStyle = margin ? calcMarginPadding('margin', margin) : {};
  const paddingStyle = padding ? calcMarginPadding('padding', padding) : {};

  const style = {
    ...marginStyle,
    ...paddingStyle,
    display,
  };

  return (
    <div className={clsx('bh-gutter', className)} style={style}>
      {children}
    </div>
  );
}

type MarginPaddingKeyType = 'margin' | 'padding';

function calcMarginPadding(
  key: MarginPaddingKeyType,
  value: MarginPaddingValueType
) {
  const MULTIPLE = 8;

  if (isValidNumber(value)) {
    return {
      // @ts-ignore: already checked
      [key]: toNumber(value) * MULTIPLE,
    };
  }

  const { vertical, horizontal } = value as FragmentedValuesType;
  if (isValidNumber(vertical) || isValidNumber(horizontal)) {
    return {
      [`${key}Left`]: toNumber(horizontal) * MULTIPLE,
      [`${key}Right`]: toNumber(horizontal) * MULTIPLE,
      [`${key}Top`]: toNumber(vertical) * MULTIPLE,
      [`${key}Bottom`]: toNumber(vertical) * MULTIPLE,
    };
  }

  const { top, right, bottom, left } = value as FragmentedValuesType;
  return {
    [`${key}Left`]: toNumber(left) * MULTIPLE,
    [`${key}Right`]: toNumber(right) * MULTIPLE,
    [`${key}Top`]: toNumber(top) * MULTIPLE,
    [`${key}Bottom`]: toNumber(bottom) * MULTIPLE,
  };
}

function toNumber(v?: number) {
  return (isValidNumber(v) ? v : 0) as number;
}

function isValidNumber(v?: MarginPaddingValueType | number) {
  return typeof v === 'number' && !Number.isNaN(v);
}
