import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  delay?: number
}

export function WordsPullUp({ text, className = '', delay = 0 }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: 28, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
            transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface Segment {
  text: string
  className: string
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  containerClassName?: string
  delay?: number
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '', delay = 0 }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const allWords: { word: string; className: string }[] = []
  segments.forEach(({ text, className }) => {
    text.split(' ').forEach((word) => {
      if (word) allWords.push({ word, className })
    })
  })

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${containerClassName}`}>
      {allWords.map(({ word, className }, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 28, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
            transition={{ duration: 0.75, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
