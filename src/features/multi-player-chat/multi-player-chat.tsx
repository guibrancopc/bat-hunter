import './multi-player-chat.scss';
import { useAuthContext } from 'src/features/authentication';
import { useEffect, useMemo, useState } from 'react';
import { getUserDataReactivelyFromFirebase } from 'src/models/user-model';
import { MatchType } from 'src/models/match-model';
import { UserSessionType } from 'src/services/authentication-service';
import { Input } from 'src/components';
import clsx from 'clsx';
import { TextArea } from 'src/components/text-area/text-area';

export function MultiPlayerChat({ match }: { match?: MatchType }) {
  const [chatOpen, setChatOpen] = useState(false);
  const { currentUser } = useAuthContext();
  const messages = match?.messages;

  // @TODO: create a context to manage opponent user data
  const [opponentUser, setOpponentUser] = useState<UserSessionType>();

  const amIHost = useMemo(
    () => currentUser?.id === match?.hostId,
    [currentUser?.id, match?.hostId]
  );

  useEffect(() => {
    const opponentUserId = amIHost ? match?.guestId : match?.hostId;

    if (opponentUserId) {
      getUserDataReactivelyFromFirebase(opponentUserId, setOpponentUser);
    }
  }, [match?.hostId]);

  return (
    <div className="multi-player-chat">
      <header onClick={() => setChatOpen(!chatOpen)}>Chat (12)</header>
      <section
        className={clsx('multi-player-chat__collapse', { open: chatOpen })}
      >
        <main>Talks</main>
        <footer>
          <TextArea name="chat-input" />
        </footer>
      </section>
    </div>
  );
}

function Message({
  text,
  author,
  timestamp,
  self,
}: {
  text: string;
  author: string;
  timestamp: number;
  self: boolean;
}) {
  return <></>;
}
