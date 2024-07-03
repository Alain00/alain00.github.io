import Image from "astro/components/Image.astro"
import { forwardRef, useEffect, useImperativeHandle, useRef, type RefObject } from "react"
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion"
import { useLetterStore } from "@/zustand/letter-store"

const springOptions: SpringOptions = {
  // damping: 10,
  // stiffness: 10,
  bounce: 0.1,
}

export interface ShipProps {
  show: boolean
}

export interface ShipRef {
  container: RefObject<HTMLDivElement>
}

export const Ship = forwardRef<ShipRef, ShipProps>(({
  show
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const setShip = useLetterStore(state => state.setShip)

  useImperativeHandle(ref, () => ({
    container: containerRef
  }), [])

  const mousePositionX = useMotionValue(0)
  const mousePositionY = useMotionValue(0)
  const opacity = useMotionValue(0)

  const mousePositionXSpring = useSpring(mousePositionX, springOptions)
  const mousePositionYSpring = useSpring(mousePositionY, springOptions)

  useEffect(() => {
    document.body.onmousemove = (e) => {
      mousePositionX.set(e.clientX - 16)
      mousePositionY.set(e.clientY - 16)
    }
  }, [])

  useEffect(() => {
    if (show) {
      opacity.set(1)
    } else {
      opacity.set(0)
    }
  }, [show])

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: mousePositionYSpring,
        left: mousePositionXSpring,
        opacity: opacity,
        pointerEvents: 'none'
      }}
    >
      <img
        src={'/ship.svg'}
        alt={'ship'}
        width={30}
        height={30}
      />
    </motion.div>
  )
})