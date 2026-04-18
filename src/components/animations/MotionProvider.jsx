import { LazyMotion, domAnimation } from 'framer-motion'

const MotionProvider = ({ children }) => <LazyMotion features={domAnimation}>{children}</LazyMotion>

export default MotionProvider
