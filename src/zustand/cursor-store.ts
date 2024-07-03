import { create } from "zustand";

export type CursorState = 'default' | 'expand' | 'full-expand'

export interface CursorStore {
  state: CursorState,
  setState: (state: CursorState) => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  state: 'default',
  setState: (state) => set({ state })
}))