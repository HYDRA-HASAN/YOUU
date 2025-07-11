import { useFrame } from "@react-three/fiber";
import { FloatingHearts } from "./FloatingHearts";
import { ParticleSystem } from "./ParticleSystem";
import { BackgroundSky } from "./BackgroundSky";

export function Scene3D() {
  useFrame(() => {
    // Simple frame update for any global animations
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#8b5cf6" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.6}
        color="#a78bfa"
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#c084fc" />
      
      {/* Background Elements */}
      <BackgroundSky />
      
      {/* Floating Hearts */}
      <FloatingHearts />
      
      {/* Particle System */}
      <ParticleSystem />
    </>
  );
}
