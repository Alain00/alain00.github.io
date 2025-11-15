import { MessageSquare } from 'lucide-react'
import { useFeedbackStore } from '@/zustand/feedback-store'
import { Button } from './ui/button'

export const FeedbackButton = () => {
  const setIsOpen = useFeedbackStore((state) => state.setIsOpen)

  return (
    <Button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg"
      size="lg"
      title="Send Feedback"
    >
      <MessageSquare className="w-5 h-5 mr-2" />
      Feedback
    </Button>
  )
}
