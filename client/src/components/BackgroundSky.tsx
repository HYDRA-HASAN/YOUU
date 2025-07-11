import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function BackgroundSky() {
  const cloudGroupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);

  // Pre-calculate cloud positions
  const clouds = useMemo(() => {
    const cloudData = [];
    for (let i = 0; i < 8; i++) {
      cloudData.push({
        position: [
          (Math.random() - 0.5) * 40,
          5 + Math.random() * 10,
          -20 - Math.random() * 20
        ] as [number, number, number],
        scale: 3 + Math.random() * 4,
        speed: 0.005 + Math.random() * 0.01,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      });
    }
    return cloudData;
  }, []);

  // Pre-calculate star positions
  const starGeometry = useMemo(() => {
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Distribute stars in a sphere around the scene
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = Math.random() * 50 + 10;
      positions[i3 + 2] = -30 - Math.random() * 50;
      
      // Twinkling star colors
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i3] = brightness; // R
      colors[i3 + 1] = brightness * (0.8 + Math.random() * 0.2); // G
      colors[i3 + 2] = brightness; // B
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate clouds
    if (cloudGroupRef.current) {
      cloudGroupRef.current.children.forEach((cloud, index) => {
        const cloudData = clouds[index];
        cloud.position.x += cloudData.speed;
        cloud.rotation.y += cloudData.rotationSpeed;
        
        // Reset cloud position when it moves too far
        if (cloud.position.x > 25) {
          cloud.position.x = -25;
        }
      });
    }
    
    // Animate stars (twinkling effect)
    if (starsRef.current) {
      const colors = starsRef.current.geometry.attributes.color.array as Float32Array;
      for (let i = 0; i < colors.length; i += 3) {
        const twinkle = 0.5 + Math.sin(time * 3 + i) * 0.3;
        colors[i] = twinkle;
        colors[i + 1] = twinkle * 0.9;
        colors[i + 2] = twinkle;
      }
      starsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Starry background */}
      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={2}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
      
      {/* Clouds */}
      <group ref={cloudGroupRef}>
        {clouds.map((cloud, index) => (
          <mesh
            key={index}
            position={cloud.position}
            scale={cloud.scale}
          >
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial
              color="#2a2a3a"
              transparent
              opacity={0.4}
              roughness={1}
              metalness={0}
            />
          </mesh>
        ))}
      </group>
      
      {/* Gradient background plane */}
      <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#0a0a1a"
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
}
