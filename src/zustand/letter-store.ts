import type { LetterRef } from "@/components/letter";
import type { ShipRef } from "@/components/ship";
import type { ReactElement, Ref, RefObject } from "react";
import { create } from "zustand";


export interface LetterStore {
  renderComponents: ReactElement[]
  rootElement: ReactElement | null
  letters: RefObject<LetterRef>[],
  shots: ReactElement[],
  ship: RefObject<ShipRef> | null,
  addRenderComponent: (component: ReactElement) => void
  setRootElement: (element: ReactElement) => void

  addShot: (shot: ReactElement) => void
  addLetter: (letter: RefObject<LetterRef>) => void
  setShip: (ship: RefObject<ShipRef> | null) => void
}

export const useLetterStore = create<LetterStore>((set) => ({
  renderComponents: [],
  rootElement: null,
  letters: [],
  shots: [],
  ship: null,
  addRenderComponent: (component: ReactElement) => set((state) => ({
    renderComponents: [...state.renderComponents, component]
  })),
  setRootElement: (element: ReactElement) => set(() => ({
    rootElement: element
  })),
  addShot: (shot: ReactElement) => set((state) => ({
    shots: [...state.shots, shot]
  })),
  addLetter: (letter: RefObject<LetterRef>) => set((state) => ({
    letters: [...state.letters, letter]
  })),
  setShip: (ship: RefObject<ShipRef> | null) => set(() => ({
    ship: ship
  }))
}))