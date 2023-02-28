import Image from 'next/image'
import Ink from 'react-ink'

import { blurDataUrl, socialButtons } from '@/helpers/constants'
import { ButtonLink } from './button-link'

export const SocialButtons = () => {
  return (
    <div className="flex mr-2 mt-4 md:mr-8 md:mt-0">
      {socialButtons.map(({ id, src, alt, href }) => (
        <ButtonLink key={id} variant="transparent" size="sm" href={href}>
          <div className="relative cursor-pointer rounded-full bg-white/10">
            <Ink radius={50} opacity={0.5} />
            <Image src={src} alt={alt} width={48} height={48} blurDataURL={blurDataUrl} priority />
          </div>
        </ButtonLink>
      ))}
    </div>
  )
}
