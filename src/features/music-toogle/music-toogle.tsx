import { useState } from 'react';
import { Button } from 'src/components';
import {
  isMutedStateLocalStorage,
  toggleMusicService,
} from 'src/services/audio-service';
import './music-toggle.scss';
import { setLocalStorageValue } from 'src/services/local-storage-service';

export function MusicToggle() {
  const isMutedLocalStorage = isMutedStateLocalStorage();

  const [isMuted, setIsMuted] = useState(isMutedLocalStorage);

  function onClick() {
    const isEnabled = toggleMusicService();

    setIsMuted(!isEnabled);
    setLocalStorageValue('bh-background-music-muted', !isEnabled);
  }

  return (
    <div className="music-toggle">
      <Button kind="tertiary" onClick={onClick}>
        {isMuted ? '🔇' : '🔊'}
      </Button>
    </div>
  );
}
