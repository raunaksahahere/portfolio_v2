import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import AmongUsCharacter from './three/AmongUsCharacter'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

/* ── Particles floating in space — gold, cyan, pink, white ── */
function ParticleField({ isMobile }) {
  const count = isMobile ? 800 : 2500
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const gold = new THREE.Color('#FFD700')
    const cyan = new THREE.Color('#00f1fd')
    const pink = new THREE.Color('#ff7dee')
    const white = new THREE.Color('#f7f5fd')
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      const t = Math.random()
      const c = t < 0.2 ? gold : t < 0.35 ? cyan : t < 0.45 ? pink : white
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/* ── Center Among Us — replaces the Sun ── */
function CenterAmongUs() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.3
    }
  })

  return (
    <group ref={groupRef} scale={1.8} position={[0, 0, 0]}>
      <AmongUsCharacter color="#DC143C" emissiveIntensity={0.8} />
      <pointLight color="#DC143C" intensity={4} distance={30} />
      <pointLight color="#00f1fd" intensity={0.5} distance={20} />
    </group>
  )
}

/* ── Orbit ring ── */
function OrbitRing({ radius, speed, color, opacity, tilt = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 200]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

/* ── Project Planet — orbits the sun ── */
function ProjectPlanet({ project, orbitRadius, orbitSpeed, startAngle, orbitTilt, bobSpeed, bobHeight, onProjectClick }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const geometries = ['dodecahedron', 'octahedron', 'icosahedron', 'tetrahedron', 'box', 'torus']

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + startAngle
    if (groupRef.current) {
      const x = Math.cos(t) * orbitRadius
      const z = Math.sin(t) * orbitRadius * 0.85
      groupRef.current.position.x = x * Math.cos(orbitTilt)
      groupRef.current.position.z = z
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * bobSpeed + startAngle * 3) * bobHeight
        + Math.cos(state.clock.elapsedTime * bobSpeed * 0.7 + startAngle) * bobHeight * 0.4
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.012
      meshRef.current.rotation.x += 0.006
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + startAngle) * 0.1
    }
  })

  const geo = geometries[project.id % geometries.length]

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onProjectClick(project) }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          e.object.scale.setScalar(1.4)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'default'
          e.object.scale.setScalar(1)
        }}
      >
        {geo === 'dodecahedron' && <dodecahedronGeometry args={[0.6, 0]} />}
        {geo === 'octahedron' && <octahedronGeometry args={[0.6, 0]} />}
        {geo === 'icosahedron' && <icosahedronGeometry args={[0.6, 0]} />}
        {geo === 'tetrahedron' && <tetrahedronGeometry args={[0.7, 0]} />}
        {geo === 'box' && <boxGeometry args={[0.7, 0.7, 0.7]} />}
        {geo === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={0.85}
          emissive={project.color}
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      <Html position={[0, 1.2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="planet-label" style={{ borderColor: project.color, color: project.color }}>
          {project.title}
        </div>
      </Html>
      <pointLight color={project.color} intensity={0.5} distance={5} />
    </group>
  )
}

/* ── Auto-orbiting camera with scroll parallax ── */
function CameraRig({ scrollY = 0 }) {
  const { camera } = useThree()
  const scrollRef = useRef(0)

  useEffect(() => {
    scrollRef.current = scrollY
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.08
    const scrollFactor = scrollRef.current / (window.innerHeight || 1)
    const parallaxY = Math.min(scrollFactor * 2, 6)
    const parallaxTilt = Math.min(scrollFactor * 0.1, 0.3)

    camera.position.x = Math.cos(t) * 14
    camera.position.z = Math.sin(t) * 14
    camera.position.y = 4 + Math.sin(t * 0.5) * 1.5 + parallaxY
    camera.lookAt(0, parallaxTilt, 0)
  })
  return null
}

/* ── Roaming Among Us ── */
function RoamingAmongUs({ orbitRadius, orbitSpeed, startAngle, scale, color, yOffset }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + startAngle
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * orbitRadius
      groupRef.current.position.z = Math.sin(t) * orbitRadius * 0.9
      groupRef.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.5 + startAngle) * 0.4
      groupRef.current.rotation.y = -t + Math.PI
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <AmongUsCharacter color={color} emissiveIntensity={0.3} />
    </group>
  )
}

/* ── Inner scene ── */
function SceneInner({ projects, onProjectClick, scrollY, isMobile }) {
  const orbitConfigs = useMemo(() => {
    return projects.map((_, i) => ({
      orbitRadius: 4 + i * 1.5,
      orbitSpeed: 0.15 - i * 0.02,
      startAngle: (i * Math.PI * 2) / projects.length,
      orbitTilt: (Math.random() - 0.5) * 0.2,
      bobSpeed: 0.4 + Math.random() * 0.3,
      bobHeight: 0.2 + Math.random() * 0.2,
    }))
  }, [projects.length])

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[20, 20, 10]} intensity={0.3} color="#ffe792" />

      <ParticleField isMobile={isMobile} />
      <Stars radius={40} depth={30} count={isMobile ? 1500 : 4000} factor={3} saturation={0} fade speed={0.3} />

      {/* Orbit rings */}
      {projects.map((_, i) => (
        <OrbitRing
          key={`ring-${i}`}
          radius={orbitConfigs[i].orbitRadius}
          speed={0.02}
          color="#FFD700"
          opacity={0.15}
          tilt={orbitConfigs[i].orbitTilt}
        />
      ))}

      {/* Project planets */}
      {projects.map((project, i) => (
        <ProjectPlanet
          key={project.id}
          project={project}
          orbitRadius={orbitConfigs[i].orbitRadius}
          orbitSpeed={orbitConfigs[i].orbitSpeed}
          startAngle={orbitConfigs[i].startAngle}
          orbitTilt={orbitConfigs[i].orbitTilt}
          bobSpeed={orbitConfigs[i].bobSpeed}
          bobHeight={orbitConfigs[i].bobHeight}
          onProjectClick={onProjectClick}
        />
      ))}

      <CenterAmongUs />
      <RoamingAmongUs orbitRadius={5} orbitSpeed={0.12} startAngle={0} scale={0.35} color="#00f1fd" yOffset={1} />
      <RoamingAmongUs orbitRadius={9} orbitSpeed={-0.08} startAngle={2.1} scale={0.3} color="#ff7dee" yOffset={-0.5} />

      <CameraRig scrollY={scrollY} />
    </>
  )
}

/* ── Main Scene Component ── */
export default function Scene3D({ projects, onProjectClick, scrollY = 0 }) {
  const isMobile = useIsMobile()

  return (
    <div className="canvas-container" role="img" aria-label="3D interactive solar system">
      <Canvas
        camera={{ position: [0, 5, 14], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={isMobile ? 1 : [1, 2]}
        style={{ background: '#0d0e13' }}
        tabIndex={-1}
      >
        <SceneInner projects={projects} onProjectClick={onProjectClick} scrollY={scrollY} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
