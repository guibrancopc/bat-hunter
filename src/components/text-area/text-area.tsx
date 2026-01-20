import './text-area.scss';

export function TextArea({
  value,
  name,
  readOnly,
}: {
  value?: string;
  name: string;
  readOnly?: boolean;
}) {
  return (
    <textarea
      className="bh-text-area"
      readOnly={readOnly}
      value={value}
      name={name}
      key={name}
    />
  );
}
