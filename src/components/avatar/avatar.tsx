import './avatar.scss';

export function Avatar({ src = '/images/user-sm.jpg' }: { src?: string }) {
  return <img className="bh-avatar" src={src} />;
}
