import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import tournament from '@/landing/tournament.webp'

export const LandingTournamentSection = () => (
  <div
    className="py-24"
    style={{
      background: 'linear-gradient(180deg, #232B50 0%, #19132A 100%)',
    }}
  >
    <AnimatePresence>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-20 px-5"
      >
        <h2
          className="text-center text-5xl leading-none font-semibold"
          style={{
            minWidth: 240,
            color: '#B7FFFD',
            textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
          }}
        >
          NOVEL GAMIFIED NFT <br />
          TOURNAMENT SYSTEM
        </h2>
        <div
          style={{
            background: 'radial-gradient(at center center, #0015FF 0%, #FFFFFF00 74%)',
          }}
        >
          <Image src={tournament} width={tournament.width} alt="tournament-graph" />
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
)
