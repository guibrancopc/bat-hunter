import './avatar.scss';

export function Avatar({ src }: { src: string }) {
  return <img className="bh-avatar" src={src} />;
}
