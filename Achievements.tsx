import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { WordsPullUpMultiStyle } from './WordsPullUp'

const EASE = [0.22, 1, 0.36, 1] as const

const MILESTONES = [
  {
    year: '2024',
    title: 'Founded Moonside Tech',
    description:
      'Started the agency from nothing at 18. No funding, no clients, just a vision for building real digital products with real impact.',
    icon: '🚀',
  },
  {
    year: '2024',
    title: 'First paying client',
    description:
      'Landed the first real contract and shipped Count — a scalable B2C networking platform built from the ground up.',
    icon: '💰',
  },
  {
    year: '2025',
    title: '$15k revenue milestone',
    description:
      'Crossed $15,000 CAD in total agency revenue. Completely self-taught, no degree, no co-founder — just consistent shipping.',
    icon: '📈',
  },
  {
    year: '2025',
    title: 'Revive Energy Clinic',
    description:
      'Shipped a healthcare booking platform for Revive Energy Clinic — a high-conversion system optimized for real patient flow.',
    icon: '🏥',
  },
  {
    year: '2026',
    title: 'Building in public',
    description:
      'Launched jmack.dev as a personal brand hub. Documenting the journey of building an agency as a teenager from Edmonton.',
    icon: '🌐',
  },
]

const PERSONAL = [
  {
    label: 'Age',
    value: '19',
    sub: 'Born & raised in Edmonton, Alberta',
  },
  {
    label: 'Stack',
    value: 'React / TS / Vite',
    sub: 'Tailwind, Framer Motion, Supabase',
  },
  {
    label: 'Agency',
    value: 'Moonside Tech',
    sub: 'B2C & B2B platform development',
    url: 'https://moonside.tech',
  },
  {
    label: 'Focus',
    value: 'SaaS & AI',
    sub: 'Scalable apps with real business value',
  },
  {
    label: 'Email',
    value: 'jadenmack88@gmail.com',
    sub: 'Always open to interesting projects',
    url: 'mailto:jadenmack88@gmail.com',
  },
  {
    label: 'Status',
    value: 'Open to work',
    sub: 'Accepting new clients Q2 2026',
    highlight: true,
  },
]

function MilestoneItem({ milestone, index }: { milestone: typeof MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="border border-primary/10 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/25 transition-colors duration-300"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="text-2xl">{milestone.icon}</span>
          <div>
            <p className="text-gray-600 text-[10px] font-mono mb-0.5">{milestone.year}</p>
            <p className="text-primary font-medium text-sm sm:text-base">{milestone.title}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-primary/40" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
              <div className="border-t border-primary/10 pt-4">
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function PersonalCard({ item, index }: { item: typeof PERSONAL[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const content = (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-5 flex flex-col gap-1 border transition-all duration-300 ${
        item.highlight
          ? 'border-green-500/30 bg-green-950/20 hover:border-green-400/50'
          : 'border-primary/10 bg-[#0d0d0d] hover:border-primary/25'
      } ${item.url ? 'cursor-pointer' : 'cursor-default'}`}
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <p className="text-gray-600 text-[10px] uppercase tracking-widest">{item.label}</p>
      <p className={`font-semibold text-sm sm:text-base ${item.highlight ? 'text-green-400' : 'text-primary'}`}>
        {item.value}
      </p>
      <p className="text-gray-500 text-[10px] sm:text-xs">{item.sub}</p>
    </motion.div>
  )

  if (item.url) {
    return (
      <a href={item.url} target={item.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

const SERVICES = [
  'Full B2C & B2B platform builds from $1,250 CAD',
  'Scalable architecture with AI integrations',
  'Payment processing & 25+ integrations',
  'Full code ownership — you keep everything',
  'Feature additions & performance optimization',
  'API & tool integrations from $500 CAD',
]

export default function Achievements() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="relative bg-black py-16 md:py-24 px-4 md:px-6">
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-14 md:gap-20">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest">Journey & achievements</p>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'How I got here', className: 'text-primary' },
                { text: '— and where I\'m going.', className: 'font-serif italic text-primary/60' },
              ]}
            />
          </div>
        </div>

        {/* Two columns: milestones + personal info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Milestones */}
          <div className="flex flex-col gap-3">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Timeline</p>
            {MILESTONES.map((m, i) => (
              <MilestoneItem key={m.title} milestone={m} index={i} />
            ))}
          </div>

          {/* Personal info grid */}
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Quick facts</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PERSONAL.map((item, i) => (
                <PersonalCard key={item.label} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* What Moonside offers */}
        <div ref={servicesRef} className="border border-primary/10 rounded-2xl p-6 sm:p-10 bg-[#0a0a0a]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/2 flex flex-col gap-4">
              <p className="text-primary text-[10px] uppercase tracking-widest">What I build</p>
              <h3 className="text-primary text-2xl sm:text-3xl font-semibold leading-tight">
                Moonside Tech — my agency
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I founded Moonside Tech to build real digital products for real businesses. We specialize in scalable SaaS,
                AI-powered systems, and high-conversion platforms — the kind of stuff that actually moves the needle.
              </p>
              <motion.a
                href="https://calendar.app.google/VeP316awH8hV1wX89"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 w-fit font-medium text-sm text-black transition-all duration-300 hover:gap-3 mt-2"
                whileTap={{ scale: 0.97 }}
              >
                <span>Book discovery call</span>
                <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                </span>
              </motion.a>
            </div>

            <div className="md:w-1/2 flex flex-col gap-3">
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service}
                  className="flex items-start gap-3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={servicesInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                >
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-400 text-xs sm:text-sm">{service}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
