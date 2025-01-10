import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type MarginPaddingKeyType = 'margin' | 'padding';

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

const SIZE_MULTIPLE = 8;

function calcMarginPadding(
  key: MarginPaddingKeyType,
  value: MarginPaddingValueType
) {
  if (isValidNumber(value)) {
    return {
      // @ts-ignore: already checked
      [key]: toNumber(value) * SIZE_MULTIPLE,
    };
  }

  const { vertical, horizontal } = value as FragmentedValuesType;
  if (isValidNumber(vertical) || isValidNumber(horizontal)) {
    return calcSides(key, vertical, horizontal, vertical, horizontal);
  }

  const { top, right, bottom, left } = value as FragmentedValuesType;
  return calcSides(key, top, right, bottom, left);
}

function calcSides(
  key: MarginPaddingKeyType,
  top?: number,
  right?: number,
  bottom?: number,
  left?: number
) {
  return {
    [`${key}Left`]: toNumber(left) * SIZE_MULTIPLE,
    [`${key}Right`]: toNumber(right) * SIZE_MULTIPLE,
    [`${key}Top`]: toNumber(top) * SIZE_MULTIPLE,
    [`${key}Bottom`]: toNumber(bottom) * SIZE_MULTIPLE,
  };
}

function toNumber(v?: number) {
  return (isValidNumber(v) ? v : 0) as number;
}

function isValidNumber(v?: MarginPaddingValueType | number) {
  return typeof v === 'number' && !Number.isNaN(v);
}
