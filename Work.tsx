import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUp'

const EASE = [0.22, 1, 0.36, 1] as const

const PROJECTS = [
  {
    number: '01',
    name: 'Count',
    type: 'B2C Networking Platform',
    description:
      'A scalable networking platform built for growth and engagement. Designed the architecture from scratch to handle real user loads with clean, fast UX.',
    tags: ['React', 'Scalable Arch', 'B2C', 'SaaS'],
    url: 'https://wearecount.io',
    image: 'https://www.moonside.tech/count.png',
    color: '#1a1a2e',
  },
  {
    number: '02',
    name: 'Revive Energy Clinic',
    type: 'Healthcare Booking Platform',
    description:
      'High-conversion booking platform built for a healthcare clinic. Optimized every step of the funnel for maximum user conversion and experience.',
    tags: ['Booking System', 'Healthcare', 'B2B', 'UX'],
    url: 'https://reviveenergyclinic.base44.app',
    image: 'https://www.moonside.tech/revive.png',
    color: '#0d1f1a',
  },
  {
    number: '03',
    name: 'Moonside Tech',
    type: 'Agency Website',
    description:
      'The agency itself — a cinematic, conversion-focused site for Moonside Tech showcasing our work, pricing, and booking flow.',
    tags: ['Agency', 'Design', 'Vite', 'Tailwind'],
    url: 'https://moonside.tech',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4',
    isVideo: true,
    color: '#111111',
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="group relative border border-primary/10 rounded-2xl overflow-hidden cursor-pointer"
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ borderColor: 'rgba(222,219,200,0.25)' }}
      onClick={() => window.open(project.url, '_blank')}
    >
      {/* Image / Video preview */}
      <div className="relative h-48 sm:h-56 overflow-hidden" style={{ background: project.color }}>
        {project.isVideo ? (
          <video
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <motion.img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 bg-primary text-black font-medium text-sm rounded-full px-5 py-2">
                <span>View project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6 bg-[#0d0d0d] flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-gray-600 text-xs font-mono mb-1">{project.number}</p>
            <h3 className="text-primary font-semibold text-lg leading-tight">{project.name}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{project.type}</p>
          </div>
          <motion.div
            className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1"
            animate={{ rotate: hovered ? -45 : 0, borderColor: hovered ? 'rgba(222,219,200,0.5)' : 'rgba(222,219,200,0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-3.5 h-3.5 text-primary/60" />
          </motion.div>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full border border-primary/15 text-primary/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="work" className="bg-black py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-14">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest">Selected work</p>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Products I built', className: 'text-primary' },
                { text: 'through Moonside Tech.', className: 'font-serif italic text-primary/70' },
              ]}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Moonside CTA */}
        <motion.a
          href="https://moonside.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border border-primary/15 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors duration-300"
          whileHover={{ backgroundColor: 'rgba(222,219,200,0.03)' }}
          whileTap={{ scale: 0.99 }}
        >
          <div>
            <p className="text-primary font-semibold text-lg sm:text-xl">Want to work together?</p>
            <p className="text-gray-500 text-sm mt-1">Visit moonside.tech to see pricing and book a discovery call.</p>
          </div>
          <motion.div
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4 text-black -rotate-45" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}
