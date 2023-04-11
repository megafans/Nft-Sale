import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import heroBackground from '@/landing/prombg.webp'
import heroCharacters from '@/landing/characters.webp'
import bannerButton from '@/landing/banner-button.webp'
import lightButton from '@/landing/light-button.webp'

export const LandingHeroSection = () => (
  <AnimatePresence>
    <div
      className="h-screen overflow-x-hidden z-0"
      style={{
        position: 'relative',
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 1,
        height: 'clamp(60vh, 56vw, 100vh)',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          minHeight: '1px',
          alignSelf: 'auto',
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            paddingBottom: 'clamp(50px, 8vw, 170px)',
            lineHeight: 1,
            width: 'max-content',
            zIndex: 0,
          }}
        >
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.2 }}
            exit={{ scale: 1.2, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              position: 'relative',
            }}
          >
            <p
              style={{
                color: '#C7FFFD',
                fontSize: 'clamp(24px, 3.6vw, 40px)',
                fontWeight: 600,
                fontFamily: '"Space Grotesk", sans-serif;',
                lineHeight: 1,
                padding: '36px 144px',
                textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
              }}
            >
              NFT COLLECTION
            </p>

            <Image
              fill
              src={bannerButton}
              className="-z-10"
              alt="nft-collection-button-background"
              style={{ objectFit: 'contain' }}
            />
          </motion.div>

          <div
            style={{
              textAlign: 'center',
              display: 'block',
              position: 'relative',
            }}
          >
            <p
              style={{
                padding: 24,
              }}
            >
              HOLD TO EARN
            </p>
            <Image
              fill
              src={lightButton}
              className="-z-10"
              alt="nft-collection-light-button-background"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      <Image
        src={heroCharacters}
        priority
        fill
        alt="hero-characters"
        className="-z-10 max-md:object-cover object-contain object-center min-w"
        // style={{ minWidth: 700 }}
        placeholder="blur"
      />
      <Image src={heroBackground} priority fill alt="hero-background" className=" -z-20 object-cover object-bottom" />
    </div>
  </AnimatePresence>
)
