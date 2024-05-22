import useTryOnOutfitAIStore from '@/store/tryOnAIStore'
import { useEffect } from 'react'

const useProgress = (start: boolean, duration: number, target: number) => {
  const { progressPercent, setProgressPercent } = useTryOnOutfitAIStore(
    (state) => state,
  )
  const updateInterval = 100 // Cập nhật mỗi 100ms
  const steps = duration / updateInterval
  const baseIncrement = target / steps

  useEffect(() => {
    if (!start || progressPercent >= target) return

    const interval = setInterval(() => {
      const randomFactor = Math.random() * 0.85 + 0.75 // Ngẫu nhiên từ 0.75 đến 1.25
      const increment = baseIncrement * randomFactor
      const nextProgress = progressPercent + increment

      setProgressPercent(nextProgress >= target ? target : nextProgress)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [start, progressPercent, target, baseIncrement, updateInterval])

  return { progressPercent }
}

export default useProgress
