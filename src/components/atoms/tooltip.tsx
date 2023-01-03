import { ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { useMounted } from '@/hooks'

import 'react-tooltip/dist/react-tooltip.css'

type TooltipProps = {
  children: ReactNode
  place: 'top' | 'bottom' | 'left' | 'right'
  id: string
}

export const Tooltip = ({ children, place = 'top', id }: TooltipProps) => {
  const mounted = useMounted()

  return (
    <>
      {mounted && (
        <ReactTooltip anchorId={id} place={place} delayHide={200} delayShow={300} isOpen>
          {children}
        </ReactTooltip>
      )}
    </>
  )
}
