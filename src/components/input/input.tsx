import './input.scss';

export function Input({ value, name }: { value?: string; name: string }) {
  return <input className="bh-input" value={value} name={name} key={name} />;
}
