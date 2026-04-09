import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Copy, Check } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const
const EMAIL = 'jadenmack88@gmail.com'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="bg-black py-16 md:py-24 px-4 md:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Big CTA card */}
        <motion.div
          className="rounded-2xl md:rounded-[2rem] bg-[#0d0d0d] border border-primary/10 overflow-hidden p-8 sm:p-12 md:p-16 flex flex-col items-center text-center gap-8"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Label */}
          <motion.p
            className="text-primary text-[10px] sm:text-xs uppercase tracking-widest"
            initial={{ y: 15, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            Get in touch
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          >
            Let's build something real.
          </motion.h2>

          {/* Sub */}
          <motion.p
            className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          >
            Whether you need a full platform build, an upgrade, or just want to talk about an idea —
            I'm open. Based in Edmonton, working globally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
          >
            <motion.a
              href="https://calendar.app.google/VeP316awH8hV1wX89"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 font-medium text-sm sm:text-base text-black transition-all duration-300 hover:gap-3"
              whileTap={{ scale: 0.97 }}
            >
              <span>Book a discovery call</span>
              <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="w-4 h-4 text-primary" strokeWidth={2} />
              </span>
            </motion.a>

            {/* Email copy button */}
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 border border-primary/20 text-primary/70 hover:border-primary/40 hover:text-primary transition-all duration-300 text-sm font-medium cursor-pointer"
              whileTap={{ scale: 0.96 }}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{EMAIL}</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Footer links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-primary/10 w-full"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          >
            {[
              { label: 'moonside.tech', url: 'https://moonside.tech' },
              { label: 'wearecount.io', url: 'https://wearecount.io' },
              { label: 'jmack.dev', url: 'https://jmack.dev' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 hover:text-primary/70 transition-colors duration-200"
              >
                {link.label} ↗
              </a>
            ))}
            <span className="text-xs text-gray-700">© 2026 Jaden Mack</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
