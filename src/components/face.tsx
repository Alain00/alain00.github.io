import { motion, type Variants } from "framer-motion"
import { useEffect, useState } from "react"


export interface FaceProps {

}

const eyesVariants: Variants = {
  close: {
    y: 5.6,
    height: 0,
    width: 0.6
  },
  open: {
    y: 5,
    height: 0.6,
    width: 0.6
  }
}

export const Face = ({}: FaceProps) => {
  const [eyesState, setEyesState] = useState('open')


  const toggleEyes = (state: string) => {
    setEyesState(state)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      toggleEyes('close')

      setTimeout(() => {
        toggleEyes('open')
      }, 500)
      
    }, Math.random() * 4000 + 500)

    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 12.7 12.7"
      version="1.1"
      className="relative z-50 fill-background stroke-background"
      id="svg1"
    >
      <g
        id="layer1">
        
        <motion.rect
          style={{strokeWidth: 0.264583 }}
          id="rect1"
          width="1"
          variants={eyesVariants}
          animate={eyesState}
          x="2.1577501"
          // y="5.0231566" 
          />
        <motion.rect
          style={{strokeWidth: 0.264583 }}
          id="rect1-5"
          width="1"
          variants={eyesVariants}
          animate={eyesState}
          x="8.6706848"
          // y="5.1072135" 
          />
        <path
          style={{ fill: 'none', strokeWidth: 0.464583, strokeOpacity: 1 }}
          d="
            m 1.6570978,8.8396327 
            c 
              0,0 
              0.9881717,1.5246783 
              4.417846,1.5197643 
              2.9569278,-0.0042 
              3.9819272,-1.3984224 
              3.9819272,-1.3984224
          "
          id="path1" />
      </g>
    </svg>
  )
}