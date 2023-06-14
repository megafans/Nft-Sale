import Image from 'next/image'

import { Parallax } from '@/components'
import headerButton from '@/landing/button.webp'

export const LandingNftMintSection = () => (
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
          }}
        >
          ETHEREUM
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
          href="https://www.megafans.io/MS-MegaFans-White-Paper-May-24-2022.pdf"
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
          Launch Coming Soon
        </a>
        <Image src={headerButton} className="-z-10" fill alt="header logo" />
      </div>
    </div>
  </div>
)
