import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import statBackground from '@/landing/stat-background.webp'

const stats = [
  {
    number: '1M+',
    label: 'Downloads',
  },
  {
    number: '670K+',
    label: 'Database',
  },
  {
    number: '75K',
    label: 'MAUs',
  },
  {
    number: '3M',
    label: 'Entries',
  },
  {
    number: '2023',
    label: 'BREAK EVEN',
  },
]

export const LandingStatsSection = () => {
  return (
    <section
      style={{
        backgroundColor: '#19132A',
        color: '#B7FFFD',
        textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
      }}
    >
      <h2 className="text-center text-5xl leading-none pt-24 pb-16 font-semibold">GAMING STATS</h2>
      <AnimatePresence>
        <div className="flex justify-evenly flex-wrap pb-24">
          {stats.map(({ number, label }, index) => (
            <motion.div
              className="p-2.5 flex-grow-0 text-center"
              style={{
                fontSize: 'clamp(28px, 3.2vw, 36px)',
              }}
              key={label}
              initial={{ y: -300, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 - Number(`0.${index}`) }}
            >
              <div className="relative w-min content-center grid z-0 py-24 aspect-square mb-3">
                <span className="" style={{ lineHeight: 0 }}>
                  {number}
                </span>

                <Image src={statBackground} fill alt="stat-background" className="-z-10" />
              </div>

              <h5 className="font-thin" style={{ fontSize: 'inherit' }}>
                {label}
              </h5>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  )
}
