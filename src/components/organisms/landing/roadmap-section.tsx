import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import roadmapBackground from '@/landing/roadmap-background.webp'
import roadmapStep1 from '@/landing/roadmap-step-1.webp'
import roadmapStep2 from '@/landing/roadmap-step-2.webp'
import roadmapStep3 from '@/landing/roadmap-step-3.webp'
import roadmapStep4 from '@/landing/roadmap-step-4.webp'
import roadmapStep5 from '@/landing/roadmap-step-5.webp'

export const LandingRoadmapSection = () => (
  <div
    style={{
      background: 'linear-gradient(180deg, #1C1031 0%, #2B3E6D 100%)',
      paddingBlock: 150,
      position: 'relative',
      zIndex: 1,
    }}
  >
    <div className="absolute inset-0  object-center">
      <div className="flex justify-center -z-10 relative w-1/2 h-full mx-auto">
        <Image
          // width={roadmapBackground.width / 2}
          fill
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          src={roadmapBackground}
          alt="roadmap-background"
        />
      </div>
    </div>

    <AnimatePresence>
      <div className="flex flex-col z-0 relative mix-blend-lighten">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-start"
        >
          <Image
            style={{ objectFit: 'contain', objectPosition: 'center', width: '55%' }}
            src={roadmapStep1}
            alt="roadmap-background"
          />
        </motion.div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-end mb-5"
        >
          <Image
            style={{ objectFit: 'contain', objectPosition: 'center', width: '55%' }}
            src={roadmapStep2}
            alt="roadmap-background"
          />
        </motion.div>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-start mb-5"
        >
          <Image
            style={{ objectFit: 'contain', objectPosition: 'center', width: '55%' }}
            src={roadmapStep3}
            alt="roadmap-background"
          />
        </motion.div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-end mb-5"
        >
          <Image
            style={{ objectFit: 'contain', objectPosition: 'center', width: '55%' }}
            src={roadmapStep5}
            alt="roadmap-background"
          />
        </motion.div>
      </div>
    </AnimatePresence>
    <AnimatePresence>
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-start mb-5"
      >
        <Image
          style={{ objectFit: 'contain', objectPosition: 'center', width: '55%' }}
          src={roadmapStep4}
          alt="roadmap-background"
        />
      </motion.div>
    </AnimatePresence>
  </div>
)
