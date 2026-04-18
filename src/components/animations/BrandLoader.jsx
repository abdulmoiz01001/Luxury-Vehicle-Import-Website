import { m } from 'framer-motion'

const BrandLoader = ({ exiting = false }) => (
  <m.div
    className="app-loader"
    initial={{ opacity: 1 }}
    animate={{ opacity: exiting ? 0 : 1 }}
    transition={{ duration: 0.35 }}
  >
    <m.img
      src="/assets/logo-white.svg"
      alt="Bhinder Corporation"
      className="app-loader-logo"
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: [1, 1.04, 1], y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: 'mirror' }}
    />
  </m.div>
)

export default BrandLoader
