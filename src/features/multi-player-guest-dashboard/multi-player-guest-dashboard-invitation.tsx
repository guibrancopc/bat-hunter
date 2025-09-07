import './multi-player-guest-dashboard.scss';
import { Button, Gutter, Input, Title } from '@components';
import { useEffect, useState } from 'react';
import { Gap } from 'src/components/gap';

const hasMatch = false;

export function MultiPlayerGuestDashboardInvitation() {
  return (
    <div className="multi-player-guest-dashboard-invitation">
      <Gutter size="md">
        <Title>Match Setup</Title>

        <Gutter size="xl">
          <div>
            {hasMatch ? (
              <Gap vertical justify="center" align="center" size="md">
                <div>Share the invitation link.</div>
                <UrlCopyButton invitationUrl="http://test.com/a0w9ef809a8wef098" />
              </Gap>
            ) : (
              <Gap justify="center">
                <Button kind="primary">Create a Game</Button>
              </Gap>
            )}
          </div>
        </Gutter>
      </Gutter>
    </div>
  );
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
      <Input value={invitationUrl} name="match-url" />
      <Button kind="primary" onClick={_onCopy}>
        {copied ? 'Copied!' : 'Copy invite link'}
      </Button>
    </>
  );
}

function copyStringToClipboard(value: string) {
  navigator.clipboard.writeText(value);
}
