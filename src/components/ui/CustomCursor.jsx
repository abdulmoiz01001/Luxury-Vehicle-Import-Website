import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

const isInteractive = (target) => target?.closest?.('a, button, [role="button"], input, textarea, select')

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.45 })
  const dotX = useSpring(x, { stiffness: 520, damping: 35, mass: 0.26 })
  const dotY = useSpring(y, { stiffness: 520, damping: 35, mass: 0.26 })

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(media.matches && !reduce.matches)
    update()
    media.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      media.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setActive(Boolean(isInteractive(event.target)))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <m.div
        className="custom-cursor custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: active ? (pressed ? 1.45 : 1.85) : (pressed ? 0.86 : 1),
          opacity: active ? 1 : 0.72,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      />
      <m.div
        className="custom-cursor custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: pressed ? 0.8 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 560, damping: 34 }}
      />
    </>
  )
}

export default CustomCursor
