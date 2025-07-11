import { create } from "zustand";

interface MusicState {
  backgroundMusic: HTMLAudioElement | null;
  isPlaying: boolean;
  isMuted: boolean;
  
  initializeMusic: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
}

export const useMusic = create<MusicState>((set, get) => ({
  backgroundMusic: null,
  isPlaying: false,
  isMuted: false,
  
  initializeMusic: () => {
    try {
      const music = new Audio('/sounds/background.mp3');
      music.loop = true;
      music.volume = 0.4; // Slightly higher volume for romantic ambiance
      music.preload = 'auto';
      
      // Add error handling
      music.addEventListener('error', (e) => {
        console.log('Romantic background music failed to load:', e);
      });
      
      music.addEventListener('canplaythrough', () => {
        console.log('Romantic background music loaded successfully');
        // Auto-start music when it's ready
        setTimeout(() => {
          const { isPlaying, isMuted } = get();
          if (!isPlaying && !isMuted) {
            music.play().catch(error => {
              console.log('Auto-play prevented by browser:', error);
            });
            set({ isPlaying: true });
          }
        }, 500);
      });
      
      set({ backgroundMusic: music });
    } catch (error) {
      console.log('Failed to initialize romantic background music:', error);
    }
  },
  
  togglePlay: () => {
    const { backgroundMusic, isPlaying, isMuted } = get();
    if (!backgroundMusic) return;
    
    if (isMuted) {
      set({ isMuted: false });
    }
    
    if (isPlaying) {
      backgroundMusic.pause();
      set({ isPlaying: false });
    } else {
      backgroundMusic.play().catch(error => {
        console.log('Music play prevented:', error);
      });
      set({ isPlaying: true });
    }
  },
  
  toggleMute: () => {
    const { backgroundMusic, isMuted } = get();
    if (!backgroundMusic) return;
    
    const newMutedState = !isMuted;
    backgroundMusic.muted = newMutedState;
    set({ isMuted: newMutedState });
    
    if (newMutedState) {
      backgroundMusic.pause();
      set({ isPlaying: false });
    }
    
    console.log(`Music ${newMutedState ? 'muted' : 'unmuted'}`);
  }
}));
