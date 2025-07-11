import { useState } from "react";
import { useAudio } from "../lib/stores/useAudio";

export function SmileButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentContent, setCurrentContent] = useState(0);
  const { playSuccess } = useAudio();

  const popupContent = [
    {
      type: "affirmation",
      content: "You are absolutely wonderful and deserving of all good things! 🌟",
      emoji: "💖"
    },
    {
      type: "meme",
      content: "When you walk into a room, even the flowers turn their heads to look at you! 🌺",
      emoji: "😄"
    },
    {
      type: "kitten",
      content: "🐱 *virtual kitten high-five* 🖐️ You're purrfect!",
      emoji: "🐾"
    },
    {
      type: "affirmation",
      content: "Your smile could power a small city with renewable happiness energy! ⚡",
      emoji: "😊"
    },
    {
      type: "wholesome",
      content: "Somewhere out there, someone is grateful that you exist! 🌍",
      emoji: "🤗"
    }
  ];

  const handleSmileClick = () => {
    setCurrentContent(Math.floor(Math.random() * popupContent.length));
    setShowPopup(true);
    playSuccess();
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  return (
    <>
      <button
        onClick={handleSmileClick}
        className="group relative px-8 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
      >
        <span className="relative z-10">Click for a Smile! 😊</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Sparkle effects */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-75" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-300 rounded-full animate-pulse" />
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-800 to-purple-900 rounded-3xl p-8 max-w-md w-full border-4 border-purple-500/30 shadow-2xl transform animate-bounce">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">
                {popupContent[currentContent].emoji}
              </div>
              <h3 className="text-2xl font-bold text-purple-200 mb-4">
                Here's a smile for you! ✨
              </h3>
              <p className="text-lg text-purple-300 mb-6 leading-relaxed">
                {popupContent[currentContent].content}
              </p>
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-purple-400 mt-4">
                With love from Hassan 💕
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
