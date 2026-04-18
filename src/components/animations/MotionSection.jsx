import { m, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from './variants'

const MotionSection = ({
  as: Component = 'section',
  className,
  children,
  stagger = false,
  amount = 0.34,
  margin = '0px 0px -12% 0px',
}) => {
  const prefersReducedMotion = useReducedMotion()
  const MotionComponent = m(Component)

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <MotionComponent
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin }}
    >
      {children}
    </MotionComponent>
  )
}

export default MotionSection
