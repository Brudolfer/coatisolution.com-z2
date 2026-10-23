"use client"

import { useEffect, useRef, type CSSProperties } from "react"

import { BI_MODULES } from "@/lib/bi-modules"
import { LAND_MASK_B64 } from "@/lib/land-mask"

type Vec = [number, number, number]

/** Orte, zwischen denen die Verbindungen laufen: [Breite, Länge]. */
const CITIES: [number, number][] = [
  [51.23, 6.78],
  [52.52, 13.4],
  [51.5, -0.12],
  [40.71, -74.0],
  [37.77, -122.42],
  [43.65, -79.38],
  [-23.55, -46.63],
  [25.2, 55.27],
  [19.08, 72.88],
  [1.35, 103.82],
  [35.68, 139.69],
  [-33.87, 151.21],
  [-26.2, 28.05],
  [30.04, 31.24],
]

/** Index-Paare der Verbindungen. */
const ROUTES: [number, number][] = [
  [0, 3], [0, 7], [0, 9], [1, 10], [2, 4], [3, 6], [3, 4], [7, 8],
  [8, 11], [9, 11], [10, 4], [12, 2], [13, 8], [5, 0], [6, 12], [1, 13],
]

const STEP_DEG = 2.1

function toVec(lat: number, lon: number): Vec {
  const phi = (lat * Math.PI) / 180
  const lam = (lon * Math.PI) / 180
  return [Math.cos(phi) * Math.sin(lam), Math.sin(phi), Math.cos(phi) * Math.cos(lam)]
}

/** Gleichmäßig verteilte Punkte, die auf Land liegen. */
function landPoints(): Vec[] {
  const raw = atob(LAND_MASK_B64)
  const bits = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) bits[i] = raw.charCodeAt(i)
  const points: Vec[] = []
  for (let lat = -84; lat <= 84; lat += STEP_DEG) {
    const count = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / STEP_DEG))
    for (let i = 0; i < count; i += 1) {
      const lon = -180 + ((i + 0.5) * 360) / count
      const x = Math.min(359, Math.floor(lon + 180))
      const y = Math.min(179, Math.max(0, Math.floor(90 - lat)))
      const cell = y * 360 + x
      if (bits[cell >> 3] & (1 << (cell & 7))) points.push(toVec(lat, lon))
    }
  }
  return points
}

/** Punkt auf dem Großkreis zwischen a und b (t von 0 bis 1), um `lift` über die Oberfläche gehoben. */
function arcPoint(a: Vec, b: Vec, angle: number, t: number, lift: number): Vec {
  const sin = Math.sin(angle) || 1
  const wa = Math.sin((1 - t) * angle) / sin
  const wb = Math.sin(t * angle) / sin
  const radius = 1 + lift * Math.sin(Math.PI * t)
  return [(a[0] * wa + b[0] * wb) * radius, (a[1] * wa + b[1] * wb) * radius, (a[2] * wa + b[2] * wb) * radius]
}

function project(v: Vec, cosY: number, sinY: number, cosX: number, sinX: number): Vec {
  const x1 = v[0] * cosY + v[2] * sinY
  const z1 = -v[0] * sinY + v[2] * cosY
  return [x1, v[1] * cosX - z1 * sinX, v[1] * sinX + z1 * cosX]
}

/** Drehbarer Globus mit Landpunkten und Verbindungen; die Module kreisen als Planeten darum. */
export function GlobeStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const planetRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!stage || !canvas || !ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const land = landPoints()
    const cities = CITIES.map(([lat, lon]) => toVec(lat, lon))
    const routes = ROUTES.map(([from, to], index) => {
      const a = cities[from]
      const b = cities[to]
      const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
      const angle = Math.acos(dot)
      return { a, b, angle, lift: 0.12 + angle * 0.22, offset: (index * 0.37) % 1, speed: 0.14 + (index % 5) * 0.025 }
    })

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let radius = 0
    let yaw = -0.1 // Europa zuerst im Blick
    let tilt = 0.38
    let dragging = false
    let lastX = 0
    let lastY = 0
    let frozen = false
    let orbitTime = 0
    let last = performance.now()
    let frame = 0

    function resize() {
      if (!canvas || !ctx) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = width / 2
      cy = height / 2
      radius = Math.min(width * 0.29, height * 0.37)
      if (reduced) {
        draw(performance.now())
        placePlanets()
      }
    }

    function draw(now: number) {
      if (!ctx) return
      const time = now / 1000
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosX = Math.cos(tilt)
      const sinX = Math.sin(tilt)
      ctx.clearRect(0, 0, width, height)

      // Lufthülle
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.38)
      halo.addColorStop(0, "rgba(56, 189, 248, 0.34)")
      halo.addColorStop(0.35, "rgba(37, 99, 235, 0.14)")
      halo.addColorStop(1, "rgba(37, 99, 235, 0)")
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.38, 0, Math.PI * 2)
      ctx.fill()

      // Kugel
      const body = ctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius)
      body.addColorStop(0, "#14305f")
      body.addColorStop(0.55, "#0a1a3a")
      body.addColorStop(1, "#040b1c")
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      // Breitengrade
      ctx.lineWidth = 1
      ctx.strokeStyle = "rgba(96, 165, 250, 0.09)"
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let started = false
        for (let lon = -180; lon <= 180; lon += 6) {
          const p = project(toVec(lat, lon), cosY, sinY, cosX, sinX)
          if (p[2] < 0) {
            started = false
            continue
          }
          const px = cx + p[0] * radius
          const py = cy - p[1] * radius
          if (started) ctx.lineTo(px, py)
          else ctx.moveTo(px, py)
          started = true
        }
        ctx.stroke()
      }

      // Landpunkte
      const size = Math.max(1.1, radius / 230)
      for (const v of land) {
        const p = project(v, cosY, sinY, cosX, sinX)
        const px = cx + p[0] * radius
        const py = cy - p[1] * radius
        if (p[2] > 0) {
          const light = 0.3 + 0.7 * p[2]
          ctx.fillStyle = `rgba(125, 211, 252, ${(0.18 + 0.72 * light).toFixed(3)})`
          const s = size * (0.55 + 0.6 * p[2])
          ctx.fillRect(px - s / 2, py - s / 2, s, s)
        } else {
          ctx.fillStyle = "rgba(96, 165, 250, 0.07)"
          ctx.fillRect(px - size / 2, py - size / 2, size * 0.8, size * 0.8)
        }
      }

      // Rand der Kugel
      ctx.strokeStyle = "rgba(125, 211, 252, 0.35)"
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Verbindungen mit laufendem Lichtpunkt
      const segments = 72
      for (const route of routes) {
        const pts: { x: number; y: number; show: boolean }[] = []
        for (let i = 0; i <= segments; i += 1) {
          const q = project(arcPoint(route.a, route.b, route.angle, i / segments, route.lift), cosY, sinY, cosX, sinX)
          pts.push({ x: cx + q[0] * radius, y: cy - q[1] * radius, show: q[2] > 0 || q[0] * q[0] + q[1] * q[1] > 1 })
        }
        ctx.lineWidth = 1
        ctx.strokeStyle = "rgba(56, 189, 248, 0.22)"
        ctx.beginPath()
        for (let i = 1; i <= segments; i += 1) {
          if (pts[i].show && pts[i - 1].show) {
            ctx.moveTo(pts[i - 1].x, pts[i - 1].y)
            ctx.lineTo(pts[i].x, pts[i].y)
          }
        }
        ctx.stroke()

        const head = (time * route.speed + route.offset) % 1.5
        const tail = 0.3
        const from = Math.max(0, head - tail)
        const to = Math.min(1, head)
        if (to > from) {
          const sample = (t: number) => {
            const q = project(arcPoint(route.a, route.b, route.angle, t, route.lift), cosY, sinY, cosX, sinX)
            return { x: cx + q[0] * radius, y: cy - q[1] * radius, show: q[2] > 0 || q[0] * q[0] + q[1] * q[1] > 1 }
          }
          ctx.lineCap = "round"
          let prev = sample(from)
          for (let i = 1; i <= 18; i += 1) {
            const t = from + ((to - from) * i) / 18
            const cur = sample(t)
            if (prev.show && cur.show) {
              const k = Math.max(0, 1 - (head - t) / tail)
              ctx.lineWidth = 1.4 + 1.4 * k
              ctx.strokeStyle = `rgba(0, 229, 255, ${(0.06 + 0.94 * k * k).toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(prev.x, prev.y)
              ctx.lineTo(cur.x, cur.y)
              ctx.stroke()
            }
            prev = cur
          }
          if (head <= 1 && prev.show) {
            const glow = ctx.createRadialGradient(prev.x, prev.y, 0, prev.x, prev.y, 9)
            glow.addColorStop(0, "rgba(230, 250, 255, 0.9)")
            glow.addColorStop(0.35, "rgba(0, 229, 255, 0.35)")
            glow.addColorStop(1, "rgba(0, 229, 255, 0)")
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(prev.x, prev.y, 9, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Orte mit pulsierendem Ring
      cities.forEach((city, index) => {
        const p = project(city, cosY, sinY, cosX, sinX)
        if (p[2] <= 0.02) return
        const px = cx + p[0] * radius
        const py = cy - p[1] * radius
        const pulse = (time * 0.6 + index * 0.23) % 1
        ctx.strokeStyle = `rgba(0, 229, 255, ${(0.55 * (1 - pulse)).toFixed(3)})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(px, py, 3 + pulse * 13, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = "#00e5ff"
        ctx.beginPath()
        ctx.arc(px, py, 2.6, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    /** Planeten auf einer schrägen Umlaufbahn: vorne größer und über dem Globus, hinten kleiner und dahinter. */
    function placePlanets() {
      const rotation = -0.28
      const cosR = Math.cos(rotation)
      const sinR = Math.sin(rotation)
      const narrow = width < 560
      planetRefs.current.forEach((el, index) => {
        if (!el) return
        const angle = orbitTime * 0.16 + (index * 2 * Math.PI) / BI_MODULES.length
        const ox = Math.cos(angle) * radius * (narrow ? 1.12 : 1.34)
        const oy = Math.sin(angle) * radius * (narrow ? 0.36 : 0.44)
        const x = cx + ox * cosR - oy * sinR
        const y = cy + ox * sinR + oy * cosR
        const depth = Math.sin(angle)
        const scale = 0.74 + (0.26 * (depth + 1)) / 2
        el.style.transform = `translate(${(x - 48).toFixed(1)}px, ${(y - 48).toFixed(1)}px) scale(${scale.toFixed(3)})`
        el.style.zIndex = depth > 0 ? "3" : "0"
        el.style.opacity = depth > 0 ? "1" : "0.8"
      })
    }

    function tick(now: number) {
      const delta = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!dragging) yaw += delta * 0.05
      if (!frozen) orbitTime += delta
      draw(now)
      placePlanets()
      frame = requestAnimationFrame(tick)
    }

    function onDown(event: PointerEvent) {
      dragging = true
      lastX = event.clientX
      lastY = event.clientY
      canvas?.setPointerCapture(event.pointerId)
    }
    function onMove(event: PointerEvent) {
      if (!dragging) return
      yaw += (event.clientX - lastX) * 0.006
      tilt = Math.max(-0.7, Math.min(0.9, tilt + (event.clientY - lastY) * 0.004))
      lastX = event.clientX
      lastY = event.clientY
      if (reduced) draw(performance.now())
    }
    function onUp() {
      dragging = false
    }
    const freeze = () => {
      frozen = true
    }
    const unfreeze = () => {
      frozen = false
    }

    const planets = planetRefs.current.filter((el): el is HTMLDivElement => el !== null)
    planets.forEach((el) => {
      el.addEventListener("pointerenter", freeze)
      el.addEventListener("pointerleave", unfreeze)
    })
    canvas.addEventListener("pointerdown", onDown)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerup", onUp)
    canvas.addEventListener("pointercancel", onUp)

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    if (!reduced) frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      planets.forEach((el) => {
        el.removeEventListener("pointerenter", freeze)
        el.removeEventListener("pointerleave", unfreeze)
      })
      canvas.removeEventListener("pointerdown", onDown)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerup", onUp)
      canvas.removeEventListener("pointercancel", onUp)
    }
  }, [])

  return (
    <div className="stage" ref={stageRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="core" aria-hidden="true">
        <p>powered by</p>
        <div>
          <img src="/images/bi-ratio-icon.png" alt="" />
          <b>
            BI<em>-</em>Ratio
          </b>
        </div>
      </div>
      {BI_MODULES.map((module, index) => (
        <div
          key={module.title}
          ref={(el) => {
            planetRefs.current[index] = el
          }}
          className="planet"
          style={
            {
              "--hi": module.colors[0],
              "--mid": module.colors[1],
              "--lo": module.colors[2],
              "--glow": module.colors[3],
            } as CSSProperties
          }
        >
          {module.ring && <span className="ring back" />}
          <div className="disc">
            <b>{module.value}</b>
            <em>{module.label}</em>
          </div>
          {module.ring && <span className="ring front" />}
          <div className="bubble">
            <h4>{module.title}</h4>
            <p>{module.summary}</p>
            <ul>
              {module.points.map(([name, text]) => (
                <li key={name}>
                  {name}
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
