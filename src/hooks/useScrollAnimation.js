import { useMemo } from 'react'

const useScrollAnimation = ({ amount = 0.2, once = true, y = 40, duration = 0.6 } = {}) => {
  return useMemo(
    () => ({
      viewport: { once, amount },
      initial: { opacity: 0, y },
      whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [amount, once, y, duration],
  )
}

export default useScrollAnimation
