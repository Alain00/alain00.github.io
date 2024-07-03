import { Vector2 } from "@/utils/vector"
import { useCursorStore } from "@/zustand/cursor-store"
import { motion, useMotionValue } from "framer-motion"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type Ref, type RefObject } from "react"



export interface LetterProps {
  children?: React.ReactNode
}

export interface LetterRef {
  container: RefObject<HTMLSpanElement>
  destroy: () => void
}

export const Letter = forwardRef<LetterRef, LetterProps>(({
  children
}, ref) => {
  const cursorStore = useCursorStore();
  // const [lastKnowMousePosition, setLastKnowMousePosition] = useState<Vector2>(new Vector2(0, 0))
  const container = useRef<HTMLSpanElement>(null)
  const positionX = useMotionValue(0)
  const positionY = useMotionValue(0)
  const [positionYState, setPositionYState] = useState(0)
  const [positionXState, setPositionXState] = useState(0)
  const requestId = useRef<number | null>(null)
  const translateX = useMotionValue(0)
  const translateY = useMotionValue(0)

  useEffect(() => {
    let lastKnowMousePosition = new Vector2(0, 0)

    function onMouseMove(e: MouseEvent) {
      const mousePosition = new Vector2(e.clientX, e.clientY)
      lastKnowMousePosition = mousePosition
    }

    function animate(time: number) {
      if (!container.current) return
  
      const rect = container.current.getBoundingClientRect()
      const containerPostion = new Vector2(rect.left + rect.width/2, rect.top + rect.height/2)
  

      // const direction = Vector2.direction(containerPostion, lastKnowMousePosition);
      const distance = Vector2.distance(containerPostion, lastKnowMousePosition)


      const shouldFlick = cursorStore.state !== 'full-expand'
      const randomValue = shouldFlick ? (Math.random() * 0.5) : 0
      let actualPosition = new Vector2(
        randomValue * distance/(window.innerWidth/10),
        randomValue * distance/(window.innerHeight/10),
      )
      
  
      // actualPosition = actualPosition.add(
      //   direction.multiply(-40)
      // )
  
      // if (actualPosition.magnitude() <= 10) {
        positionX.set(actualPosition.x)
        positionY.set(actualPosition.y)
      // }
  
  
      requestId.current = requestAnimationFrame(animate)
    }

    document.body.addEventListener('mousemove', onMouseMove)
    requestId.current = requestAnimationFrame(animate)

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(requestId.current ?? 0)
    }
  }, [cursorStore.state])


  const destroy = () => {
    container.current?.remove()
  }

  useImperativeHandle(ref, () => ({
    container,
    destroy
  }), [])

  return (
    <motion.span ref={container}  style={{
      display: 'inline-block',
      
      translateY: positionY,
      translateX: positionX,
      marginLeft: '0.2em',
      marginRight: '0.2em'
    }}>
      {children}
    </motion.span>
  )
})