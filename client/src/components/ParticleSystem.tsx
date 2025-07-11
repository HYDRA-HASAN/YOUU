import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Pre-calculate particle properties
  const particleData = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = Math.random() * 20 - 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;
      
      // Pastel colors
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 1; colors[i3 + 1] = 0.4; colors[i3 + 2] = 0.8; // Pink
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.7; colors[i3 + 1] = 0.4; colors[i3 + 2] = 1; // Lavender
      } else {
        colors[i3] = 0.4; colors[i3 + 1] = 0.8; colors[i3 + 2] = 1; // Blue
      }
      
      speeds[i] = 0.01 + Math.random() * 0.02;
      sizes[i] = 2 + Math.random() * 3;
    }
    
    return { positions, colors, speeds, sizes, count };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(particleData.colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particleData.sizes, 1));
    return geo;
  }, [particleData]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleData.count; i++) {
      const i3 = i * 3;
      const speed = particleData.speeds[i];
      
      // Floating motion
      positions[i3 + 1] += Math.sin(time * speed) * 0.01;
      
      // Gentle drift
      positions[i3] += Math.cos(time * speed * 0.5) * 0.005;
      positions[i3 + 2] += Math.sin(time * speed * 0.3) * 0.005;
      
      // Reset particles that drift too far
      if (positions[i3 + 1] > 15) positions[i3 + 1] = -15;
      if (Math.abs(positions[i3]) > 20) positions[i3] *= -0.9;
      if (Math.abs(positions[i3 + 2]) > 20) positions[i3 + 2] *= -0.9;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={3}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
