import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from './Navbar'
import { WordsPullUp } from './WordsPullUp'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="h-screen p-4 md:p-6 bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay absolute inset-0 pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 md:pb-10 grid grid-cols-12 items-end gap-4">
          {/* Giant heading */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-bold leading-[0.85] tracking-[-0.05em] select-none"
              style={{ fontSize: 'clamp(16vw, 20vw, 22vw)', color: '#E1E0CC' }}
            >
              <WordsPullUp text="Jaden" delay={0.1} />
              <br />
              <WordsPullUp text="Mack." delay={0.2} />
            </h1>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 pb-2 lg:pb-6">
            <motion.p
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.35 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              Builder. Agency founder. 19 years old, based in Edmonton, Canada — turning ideas into
              scalable digital products through{' '}
              <a
                href="https://moonside.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                Moonside Tech
              </a>
              .
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary CTA */}
              <motion.button
                onClick={() => handleScroll('#work')}
                className="group flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 w-fit font-medium text-sm sm:text-base text-black transition-all duration-300 hover:gap-3 cursor-pointer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
                whileTap={{ scale: 0.97 }}
              >
                <span>See my work</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 text-primary" strokeWidth={2} />
                </span>
              </motion.button>

              {/* Secondary CTA */}
              <motion.a
                href="https://calendar.app.google/VeP316awH8hV1wX89"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full pl-5 pr-5 py-2 w-fit font-medium text-sm sm:text-base border border-primary/30 text-primary/70 hover:border-primary/60 hover:text-primary transition-all duration-300 cursor-pointer"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.82, ease: EASE }}
                whileTap={{ scale: 0.97 }}
              >
                Book a call ↗
              </motion.a>
            </div>

            {/* Stat pill */}
            <motion.div
              className="flex items-center gap-2 w-fit"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-primary/50">$15k+ revenue generated</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
