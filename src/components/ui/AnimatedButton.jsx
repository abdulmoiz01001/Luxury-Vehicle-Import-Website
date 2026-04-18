import { m } from 'framer-motion'
import clsx from 'clsx'
import { buttonSpring } from '../animations/variants'

const AnimatedButton = ({
  as: Component = 'button',
  className,
  children,
  hoverScale = 1.05,
  tapScale = 0.95,
  ...props
}) => {
  const MotionComponent = m(Component)

  return (
    <MotionComponent
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={buttonSpring}
      className={clsx('animated-btn', className)}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimatedButton
