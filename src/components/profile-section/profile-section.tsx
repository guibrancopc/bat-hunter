import { Avatar } from '@components/avatar';
import { Gutter, Title } from 'src/components';

export function ProfileSection({
  image,
  name,
}: {
  image?: string;
  name?: string;
}) {
  return (
    <section>
      <Gutter size="md">
        <div className="text-center">
          <Avatar src={image} />
        </div>
        <div className="text-center">{name}</div>
      </Gutter>
    </section>
  );
}
