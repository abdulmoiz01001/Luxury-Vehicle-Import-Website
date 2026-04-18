import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { pageFade } from './variants'

const PageTransition = ({ routeKey, children }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div key={routeKey} variants={pageFade} initial="initial" animate="animate" exit="exit">
        {children}
      </m.div>
    </AnimatePresence>
  )
}

export default PageTransition
