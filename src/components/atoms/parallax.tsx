import { motion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'

type ParallaxProps = {
  children: JSX.Element
  offset?: number
}

export const Parallax = ({ children, offset = 50 }: ParallaxProps): JSX.Element => {
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()

  const initial = elementTop - clientHeight
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
