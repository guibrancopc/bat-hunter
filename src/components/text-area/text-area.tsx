import clsx from 'clsx';
import './text-area.scss';
import { useRef } from 'react';

export function TextArea({
  placeholder,
  className,
  value,
  name,
  readOnly,
  disabled,
  onChange,
  onReturn,
}: {
  placeholder?: string;
  className?: string;
  value?: string;
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (v?: string) => void;
  onReturn?: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  function onKeyDown(e: { key: string }) {
    if (e.key === 'Enter') {
      onReturn?.();
      setTimeout(() => textareaRef.current?.focus());
    }
  }

  return (
    <textarea
      className={clsx('bh-text-area', className)}
      placeholder={placeholder}
      ref={textareaRef}
      readOnly={readOnly}
      disabled={disabled}
      value={value}
      name={name}
      key={name}
      onKeyDown={onKeyDown}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
