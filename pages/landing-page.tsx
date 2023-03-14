import Head from 'next/head'
import clsx from 'clsx'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'

import { Container, Copyright, Logo, PaymentButtons } from '@/components'

import { navigation } from '@/helpers/constants'
import headerBackground from '../public/landing/celebration.webp'
import heroBackground from '../public/landing/prombg.webp'
import heroCharacters from '../public/landing/characters.webp'
import logo from '../public/landing/megafans-header.webp'
import headerButton from '../public/landing/button.webp'
import bannerButton from '../public/landing/banner-button.webp'
import lightButton from '../public/landing/light-button.webp'
import lightLightingButton from '../public/landing/light-lightning-button.webp'
import roadmapBackground from '../public/landing/roadmap-background.webp'

import roadmapStep1 from '../public/landing/roadmap-step-1.webp'
import roadmapStep2 from '../public/landing/roadmap-step-2.webp'
import roadmapStep3 from '../public/landing/roadmap-step-3.webp'
import roadmapStep4 from '../public/landing/roadmap-step-4.webp'
import roadmapStep5 from '../public/landing/roadmap-step-5.webp'
import tournament from '../public/landing/tournament.webp'
import statBackground from '../public/landing/stat-background.webp'
import discordBackground from '../public/landing/discord-background.webp'
import teamBackground from '../public/landing/team-section-background2.webp'
import boomImage from '../public/landing/boom.webp'

import teamJeff from '../public/landing/team-jeff.webp'
import teamColin from '../public/landing/team-colin.webp'
import teamAlphabit from '../public/landing/team-alphabit.webp'
import teamTechstars from '../public/landing/team-techstars.webp'
import teamLaunchp from '../public/landing/team-launchp.webp'
import teamFerrum from '../public/landing/team-ferrum.webp'
import teamFund from '../public/landing/team-fund.webp'

import nftGirlBackgroundLeft from '../public/landing/nft-girl-left-background.webp'
import nftGirlBackgroundRight from '../public/landing/nft-girl-right-background.webp'
import nftGirlBackgroundMiddle from '../public/landing/nft-girl-middle-background.webp'

import nftLeft from '../public/landing/nft-1.webp'
import nftMiddle from '../public/landing/nft-2.webp'
import nftRight from '../public/landing/nft-3.webp'

import { NextPageWithLayout } from './_app'

type ParallaxProps = {
  children: JSX.Element
  offset?: number
}

const Parallax = ({ children, offset = 50 }: ParallaxProps): JSX.Element => {
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight
  // end our animation when we've scrolled the offset specified
  const final = elementTop + offset

  const x = useTransform(scrollY, [initial, final], [offset, -offset])

  useLayoutEffect(() => {
    const element = ref.current

    const onResize = () => {
      if (element) {
        setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset)
        setClientHeight(window.innerHeight)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [ref])

  return (
    <motion.div ref={ref} style={{ x }}>
      {children}
    </motion.div>
  )
}

const Header = () => (
  <div
    className="w-100 py-2.5 px-5  flex max-md:px-2.5 items-center relative z-10 overflow-hidden max-md:flex-col flex-row gap-6"
    style={{
      backgroundColor: '#16131F',
    }}
  >
    <div className="absolute inset-0 bg-top bg-cover -z-10">
      <Image
        src={headerBackground}
        alt="background"
        placeholder="blur"
        style={{
          maxWidth: 'min(100%, 100vw)',
          height: 'auto',
        }}
      />
    </div>

    <div
      className="flex w-full h-full gap-4 "
      style={{
        height: 'clamp(80px, 10vw, 120px)',
      }}
    >
      <div className="flex-1 relative" style={{ height: '100%' }}>
        <Image fill src={logo} alt="header logo" style={{ objectFit: 'contain', objectPosition: 'left' }} />
      </div>
      {/* </div> */}
      <div className="flex h-full items-center gap-8">
        <a href="https://discord.gg/y8f4Man8a7" target="_blank">
          <Image src={'/landing/discord-logo.webp'} width={50} height={50} alt="header logo" />
        </a>

        <a href="https://t.me/Megafans_eSports" target="_blank">
          <Image src={'/landing/telegram-logo.webp'} width={50} height={50} alt="header logo" />
        </a>

        <a href="https://twitter.com/MegafansEsports" target="_blank">
          <Image src={'/landing/twitter-logo.webp'} width={50} height={50} alt="header logo" />
        </a>
      </div>
    </div>
    <div className="flex relative z-0">
      <a
        href="https://megafans.io/wp-content/uploads/2022/06/MS-MegaFans-White-Paper-May-24-2022.pdf"
        target={'_blank'}
        className="px-12 py-7"
        style={{
          minWidth: 280,
          textAlign: 'center',
          fontSize: '1.3111111111111rem',
          lineHeight: 0,
          color: '#B7FFFD',
        }}
      >
        LIGHT PAPER
      </a>
      <Image src={headerButton} className="-z-10" fill alt="header logo" />
    </div>
  </div>
)

const Hero = () => (
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
        <div
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
        </div>

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
            STAKE TO EARN
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
)

const NftMintSection = () => (
  <div
    style={{
      height: '916px',
      marginBottom: 50,
      backgroundImage: 'radial-gradient(at center right, rgba(80, 40, 101, 0.5) 0%, #16131E 68%)',
      backgroundColor: '#16131E',
      opacity: 1,
      transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s;',
    }}
  >
    <div className="flex flex-col pt-24">
      <div style={{ marginBottom: '20px' }}>
        <p
          className="text-center"
          style={{
            color: '#C7FFFD',
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '48px',
            fontFamily: '"Space Grotesk", sans-serif;',
          }}
        >
          NFT MINT
        </p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p
          className="text-center"
          style={{
            color: '#C7FFFD',
            fontSize: '32px',
            fontWeight: 600,
            lineHeight: '32px',
            fontFamily: '"Space Grotesk", sans-serif;',
          }}
        >
          ETHEREUM
        </p>
      </div>
      <div>
        <p
          className="text-center"
          style={{
            color: '#C7FFFD',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '33px',
            fontFamily: '"Space Grotesk", sans-serif;',
          }}
        >
          Available To Open Sea
        </p>
      </div>
    </div>

    <div className="flex mix-blend-lighten align-middle justify-center relative px-44">
      <div className="relative z-0 mb-8">
        <div className="-left-48 absolute -z-10 object-contain top-1/2 -translate-y-1/2 max-lg:-left-36">
          <Parallax offset={75}>
            <Image src={'/landing/leftgun.webp'} height={186} width={208} alt="gun-left" />
          </Parallax>
        </div>

        <Image
          src={'/landing/ethereum.webp'}
          height={481}
          width={650}
          style={{
            objectFit: 'contain',
          }}
          alt="eth-logo"
        />
        <div className="-right-48 absolute -z-10 object-contain top-1/2 -translate-y-1/2 max-lg:-right-36">
          <Parallax offset={-75}>
            <Image src={'/landing/rightgun.webp'} height={186} width={208} alt="gun-left" />
          </Parallax>
        </div>
      </div>
    </div>

    <div
      className="flex justify-center gap-6 max-w-screen-md mx-auto text-center max-sm:flex-wrap"
      style={{
        color: '#B7FFFD',
      }}
    >
      <div className="flex max-sm:basis-full relative z-0 basis-1/2" style={{ maxWidth: 400 }}>
        <a
          href="https://megafans.io/wp-content/uploads/2022/06/MS-MegaFans-White-Paper-May-24-2022.pdf"
          target={'_blank'}
          className="w-full px-14 py-8"
          style={{
            minWidth: 240,
            textAlign: 'center',
            fontSize: '1.3111111111111rem',
            lineHeight: 0,
          }}
        >
          LIGHT PAPER
        </a>
        <Image src={headerButton} className="-z-10" fill alt="header logo" />
      </div>

      <div className="flex  max-sm:basis-full relative z-0 basis-1/2" style={{ maxWidth: 400 }}>
        <a
          href="https://www.premint.xyz/MegaFans/"
          target={'_blank'}
          className="w-full px-14 py-8"
          style={{
            minWidth: 240,
            textAlign: 'center',
            fontSize: '1.3111111111111rem',
            lineHeight: 0,
          }}
        >
          LAUNCH March 15
        </a>
        <Image src={headerButton} className="-z-10" fill alt="header logo" />
      </div>
    </div>
  </div>
)

const TeamSection = () => (
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
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
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

const RoadmapSection = () => (
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

const NftsSection = () => {
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

const TournamentSection = () => (
  <div
    className="py-24"
    style={{
      background: 'linear-gradient(180deg, #232B50 0%, #19132A 100%)',
    }}
  >
    <div className="flex flex-col gap-20 px-5">
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
    </div>
  </div>
)

const StatsSection = () => {
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

const DiscordSection = () => (
  <AnimatePresence>
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="p-24 z-0 max-lg:p-6"
      style={{
        background: 'linear-gradient(180deg, #19132A 0%, #242E56 100%)',
        color: '#C7FFFD',
        fontFamily: '"Space Grotesk", sans-serif;',
      }}
    >
      <div className="relative z-0">
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
              href="https://discord.gg/y8f4Man8a7"
              target="_blank"
              className="px-20 block py-16 font-semibold text-xl leading-loose max-md:px-10 max-md:py-6"
            >
              DISCORD
            </a>
            <Image src={lightLightingButton} fill alt="light-button-background" className="object-contain -z-10" />
          </div>
        </div>
        <Image src={discordBackground} fill alt="discord-section-background" className="object-contain -z-10" />
      </div>
    </motion.div>
  </AnimatePresence>
)

const Footer = () => (
  <footer
    className="bg-no-repeat bg-cover mt-auto relative z-10"
    style={{
      background: 'linear-gradient(180deg, #242E56 0%, #2B3E6E 100%)',
    }}
    aria-labelledby="footer-heading"
  >
    <Container>
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <Logo />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-xl font-medium text-white">Quick Link</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation?.quick.map(({ id, name, href }) => (
                  <li key={id}>
                    <a href={href} className={clsx(['text-base text-white relative', 'link'])}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-xl font-medium text-white">Support</h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation?.resources.map(({ id, name, href }) => (
                  <li key={id}>
                    <a href={href} className={clsx(['text-base text-white relative', 'link'])}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-1 md:gap-4">
            <h3 className="text-3xl font-medium text-white leading-none inline-flex items-center">
              We accept following payment systems
            </h3>
            <PaymentButtons />
          </div>
        </div>
      </div>
      <Copyright
        text={
          <span>
            © 2023
            <a
              href="https://megafans.com/"
              target="_blank"
              rel="noreferrer"
              className={clsx(['relative ml-1', 'link'])}
            >
              Megafans
            </a>
            . All rights reserved.
          </span>
        }
      />
    </Container>
  </footer>
)

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="relative"
        style={{
          fontFamily: '"Space Grotesk", sans-serif;',
          textDecorationLine: 'none',
          textDecorationColor: '#B7FFFD',
          textDecorationStyle: 'solid',
          textDecorationThickness: 'auto',
        }}
      >
        <Header />
        <Hero />

        {/* <AboutSection /> */}

        <NftMintSection />

        <TeamSection />

        <RoadmapSection />

        <NftsSection />

        <TournamentSection />

        <StatsSection />

        <DiscordSection />

        <Footer />
      </main>
    </>
  )
}

export default Page
