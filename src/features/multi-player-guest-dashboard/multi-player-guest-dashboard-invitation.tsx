import './multi-player-guest-dashboard.scss';
import { Button, Gutter, Input, Title } from '@components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Gap } from 'src/components/gap';
import { createMatch } from 'src/models/match-model';

export function MultiPlayerGuestDashboardInvitation() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId?: string }>();

  function onCreateGame() {
    const newMatchId = createMatch();
    navigate(`/multi-player/${newMatchId}`);
  }

  console.log('currentMatchId', matchId);

  return (
    <div className="multi-player-guest-dashboard-invitation">
      <Gutter size="md">
        <Title>Match Setup</Title>

        <Gutter size="xl">
          <div>
            {matchId ? (
              <Gap vertical justify="center" align="center" size="md">
                <div>Share the invitation link.</div>
                <UrlCopyButton invitationUrl={buildInvitationUrl(matchId)} />
              </Gap>
            ) : (
              <Gap justify="center">
                <Button kind="primary" onClick={onCreateGame}>
                  Create a Game
                </Button>
              </Gap>
            )}
          </div>
        </Gutter>
      </Gutter>
    </div>
  );
}

// @TODO: update to the correct invitation route
function buildInvitationUrl(matchId: string) {
  return `${origin}/invitation-link/${matchId}`;
}

function UrlCopyButton({ invitationUrl }: { invitationUrl: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  function _onCopy() {
    setCopied(true);
    copyStringToClipboard(invitationUrl);
  }

  return (
    <>
      <Input value={invitationUrl} name="match-url" readOnly />
      <Button kind="primary" onClick={_onCopy}>
        {copied ? 'Copied!' : 'Copy invite link'}
      </Button>
    </>
  );
}

function copyStringToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
