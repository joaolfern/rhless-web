import React, { useState } from 'react'
import { SwipeDirections, SwipeEventData, useSwipeable } from 'react-swipeable'

interface IUseSwipeDistance {
  direction: SwipeDirections
  onSwiping?: (eventData: SwipeEventData) => void
  onSwiped?: (eventData: SwipeEventData) => void
}

function useSwipeDistance ({ direction, onSwiping, onSwiped }: IUseSwipeDistance) {
  const [swipedDistance, setSwipedDistance] = useState(0)

  const handlers = useSwipeable({
    onSwiping: eventData => {
      if (eventData.dir !== direction) return

      onSwiping?.(eventData)
      const { deltaX } = eventData
      const windowWidth = window.innerWidth

      const leftDistance = (0 + deltaX) / (windowWidth * 0.7)

      setSwipedDistance(leftDistance)
    },
    onSwiped: eventData => {
      setSwipedDistance(0)
      onSwiped?.(eventData)
    }
  })

  return {
    handlers,
    swipedDistance
  }
}

export default useSwipeDistance
