import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import girl from '@/landing/blue-girl.webp'

export const LandingBuySection = () => (
  <div
    style={{
      backgroundImage: 'radial-gradient(at center right, rgba(80, 40, 101, 0.5) 0%, #16131E 68%)',
      backgroundColor: '#16131E',
    }}
  >
    <AnimatePresence>
      <div className="flex items-center justify-center gap-20">
        <div className="flex px-5 items-center">
          <h2
            className="text-center text-3xl leading-10 font-semibold max-w-2xl uppercase"
            style={{
              minWidth: 240,
              color: '#B7FFFD',
              textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
            }}
          >
            Hold Megafans NFTs to unlock in-game tokens (MFANS) that can be traded for cryptocurrencies, cash, and
            real-world rewards!
          </h2>
        </div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="justify-end mb-5 hidden md:flex"
          style={{
            background: 'radial-gradient(at center center, #0015FF 0%, #FFFFFF00 74%)',
          }}
        >
          <Image src={girl} width={girl.width} height={girl.height} alt="girl-graph" />
        </motion.div>
      </div>
    </AnimatePresence>
  </div>
)
