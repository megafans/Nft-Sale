import Image from 'next/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import { ButtonLink, User } from '@/components'
import { useUser } from '@/hooks'
import headerBackground from '@/landing/celebration.webp'
import headerButton from '@/landing/button.webp'
import logo from '@/landing/megafans-header.webp'

export const LandingHeader = () => {
  const { user } = useUser()

  return (
    <div
      className="w-100 py-2.5 px-5 flex max-md:px-2.5 items-center relative z-2 max-md:flex-col flex-row gap-6"
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
        className="flex w-full h-full gap-4"
        style={{
          height: 'clamp(80px, 10vw, 120px)',
        }}
      >
        <div className="flex-1 relative" style={{ height: '100%' }}>
          <Image fill src={logo} alt="header logo" style={{ objectFit: 'contain', objectPosition: 'left' }} />
        </div>
        {/* </div> */}
        <div className="flex h-full items-center gap-8">
          <a href="https://discord.com/invite/megfansnfts" target="_blank">
            <Image src={'/landing/discord-logo.webp'} width={50} height={50} alt="header logo" />
          </a>

          <a href="https://t.me/Megafans_eSports" target="_blank">
            <Image src={'/landing/telegram-logo.webp'} width={50} height={50} alt="header logo" />
          </a>

          <a href="https://twitter.com/MegafansNFTs" target="_blank">
            <Image src={'/landing/twitter-logo.webp'} width={50} height={50} alt="header logo" />
          </a>
        </div>
      </div>
      <div className="flex relative z-0">
        <a
          href="https://linktr.ee/MegaFans_esports"
          target={'_blank'}
          className="px-12 py-7"
          style={{
            minWidth: 160,
            textAlign: 'center',
            fontSize: '1.3111111111111rem',
            lineHeight: 0,
            color: '#B7FFFD',
          }}
        >
          LINKTREE
        </a>
        <Image
          src={headerButton}
          className="-z-10"
          fill
          alt="header logo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex relative z-0">
        <a
          href="MS-MegaFans-White-Paper-May-24-2022.pdf"
          target={'_blank'}
          className="px-12 py-7"
          style={{
            minWidth: 250,
            textAlign: 'center',
            fontSize: '1.3111111111111rem',
            lineHeight: 0,
            color: '#B7FFFD',
          }}
        >
          LIGHT PAPER
        </a>
        <Image
          src={headerButton}
          className="-z-10"
          fill
          alt="header logo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {user?.username ? (
        <User user={user} />
      ) : (
        <ButtonLink href="/sign-in" variant="primary" size="lg" ribbon>
          <span>Login</span>
          <ArrowLongRightIcon className="w-6 h-6 ml-10" />
        </ButtonLink>
      )}
    </div>
  )
}
