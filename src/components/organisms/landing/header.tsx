import Image from 'next/image'

import headerBackground from '@/landing/celebration.webp'
import headerButton from '@/landing/button.webp'
import logo from '@/landing/megafans-header.webp'

export const LandingHeader = () => (
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
        href="MS-MegaFans-White-Paper-May-24-2022.pdf"
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
