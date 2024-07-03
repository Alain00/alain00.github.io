// import { useLetterStore } from "@/zustand/letter-store"
// import { useEffect, useRef, useState } from "react"


// export interface GameManagerProps {
//   children: React.ReactNode
// }

// export const GameManager = ({
//   children
// }: GameManagerProps) => {
//   const [loopIndex, setLoopIndex] = useState(0)
//   // const letters = useRef(useLetterStore.getState().letters)

//   const gameLoop = (time: number) => {
//     const {letters, ship} = useLetterStore.getState();
//     let index = 0;
//     for (const letter of letters) {
      
//       index++;
//     }
    
//     window.requestAnimationFrame(gameLoop)
//   }

//   // useEffect(() => useLetterStore.subscribe((state) => {
//   //   letters.current = state.letters
//   // }), [])

//   useEffect(() => {
//     window.requestAnimationFrame(gameLoop)
//   }, [])

//   return (
//     <>
//       {children}
//     </>
//   )
// }