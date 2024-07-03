import { motion, useMotionValue } from "framer-motion"
import { useEffect } from "react"


export interface LetterBlockProps {
  children: React.ReactNode
}

export const LetterBlock = ({
  children
}: LetterBlockProps) => {
  const positionY = useMotionValue(0)

  useEffect(() => {
    function animate(time: number) {
      const value = positionY.get()
      const newValue = value + 1  
    
      positionY.set(newValue)


      const maxValue = window.innerHeight - 20;

      if (newValue > maxValue) {

      } else {
        requestAnimationFrame(animate)
      }

    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <motion.div
      className="max-w-[600px] text-center"
      style={{
        top: positionY,
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
      }}
    >
      {children}
    </motion.div>
  )
}