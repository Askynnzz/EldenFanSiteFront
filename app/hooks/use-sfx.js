// hooks/use-sfx.js
import { useCallback } from 'react';

const SFX = {

  click: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Heavy thud
};

export default function useSFX() {
  const playHover = useCallback(() => {
    const audio = new Audio(SFX.hover);
    audio.volume = 0.2;
    audio.play().catch(() => {}); // Catch errors if user hasn't interacted yet
  }, []);

  const playClick = useCallback(() => {
    const audio = new Audio(SFX.click);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  return { playHover, playClick };
}