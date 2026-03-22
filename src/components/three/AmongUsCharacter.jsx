import * as THREE from 'three'

/* ── Among Us Character (Pure Three.js) ── */
export default function AmongUsCharacter({ color, emissiveIntensity = 0.5 }) {
  return (
    <group>
      {/* Body - rounded bean shape using sphere stretched */}
      <mesh position={[0, 0.1, 0]} scale={[1, 1.3, 0.85]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Visor - blue opaque */}
      <mesh position={[0, 0.25, 0.38]} scale={[0.7, 0.45, 0.3]}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial
          color="#1E90FF"
          emissive="#0066CC"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0, -0.42]} scale={[0.5, 0.6, 0.4]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity * 0.7}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Left leg */}
      <mesh position={[0.15, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.25, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity * 0.5}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Right leg */}
      <mesh position={[-0.15, -0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.25, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity * 0.5}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}
