import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export function CursorFollower() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Add new particles occasionally
      if (Math.random() < 0.3) {
        const colors = ['#ff69b4', '#da70d6', '#87ceeb', '#dda0dd'];
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60,
          maxLife: 60,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)]
        };
        
        setParticles(prev => [...prev, newParticle].slice(-20)); // Keep only last 20 particles
      }
    };

    const animate = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98
          }))
          .filter(particle => particle.life > 0)
      );
      
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: `scale(${particle.life / particle.maxLife})`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      ))}
      
      {/* Main cursor glow */}
      <div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 opacity-50 blur-sm transition-all duration-100 ease-out"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          transform: 'scale(1.2)'
        }}
      />
    </div>
  );
}
