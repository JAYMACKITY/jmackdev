import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ── Custom cursor ──────────────────────────────────────────────────────────

function initCursor() {
  const dot = document.createElement('div')
  dot.id = 'cursor-dot'
  const ring = document.createElement('div')
  ring.id = 'cursor-ring'
  document.body.appendChild(dot)
  document.body.appendChild(ring)

  let mouseX = 0, mouseY = 0
  let ringX = 0, ringY = 0
  let raf: number

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.left = mouseX + 'px'
    dot.style.top = mouseY + 'px'
  })

  function animate() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top = ringY + 'px'
    raf = requestAnimationFrame(animate)
  }
  raf = requestAnimationFrame(animate)

  // Hover detection
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, [role="button"], [data-cursor="hover"]')) {
      document.body.classList.add('cursor-hover')
    }
  })
  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, [role="button"], [data-cursor="hover"]')) {
      document.body.classList.remove('cursor-hover')
    }
  })

  // Hide on mobile (no hover events)
  if (window.matchMedia('(hover: none)').matches) {
    dot.style.display = 'none'
    ring.style.display = 'none'
    document.body.style.cursor = 'auto'
    cancelAnimationFrame(raf)
  }
}

initCursor()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
