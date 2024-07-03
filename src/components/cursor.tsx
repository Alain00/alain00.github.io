import { useCursorStore } from "@/zustand/cursor-store"
import { cx } from "class-variance-authority"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"


export interface CursorProps {

}

export const Cursor = ({

}: CursorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const state = useCursorStore(store => store.state)
  const [active, setActive] = useState(false)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!ref.current) return
      if (state === 'full-expand') {
        return
      }
      ref.current.style.left = `${e.clientX - ref.current.clientWidth/2}px`
      ref.current.style.top = `${e.clientY - ref.current.clientHeight/2}px`
    }
    
    document.body.addEventListener('pointermove', onMouseMove)
    document.addEventListener('mousedown', () => setActive(true))
    document.addEventListener('mouseup', () => setActive(false))

    return () => {
      document.body.removeEventListener('pointermove', onMouseMove)
    }
  }, [state])

  const handleMouseDown = () => {
    setActive(true)
  }

  const handleMouseUp = () => {
    setActive(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={cx(
        "w-[200px] h-[200px] rounded-full backdrop-invert fixed z-50"
      )}
      style={{
        pointerEvents: 'none',
      }}
      animate={{
        scale: (state === 'full-expand') ? 10 : (active || state === 'expand') ? 2 : 0.95
      }}
    >

    </motion.div>
  )
}
