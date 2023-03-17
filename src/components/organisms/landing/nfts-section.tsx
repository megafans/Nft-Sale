import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

import nftGirlBackgroundLeft from '@/landing/nft-girl-left-background.webp'
import nftGirlBackgroundRight from '@/landing/nft-girl-right-background.webp'
import nftGirlBackgroundMiddle from '@/landing/nft-girl-middle-background.webp'
import nftLeft from '@/landing/nft-1.webp'
import nftMiddle from '@/landing/nft-2.webp'
import nftRight from '@/landing/nft-3.webp'

export const LandingNftsSection = () => {
  const nfts = [
    {
      src: nftLeft,
      background: nftGirlBackgroundLeft,
      name: 'NFT 1',
      title: 'Extragalactic',
      subtitle: 'Champion 2099',
    },
    {
      src: nftMiddle,
      background: nftGirlBackgroundMiddle,
      name: 'NFT 2',
      title: 'Battle Arena Bounty',
      subtitle: 'Hunter RIP 3133',
    },
    {
      src: nftRight,
      background: nftGirlBackgroundRight,
      name: 'NFT 3',
      title: 'Galactic Gamer',
      subtitle: 'Girl 1077',
    },
  ]
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #2B3E6D 0%, #232B50 100%)',
        color: '#B7FFFD',
        textShadow: '0px 0px 9px rgba(199, 255, 253, 0.5)',
      }}
    >
      <h2 className="text-center text-5xl leading-none pt-24 pb-16 font-semibold ">
        GAMER <br />
        GIRLZ NFTS
      </h2>
      <AnimatePresence>
        <div className="flex justify-center flex-wrap pb-24 px-5">
          {nfts.map(({ background, name, title, subtitle, src }, index) => (
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + Number(`0.${index}`) }}
              className={`w-1/3 z-0 px-1 max-sm:order-${index + 1} ${index === 1 ? 'max-lg:order-3' : ''}`}
              key={name}
              style={{
                minWidth: 328,
              }}
            >
              <div
                className="relative"
                style={{
                  padding: '10% 5%',
                }}
              >
                <div className="w-full p-8 pb-4 aspect-square">
                  <Image src={src} alt={`${name} picture`} className="mb-5" />
                </div>
                <p className="text-center mb-10 text-5xl font-semibold">{name}</p>
                <p className="text-center text-xl pb-6 font-semibold leading-loose">
                  {title}
                  <br />
                  {subtitle}
                </p>
                <Image src={background} fill alt="" className="-z-10 object-contain" />
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  )
}
