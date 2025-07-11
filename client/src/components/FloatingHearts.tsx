import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingHearts() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Pre-calculate heart positions and properties
  const hearts = useMemo(() => {
    const heartData = [];
    for (let i = 0; i < 20; i++) {
      heartData.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 10 - 5,
          (Math.random() - 0.5) * 20
        ] as [number, number, number],
        speed: 0.01 + Math.random() * 0.02,
        scale: 0.3 + Math.random() * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatOffset: Math.random() * Math.PI * 2
      });
    }
    return heartData;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((heart, index) => {
      const heartData = hearts[index];
      
      // Floating motion
      heart.position.y = heartData.position[1] + Math.sin(time * heartData.speed + heartData.floatOffset) * 2;
      
      // Gentle rotation
      heart.rotation.y += heartData.rotationSpeed;
      heart.rotation.z = Math.sin(time * heartData.speed) * 0.1;
      
      // Gentle scaling pulse
      const scale = heartData.scale + Math.sin(time * 2 + heartData.floatOffset) * 0.1;
      heart.scale.setScalar(scale);
    });
  });

  // Create heart shape geometry
  const createHeartShape = () => {
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 3.5, x - 6, y + 3.5);
    heartShape.bezierCurveTo(x - 6, y + 5.5, x - 4, y + 7.7, x, y + 10);
    heartShape.bezierCurveTo(x + 4, y + 7.7, x + 6, y + 5.5, x + 6, y + 3.5);
    heartShape.bezierCurveTo(x + 6, y + 3.5, x + 6, y, x, y);
    return heartShape;
  };

  const heartGeometry = useMemo(() => {
    const heartShape = createHeartShape();
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    });
  }, []);

  return (
    <group ref={groupRef}>
      {hearts.map((heart, index) => (
        <mesh
          key={index}
          position={heart.position}
          geometry={heartGeometry}
          scale={heart.scale}
        >
          <meshStandardMaterial
            color={index % 3 === 0 ? "#ff69b4" : index % 3 === 1 ? "#ff1493" : "#ff91a4"}
            metalness={0.1}
            roughness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
