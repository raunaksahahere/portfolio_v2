import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'

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

/* ── Particles floating in space ── */
function ParticleField({ isMobile }) {
  const count = isMobile ? 800 : 2500
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cyan = new THREE.Color('#00f5ff')
    const magenta = new THREE.Color('#ff00c8')
    const white = new THREE.Color('#ffffff')
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
      const t = Math.random()
      const c = t < 0.2 ? cyan : t < 0.35 ? magenta : white
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

/* ── Wireframe Core — center piece ── */
function WireframeCore() {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial color="#00f5ff" wireframe transparent opacity={0.25} emissive="#00f5ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.06} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.4, 0]} />
        <meshBasicMaterial color="#ff00c8" wireframe transparent opacity={0.03} />
      </mesh>
      <pointLight color="#00f5ff" intensity={2} distance={15} />
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

/* ── Project Planet — orbits the center ── */
function ProjectPlanet({ project, orbitRadius, orbitSpeed, startAngle, orbitTilt, bobSpeed, bobHeight, onProjectClick }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const geometries = ['dodecahedron', 'octahedron', 'icosahedron', 'tetrahedron', 'box', 'torus']

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + startAngle
    if (groupRef.current) {
      // Elliptical orbit with tilt
      const x = Math.cos(t) * orbitRadius
      const z = Math.sin(t) * orbitRadius * 0.85
      // Apply orbit tilt rotation
      groupRef.current.position.x = x * Math.cos(orbitTilt) - 0 * Math.sin(orbitTilt)
      groupRef.current.position.z = z
      // Bobbing up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * bobSpeed + startAngle * 3) * bobHeight
        + Math.cos(state.clock.elapsedTime * bobSpeed * 0.7 + startAngle) * bobHeight * 0.4
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.012
      meshRef.current.rotation.x += 0.006
      // Slight wobble
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
          wireframe
          transparent
          opacity={0.7}
          emissive={project.color}
          emissiveIntensity={0.2}
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

/* ── Inner scene ── */
function SceneInner({ projects, onProjectClick, scrollY, isMobile }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[20, 20, 10]} intensity={0.3} color="#ffffff" />

      <ParticleField isMobile={isMobile} />
      <Stars radius={40} depth={30} count={isMobile ? 1500 : 4000} factor={3} saturation={0} fade speed={0.3} />

      <WireframeCore />

      <OrbitRing radius={4} speed={0.05} color="#00f5ff" opacity={0.08} tilt={0.05} />
      <OrbitRing radius={6.5} speed={-0.03} color="#ff00c8" opacity={0.06} tilt={-0.03} />
      <OrbitRing radius={8.5} speed={0.02} color="#a855f7" opacity={0.04} tilt={0.04} />
      <OrbitRing radius={10} speed={-0.015} color="#22c55e" opacity={0.03} tilt={-0.02} />

      {projects.map((p, i) => {
        const orbitRadius = 4 + i * 1.2
        const orbitSpeed = (0.15 + Math.sin(i * 1.7) * 0.03) / (i * 0.4 + 1)
        const startAngle = (i / projects.length) * Math.PI * 2
        const orbitTilt = (i % 2 === 0 ? 1 : -1) * (0.02 + i * 0.01)
        const bobSpeed = 0.3 + i * 0.05
        const bobHeight = 0.2 + i * 0.03
        return (
          <ProjectPlanet
            key={p.id}
            project={p}
            orbitRadius={orbitRadius}
            orbitSpeed={orbitSpeed}
            startAngle={startAngle}
            orbitTilt={orbitTilt}
            bobSpeed={bobSpeed}
            bobHeight={bobHeight}
            onProjectClick={onProjectClick}
          />
        )
      })}

      <CameraRig scrollY={scrollY} />
    </>
  )
}

/* ── Main Scene Component ── */
export default function Scene3D({ projects, onProjectClick, scrollY = 0 }) {
  const isMobile = useIsMobile()

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 5, 14], fov: 60 }}
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={isMobile ? 1 : [1, 2]}
        style={{ background: '#050505' }}
      >
        <SceneInner projects={projects} onProjectClick={onProjectClick} scrollY={scrollY} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
