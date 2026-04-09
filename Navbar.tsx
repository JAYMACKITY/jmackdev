import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
      <motion.nav
        className="rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 relative"
        animate={{ backgroundColor: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,1)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile: show name + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#E1E0CC' }}>
            jmack.dev
          </span>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1 p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-primary"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-px bg-primary"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-primary"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>

        {/* Desktop nav items */}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item.href)}
            className="hidden md:block text-[10px] sm:text-xs md:text-sm transition-colors duration-200 whitespace-nowrap bg-transparent border-0 cursor-pointer"
            style={{ color: 'rgba(225, 224, 204, 0.8)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
          >
            {item.label}
          </button>
        ))}

        {/* Moonside link */}
        <a
          href="https://moonside.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-[10px] sm:text-xs md:text-sm transition-all duration-200 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 hover:bg-primary/20"
          style={{ color: '#E1E0CC' }}
        >
          moonside.tech ↗
        </a>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-4 right-4 mt-2 bg-black/95 rounded-2xl border border-primary/10 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="block w-full text-left px-6 py-4 text-sm border-b border-primary/5 last:border-0 bg-transparent cursor-pointer transition-colors duration-150 hover:bg-primary/5"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.a
              href="https://moonside.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-4 text-sm text-primary/70 hover:text-primary transition-colors duration-150"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.05 }}
            >
              moonside.tech ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
