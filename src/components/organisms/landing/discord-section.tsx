import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import lightLightingButton from '@/landing/light-lightning-button.webp'

import discordBackground from '@/landing/discord-background.webp'

export const LandingDiscordSection = () => (
  <AnimatePresence>
    <div
      className="p-24 z-0 max-lg:p-6"
      style={{
        background: 'linear-gradient(180deg, #19132A 0%, #242E56 100%)',
        color: '#C7FFFD',
        fontFamily: '"Space Grotesk", sans-serif;',
      }}
    >
      <motion.div
        initial={{ y: 300, opacity: 0.2 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-0"
      >
        <div
          className="flex flex-col items-center z-10"
          style={{
            padding: '10% 5%',
          }}
        >
          <h2
            className="text-center text-5xl leading-none py-8 font-semibold max-md:text-2xl"
            style={{
              textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
            }}
          >
            JOIN DISCORD NOW
          </h2>
          <p className="text-center text-2xl max-md:text-lg">
            Pre-mint info and FAQs <br /> Answered on Discord
          </p>

          <div className="relative z-0 cursor-pointer" style={{ color: 'black' }}>
            <a
              href="https://discord.com/invite/megfansnfts"
              target="_blank"
              className="px-20 block py-16 font-semibold text-xl leading-loose max-md:px-10 max-md:py-6"
            >
              DISCORD
            </a>
            <Image src={lightLightingButton} fill alt="light-button-background" className="object-contain -z-10" />
          </div>
        </div>
        <Image src={discordBackground} fill alt="discord-section-background" className="object-contain -z-10" />
      </motion.div>
    </div>
  </AnimatePresence>
)
