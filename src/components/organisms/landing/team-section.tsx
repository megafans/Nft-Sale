import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import teamBackground from '@/landing/team-section-background2.webp'
import boomImage from '@/landing/boom.webp'
import teamJeff from '@/landing/team-jeff.webp'
import teamColin from '@/landing/team-colin.webp'
import teamAlphabit from '@/landing/team-alphabit.webp'
import teamTechstars from '@/landing/team-techstars.webp'
import teamLaunchp from '@/landing/team-launchp.webp'
import teamFerrum from '@/landing/team-ferrum.webp'
import teamFund from '@/landing/team-fund.webp'

export const LandingTeamSection = () => (
  <div
    className="relative z-0"
    style={{
      background: 'linear-gradient(180deg, #16131E 0%, #1C1031 100%)',
      // aspectRatio: `${teamBackground.width} / ${teamBackground.height}`,
    }}
  >
    <Image
      src={teamBackground}
      fill
      alt="teams-section-background"
      className="object-contain -z-20"
      style={{
        objectPosition: '0% -1.5vw',
      }}
    />
    <div
      className="pt-32 -mt-20  text-center"
      style={{
        color: '#B7FFFD',
        textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
      }}
    >
      <h2 className="text-5xl leading-none font-semibold mb-6">
        TEAM AND <br /> PARTNERS
      </h2>
      <p className="text-xl">we built this</p>
    </div>

    <div
      className="relative mt-2 flex flex-col justify-center p-5"
      style={{
        aspectRatio: `${boomImage.width} / ${boomImage.height}`,
      }}
    >
      <AnimatePresence>
        <div className="flex justify-center gap-2">
          <motion.a
            whileHover={{ scale: 1.1 }}
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href="https://www.linkedin.com/in/jeffdonnelley/"
            target="_blank"
            className="ml-auto cursor-pointer"
            style={{ maxWidth: 'min(50%, 340px)' }}
          >
            <Image src={teamJeff} alt="" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href="https://www.linkedin.com/in/colinbracey/"
            target="_blank"
            className="mr-auto cursor-pointer"
            style={{ maxWidth: 'min(50%, 340px)' }}
          >
            <Image src={teamColin} alt="" />
          </motion.a>
        </div>
      </AnimatePresence>

      <div className="flex justify-center gap-2">
        <Image src={teamAlphabit} alt="" style={{ maxWidth: 'min(33%, 340px)' }} />
        <Image src={teamTechstars} alt="" style={{ maxWidth: 'min(33%, 340px)' }} />
        <Image src={teamLaunchp} alt="" style={{ maxWidth: 'min(33%, 340px)' }} />
      </div>

      <div className="flex justify-center gap-2">
        <Image src={teamFerrum} alt="" style={{ maxWidth: 'min(50%, 340px)' }} />
        <Image src={teamFund} alt="" style={{ maxWidth: 'min(50%, 340px)' }} />
      </div>

      <Image src={boomImage} fill alt="explosion-picture" className="object-contain max-lg:object-cover -z-10" />
    </div>
  </div>
)
