"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { RainbowButton } from "./rainbow-button"
import { Badge } from "./badge"
import { Sparkles, Zap, Phone } from "lucide-react"

export const HorizonHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const totalSections = 3

  const threeRefs = useRef<{
    scene: THREE.Scene | null
    camera: THREE.PerspectiveCamera | null
    renderer: THREE.WebGLRenderer | null
    stars: THREE.Points[]
    nebula: THREE.Mesh | null
    mountains: THREE.Mesh[]
    animationId: number | null
    targetCameraX?: number
    targetCameraY?: number
    targetCameraZ?: number
    locations?: number[]
  }>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  })

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs

      // Scene setup
      refs.scene = new THREE.Scene()
      refs.scene.fog = new THREE.FogExp2(0x000011, 0.00025)

      // Camera
      refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
      refs.camera.position.z = 100
      refs.camera.position.y = 20

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      })
      refs.renderer.setSize(window.innerWidth, window.innerHeight)
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping
      refs.renderer.toneMappingExposure = 0.5

      // Create scene elements
      createStarField()
      createNebula()
      createMountains()
      createAtmosphere()
      getLocation()

      // Start animation
      animate()

      // Mark as ready after Three.js is initialized
      setIsReady(true)
    }

    const createStarField = () => {
      const { current: refs } = threeRefs
      const starCount = 3000

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(starCount * 3)
        const colors = new Float32Array(starCount * 3)
        const sizes = new Float32Array(starCount)

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[j * 3 + 2] = radius * Math.cos(phi)

          // Color variation for window cleaning theme (blues and whites)
          const color = new THREE.Color()
          const colorChoice = Math.random()
          if (colorChoice < 0.7) {
            color.setHSL(0.6, 0.3, 0.8 + Math.random() * 0.2) // Blue tones
          } else if (colorChoice < 0.9) {
            color.setHSL(0, 0, 0.9 + Math.random() * 0.1) // White tones
          } else {
            color.setHSL(0.55, 0.5, 0.8) // Light blue
          }

          colors[j * 3] = color.r
          colors[j * 3 + 1] = color.g
          colors[j * 3 + 2] = color.b
          sizes[j] = Math.random() * 2 + 0.5
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })

        const stars = new THREE.Points(geometry, material)
        refs.scene!.add(stars)
        refs.stars.push(stars)
      }
    }

    const createNebula = () => {
      const { current: refs } = threeRefs

      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x1e40af) }, // Blue-700
          color2: { value: new THREE.Color(0x3b82f6) }, // Blue-500
          opacity: { value: 0.2 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      const nebula = new THREE.Mesh(geometry, material)
      nebula.position.z = -1050
      nebula.rotation.x = 0
      refs.scene!.add(nebula)
      refs.nebula = nebula
    }

    const createMountains = () => {
      const { current: refs } = threeRefs

      const layers = [
        { distance: -50, height: 60, color: 0x1e293b, opacity: 1 }, // Slate-800
        { distance: -100, height: 80, color: 0x334155, opacity: 0.8 }, // Slate-700
        { distance: -150, height: 100, color: 0x475569, opacity: 0.6 }, // Slate-600
        { distance: -200, height: 120, color: 0x64748b, opacity: 0.4 }, // Slate-500
      ]

      layers.forEach((layer, index) => {
        const points = []
        const segments = 50

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 -
            100
          points.push(new THREE.Vector2(x, y))
        }

        points.push(new THREE.Vector2(5000, -300))
        points.push(new THREE.Vector2(-5000, -300))

        const shape = new THREE.Shape(points)
        const geometry = new THREE.ShapeGeometry(shape)
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        })

        const mountain = new THREE.Mesh(geometry, material)
        mountain.position.z = layer.distance
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index }
        refs.scene!.add(mountain)
        refs.mountains.push(mountain)
      })
    }

    const createAtmosphere = () => {
      const { current: refs } = threeRefs

      const geometry = new THREE.SphereGeometry(600, 32, 32)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.2, 0.5, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      })

      const atmosphere = new THREE.Mesh(geometry, material)
      refs.scene!.add(atmosphere)
    }

    const animate = () => {
      const { current: refs } = threeRefs
      refs.animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update stars
      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time
        }
      })

      // Update nebula
      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05

        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor
        smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * smoothingFactor
        smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * smoothingFactor

        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2
        const floatY = Math.cos(time * 0.15) * 1

        // Apply final position
        refs.camera.position.x = smoothCameraPos.current.x + floatX
        refs.camera.position.y = smoothCameraPos.current.y + floatY
        refs.camera.position.z = smoothCameraPos.current.z
        refs.camera.lookAt(0, 10, -600)
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor
      })

      if (refs.renderer) {
        refs.renderer.render(refs.scene!, refs.camera!)
      }
    }

    const getLocation = () => {
      const { current: refs } = threeRefs
      const locations: number[] = []
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z
      })
      refs.locations = locations
    }

    initThree()

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight
        refs.camera.updateProjectionMatrix()
        refs.renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      const { current: refs } = threeRefs

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
      }
      window.removeEventListener("resize", handleResize)

      // Dispose Three.js resources
      refs.stars.forEach((starField) => {
        starField.geometry.dispose()
        starField.material.dispose()
      })
      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose()
        mountain.material.dispose()
      })
      if (refs.nebula) {
        refs.nebula.geometry.dispose()
        refs.nebula.material.dispose()
      }
      if (refs.renderer) {
        refs.renderer.dispose()
      }
    }
  }, [])

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const progress = Math.min(scrollY / maxScroll, 1)

      setScrollProgress(progress)
      const newSection = Math.floor(progress * totalSections)
      setCurrentSection(newSection)

      const { current: refs } = threeRefs

      // Calculate smooth progress through all sections
      const totalProgress = progress * totalSections
      const sectionProgress = totalProgress % 1

      // Define camera positions for each section
      const cameraPositions = [
        { x: 0, y: 30, z: 300 }, // Section 0 - CLEARVIEW
        { x: 0, y: 40, z: -50 }, // Section 1 - PROFESSIONAL
        { x: 0, y: 50, z: -700 }, // Section 2 - EXCELLENCE
      ]

      // Get current and next positions
      const currentPos = cameraPositions[newSection] || cameraPositions[0]
      const nextPos = cameraPositions[newSection + 1] || currentPos

      // Set target positions
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress

      // Smooth parallax for mountains
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9
        const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5

        if (progress > 0.7) {
          mountain.position.z = 600000
        }
        if (progress < 0.7) {
          mountain.position.z = refs.locations![i]
        }
      })

      if (refs.nebula) {
        refs.nebula.position.z = refs.mountains[3]?.position.z || -1050
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [totalSections])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="relative min-h-[300vh] overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      {/* Side menu */}
      <div ref={menuRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="writing-mode-vertical text-white/60 text-sm font-light tracking-widest">CLEAN</div>
        </div>
      </div>

      {/* Main content */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-lg px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              Premium Window Cleaning
            </Badge>
          </motion.div>

          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-8 tracking-wider"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            {currentSection === 0 && "CLEARVIEW"}
            {currentSection === 1 && "PROFESSIONAL"}
            {currentSection === 2 && "EXCELLENCE"}
          </motion.h1>

          <motion.div
            ref={subtitleRef}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {currentSection === 0 && (
              <>
                <p className="mb-2">Where crystal clear vision meets reality,</p>
                <p>we transform your windows to perfection</p>
              </>
            )}
            {currentSection === 1 && (
              <>
                <p className="mb-2">Beyond ordinary cleaning services,</p>
                <p>lies our commitment to excellence</p>
              </>
            )}
            {currentSection === 2 && (
              <>
                <p className="mb-2">In the space between spotless and pristine,</p>
                <p>we deliver unmatched window cleaning mastery</p>
              </>
            )}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <RainbowButton onClick={() => scrollToSection("quote")} className="text-lg px-8 h-14">
              <Zap className="w-5 h-5 mr-2" />
              Get Free Quote
            </RainbowButton>
            <button
              onClick={() => scrollToSection("services")}
              className="text-lg px-8 h-14 border border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-2 inline" />
              Call (416) 555-0123
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-white/60 text-sm font-light tracking-widest writing-mode-vertical">SCROLL</div>
          <div className="w-px h-32 bg-white/20 relative">
            <div
              className="w-px bg-blue-400 absolute top-0 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="text-white/60 text-sm font-mono">
            {String(currentSection + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Additional sections for scrolling */}
      <div className="absolute top-[100vh] w-full">
        {[...Array(2)].map((_, i) => (
          <section key={i} className="h-screen flex items-center justify-center">
            <div className="text-center text-white opacity-0">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider">
                {i === 0 ? "PROFESSIONAL" : "EXCELLENCE"}
              </h1>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
