import { useEffect } from "react";
import { useMusic } from "../lib/stores/useMusic";

export function MusicControls() {
  const { isPlaying, isMuted, togglePlay, toggleMute, initializeMusic } = useMusic();

  // Auto-start music when component mounts
  useEffect(() => {
    const autoStartMusic = async () => {
      // Small delay to ensure audio context is ready
      setTimeout(() => {
        if (!isPlaying && !isMuted) {
          togglePlay();
        }
      }, 1000);
    };

    autoStartMusic();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="backdrop-blur-sm bg-black/40 rounded-2xl p-3 border border-purple-500/30 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white flex items-center justify-center hover:scale-110 transition-transform duration-200"
            title={isMuted ? "Unmute romantic music" : "Mute music"}
          >
            {isMuted ? "🔇" : "🎵"}
          </button>
        </div>
        
        {isPlaying && !isMuted && (
          <div className="mt-2 text-xs text-purple-300 text-center">
            Playing romantic music 💕
          </div>
        )}
      </div>
    </div>
  );
}
