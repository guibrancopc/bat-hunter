import './input.scss';

export function Input({
  value,
  name,
  readOnly,
}: {
  value?: string;
  name: string;
  readOnly?: boolean;
}) {
  return (
    <input
      className="bh-input"
      readOnly={readOnly}
      value={value}
      name={name}
      key={name}
    />
  );
}
