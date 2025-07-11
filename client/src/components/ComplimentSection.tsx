import { useEffect, useState } from "react";
import { useCompliments } from "../lib/stores/useCompliments";

export function ComplimentSection() {
  const { currentCompliment, nextCompliment, compliments, getRandomCompliment } = useCompliments();
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [sectionCompliments, setSectionCompliments] = useState<string[]>([]);
  const [specialMessage, setSpecialMessage] = useState<string>("");

  // Initialize section compliments and special message
  useEffect(() => {
    const initialCompliments = compliments.slice(0, 6).map(() => getRandomCompliment());
    setSectionCompliments(initialCompliments);
    setSpecialMessage(getRandomCompliment());
  }, [compliments, getRandomCompliment]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('.compliment-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (index: number) => {
    // Update the specific section's compliment
    setSectionCompliments(prev => {
      const newCompliments = [...prev];
      newCompliments[index] = getRandomCompliment();
      return newCompliments;
    });
    // Also update the main rotating compliment
    nextCompliment();
  };

  const handleSpecialMessageClick = () => {
    setSpecialMessage(getRandomCompliment());
    nextCompliment();
  };

  return (
    <div className="space-y-32 py-20">
      {/* Current Rotating Compliment */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div 
          className="backdrop-blur-sm bg-black/50 rounded-3xl p-12 border border-purple-500/30 shadow-2xl text-center max-w-4xl transform transition-all duration-1000 hover:scale-105"
          onClick={nextCompliment}
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight">
            {currentCompliment}
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            Click anywhere to see another reason why you're amazing! ✨
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Individual Compliment Sections */}
      {sectionCompliments.map((compliment, index) => (
        <section
          key={index}
          data-index={index}
          className={`compliment-section min-h-screen flex items-center justify-center px-4 transition-all duration-1000 ${
            visibleSections.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10'
          }`}
        >
          <div 
            className="backdrop-blur-sm bg-black/40 rounded-3xl p-10 border border-purple-500/30 shadow-2xl text-center max-w-3xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleSectionClick(index)}
          >
            <div className="text-6xl mb-6">
              {index % 4 === 0 ? '🌸' : index % 4 === 1 ? '✨' : index % 4 === 2 ? '💖' : '🦋'}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              {compliment || 'Loading your special message...'}
            </h3>
            <p className="text-lg text-purple-200 mb-4">
              From Hassan with all the love in the world 💕
            </p>
            <p className="text-sm text-purple-400 opacity-75">
              Click anywhere to see another reason why you're amazing! ✨
            </p>
          </div>
        </section>
      ))}

      {/* Special Message Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div 
          className="backdrop-blur-sm bg-gradient-to-r from-gray-800/60 to-purple-800/60 rounded-3xl p-12 border border-purple-500/30 shadow-2xl text-center max-w-4xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
          onClick={handleSpecialMessageClick}
        >
          <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
            {specialMessage || "You Are Magical! ✨"}
          </h2>
          <p className="text-2xl md:text-3xl text-purple-200 mb-6">
            Never forget how incredible you are
          </p>
          <p className="text-xl text-purple-300 mb-6">
            This is the BEST 3D website ever, created with infinite love just for you
          </p>
          <p className="text-sm text-purple-400 opacity-75 mb-6">
            Click anywhere to see another reason why you're amazing! ✨
          </p>
          <div className="flex justify-center space-x-4 text-4xl">
            <span className="animate-bounce">🌟</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💫</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>✨</span>
          </div>
        </div>
      </section>
    </div>
  );
}
