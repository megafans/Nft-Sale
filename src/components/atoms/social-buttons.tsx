import Image from 'next/image'
import Ink from 'react-ink'

import { blurDataUrl, socialButtons } from '@/helpers/constants'

export const SocialButtons = () => {
  return (
    <div className="flex mr-2 mt-4 md:mr-8 md:mt-0">
      {socialButtons.map(({ id, src, alt }) => (
        <div className="relative cursor-pointer ml-4 rounded-full bg-white/10" key={id}>
          <Ink radius={50} opacity={0.5} />
          <Image src={src} alt={alt} width={48} height={48} blurDataURL={blurDataUrl} priority />
        </div>
      ))}
    </div>
  )
}
