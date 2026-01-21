import './multi-player-chat.scss';
import { useAuthContext } from 'src/features/authentication';
import { useEffect, useMemo, useState } from 'react';
import { getUserDataReactivelyFromFirebase } from 'src/models/user-model';
import { MatchType } from 'src/models/match-model';
import { UserSessionType } from 'src/services/authentication-service';
import { Input, Text } from 'src/components';
import clsx from 'clsx';
import { TextArea } from 'src/components/text-area/text-area';
import { Gap } from 'src/components/gap';

export function MultiPlayerChat({ match }: { match?: MatchType }) {
  const [chatOpen, setChatOpen] = useState(false);
  const { currentUser } = useAuthContext();
  const messages = match?.messages;

  // @TODO: create a context to manage opponent user data
  const [opponentUser, setOpponentUser] = useState<UserSessionType>();

  useEffect(scrollTopBottom, [chatOpen]);

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
        <main className="multi-player-chat__container">
          <div className="multi-player-chat__scroll-cotainer">
            <Gap vertical>
              <ChatMessage
                authorName="Jose"
                text="Hey how"
                timestamp={1768958272156}
              />
              <ChatMessage
                self
                authorName="Jose"
                text="Let's Go"
                timestamp={1769958272156}
              />{' '}
              <ChatMessage
                authorName="Jose"
                text="Hey how"
                timestamp={1768958272156}
              />
              <ChatMessage
                self
                authorName="Jose"
                text="Let's Go"
                timestamp={1769958272156}
              />{' '}
              <ChatMessage
                authorName="Jose"
                text="Hey how"
                timestamp={1768958272156}
              />
              <ChatMessage
                self
                authorName="Jose"
                text="Let's Go"
                timestamp={1769958272156}
              />{' '}
              <ChatMessage
                authorName="Jose"
                text="Hey how"
                timestamp={1768958272156}
              />
              <ChatMessage
                self
                authorName="Jose"
                text="Let's Go"
                timestamp={1769958272156}
              />{' '}
              <ChatMessage
                authorName="Jose"
                text="Hey how"
                timestamp={1768958272156}
              />
              <ChatMessage
                self
                authorName="Jose"
                text="Let's Go"
                timestamp={1769958272156}
              />
            </Gap>
          </div>
        </main>
        <footer>
          <TextArea name="chat-input" />
        </footer>
      </section>
    </div>
  );
}

function scrollTopBottom() {
  const container = document.querySelector('.multi-player-chat main');

  if (container) {
    container.scrollTop = container?.scrollHeight;
  }
}

function ChatMessage({
  text,
  authorName,
  timestamp,
  self,
}: {
  text: string;
  timestamp: number;
  authorName?: string;
  self?: boolean;
}) {
  const datetime = new Date(timestamp);
  const fullDatetimeHumanized = datetime.toLocaleString();
  const timeHumanized = fullDatetimeHumanized.split(', ')[1];
  const name = self ? 'You' : authorName;
  const align = self ? 'right' : undefined;

  return (
    <div className="chat-message">
      <span>
        <Text block size="sm" align={align}>
          {text}
        </Text>
        <Text secondary size="xxs" align={align}>
          {name}, <span title={fullDatetimeHumanized}>{timeHumanized}</span>
        </Text>
      </span>
    </div>
  );
}
