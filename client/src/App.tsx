import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import "@fontsource/inter";
import { Scene3D } from "./components/Scene3D";
import { ComplimentSection } from "./components/ComplimentSection";
import { SmileButton } from "./components/SmileButton";
import { MusicControls } from "./components/MusicControls";
import { CursorFollower } from "./components/CursorFollower";
import { useMusic } from "./lib/stores/useMusic";
import { useCompliments } from "./lib/stores/useCompliments";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const { initializeMusic } = useMusic();
  const { nextCompliment, getRandomCompliment } = useCompliments();
  const [heroCompliment, setHeroCompliment] = useState<string>("");
  const [footerCompliment, setFooterCompliment] = useState<string>("");

  useEffect(() => {
    setShowCanvas(true);
    initializeMusic();
    // Initialize dynamic compliments
    setHeroCompliment(getRandomCompliment());
    setFooterCompliment(getRandomCompliment());
  }, [initializeMusic, getRandomCompliment]);

  const handleHeroClick = () => {
    setHeroCompliment(getRandomCompliment());
    nextCompliment();
  };

  const handleFooterClick = () => {
    setFooterCompliment(getRandomCompliment());
    nextCompliment();
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Cursor Follower */}
      <CursorFollower />
      
      {/* Music Controls */}
      <MusicControls />
      
      {/* 3D Scene Background */}
      {showCanvas && (
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{
              position: [0, 5, 10],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
            gl={{
              antialias: true,
              powerPreference: "default",
              alpha: true
            }}
          >
            <color attach="background" args={["#0f0f23"]} />
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>
      )}
      
      {/* Content Overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <div 
            className="backdrop-blur-sm bg-black/40 rounded-3xl p-8 border border-purple-500/30 shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={handleHeroClick}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 bg-clip-text text-transparent mb-6 animate-pulse">
              {heroCompliment || "Reasons Why You're Amazing 🌸"}
            </h1>
            <p className="text-2xl md:text-3xl text-purple-200 mb-8 font-light">
              A magical place filled with love and positivity
            </p>
            <p className="text-lg text-purple-300 mb-6">
              Made with ❤️ by Hassan, especially for you
            </p>
            <p className="text-sm text-purple-400 opacity-75 mb-6">
              Click anywhere to see another reason why you're amazing! ✨
            </p>
            <SmileButton />
          </div>
        </section>
        
        {/* Compliment Sections */}
        <ComplimentSection />
        
        {/* Footer */}
        <section className="py-20 text-center">
          <div 
            className="backdrop-blur-sm bg-black/40 rounded-3xl p-8 mx-4 border border-purple-500/30 shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={handleFooterClick}
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {footerCompliment || "Remember, you are loved! 💖"}
            </h2>
            <p className="text-xl text-purple-200 mb-4">
              Created with endless love by Hassan
            </p>
            <p className="text-lg text-purple-300 mb-4">
              The BEST 3D website ever, made just for you! ✨
            </p>
            <p className="text-sm text-purple-400 opacity-75">
              Click anywhere to see another reason why you're amazing! ✨
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
