import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Feedback {
  id: string
  name: string
  email: string
  type: 'bug' | 'feature' | 'improvement' | 'other'
  message: string
  rating: number
  timestamp: number
}

interface FeedbackState {
  feedbacks: Feedback[]
  isOpen: boolean
  addFeedback: (feedback: Omit<Feedback, 'id' | 'timestamp'>) => void
  setIsOpen: (isOpen: boolean) => void
  getFeedbackStats: () => {
    total: number
    averageRating: number
    byType: Record<string, number>
  }
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      feedbacks: [],
      isOpen: false,
      addFeedback: (feedback) => {
        const newFeedback: Feedback = {
          ...feedback,
          id: `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          timestamp: Date.now(),
        }
        set((state) => ({
          feedbacks: [...state.feedbacks, newFeedback],
        }))
      },
      setIsOpen: (isOpen) => set({ isOpen }),
      getFeedbackStats: () => {
        const feedbacks = get().feedbacks
        const total = feedbacks.length
        const averageRating =
          total > 0
            ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / total
            : 0
        const byType = feedbacks.reduce((acc, f) => {
          acc[f.type] = (acc[f.type] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        return { total, averageRating, byType }
      },
    }),
    {
      name: 'portfolio-feedback-storage',
    }
  )
)
