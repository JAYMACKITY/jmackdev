import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue, useInView } from 'framer-motion'
import { WordsPullUpMultiStyle } from './WordsPullUp'

interface AnimatedLetterProps {
  char: string
  progress: MotionValue<number>
  charProgress: number
}

function AnimatedLetter({ char, progress, charProgress }: AnimatedLetterProps) {
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.12), charProgress + 0.04],
    [0.12, 1]
  )
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}

const BODY_TEXT =
  "I'm 19, based in Edmonton, Canada. I started building apps out of pure obsession — no CS degree, no roadmap, just relentless shipping. I founded Moonside Tech to turn that obsession into a real agency that builds scalable B2C and B2B platforms for founders who need things done right. So far we've crossed $15k in revenue, shipped real products with real users, and I'm just getting started."

const STATS = [
  { value: '$15k+', label: 'Revenue generated' },
  { value: '2', label: 'Live products shipped' },
  { value: '19', label: 'Years old' },
  { value: '∞', label: 'Things left to build' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.15'],
  })

  const chars = BODY_TEXT.split('')
  const total = chars.length

  return (
    <section id="about" className="bg-black py-16 md:py-24 px-4 md:px-6 flex justify-center" ref={sectionRef}>
      <div className="w-full max-w-6xl rounded-2xl md:rounded-[2rem] bg-[#101010] px-6 py-12 md:px-12 md:py-20 text-center flex flex-col items-center gap-10">
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest">About me</p>

        {/* Heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9]">
          <WordsPullUpMultiStyle
            segments={[
              { text: "I'm Jaden Mack,", className: 'font-normal text-primary' },
              { text: 'a self-taught builder', className: 'font-serif italic text-primary' },
              { text: 'and agency founder from Edmonton.', className: 'font-normal text-primary' },
            ]}
            delay={0}
          />
        </div>

        {/* Scroll-linked body text */}
        <p className="max-w-2xl text-xs sm:text-sm md:text-base" style={{ color: '#DEDBC8' }} aria-label={BODY_TEXT}>
          {chars.map((char, i) => (
            <AnimatedLetter key={i} char={char} progress={scrollYProgress} charProgress={i / total} />
          ))}
        </p>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-black/40 border border-primary/10 rounded-2xl p-5 flex flex-col items-center gap-1 hover:border-primary/25 transition-colors duration-300 cursor-default"
              initial={{ y: 20, opacity: 0 }}
              animate={statsInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 text-center">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
