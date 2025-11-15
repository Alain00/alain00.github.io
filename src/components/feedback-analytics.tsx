import { useFeedbackStore } from '@/zustand/feedback-store'
import { Button } from './ui/button'
import { BarChart3, MessageSquare, Star, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export const FeedbackAnalytics = () => {
  const { feedbacks, getFeedbackStats } = useFeedbackStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const stats = getFeedbackStats()

  if (feedbacks.length === 0) {
    return null
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      bug: 'Bug Report',
      feature: 'Feature Request',
      improvement: 'Improvement',
      other: 'Other',
    }
    return labels[type] || type
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      bug: 'text-red-400',
      feature: 'text-blue-400',
      improvement: 'text-green-400',
      other: 'text-purple-400',
    }
    return colors[type] || 'text-gray-400'
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="outline"
        size="lg"
        className="rounded-full shadow-lg"
        title="View Feedback Analytics"
      >
        <BarChart3 className="w-5 h-5 mr-2" />
        Analytics ({stats.total})
      </Button>

      {isExpanded && (
        <div className="absolute bottom-16 left-0 w-[600px] max-h-[600px] bg-card border rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="text-lg font-pixel font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Feedback Analytics
            </h3>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[500px]">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Total Feedback
                  </span>
                </div>
                <div className="text-2xl font-bold font-pixel">
                  {stats.total}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">
                    Avg Rating
                  </span>
                </div>
                <div className="text-2xl font-bold font-pixel">
                  {stats.averageRating.toFixed(1)}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-muted-foreground">
                    Most Common
                  </span>
                </div>
                <div className="text-sm font-pixel">
                  {Object.entries(stats.byType).sort(
                    ([, a], [, b]) => b - a
                  )[0]?.[0] || 'N/A'}
                </div>
              </div>
            </div>

            {/* Feedback by Type */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">By Type</h4>
              <div className="space-y-2">
                {Object.entries(stats.byType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className={`text-sm ${getTypeColor(type)}`}>
                      {getTypeLabel(type)}
                    </span>
                    <span className="text-sm font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Feedback */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Recent Feedback</h4>
              <div className="space-y-3">
                {feedbacks.slice(-5).reverse().map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-muted/50 rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {feedback.name && (
                            <span className="text-sm font-semibold">
                              {feedback.name}
                            </span>
                          )}
                          <span className={`text-xs ${getTypeColor(feedback.type)}`}>
                            {getTypeLabel(feedback.type)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {feedback.message}
                        </p>
                      </div>
                      <div className="flex gap-0.5 ml-2">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(feedback.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t bg-muted/50">
            <Button
              onClick={() => setIsExpanded(false)}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
