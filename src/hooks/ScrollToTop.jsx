import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    // Refresh ScrollTrigger only if GSAP is present in the project.
    import('gsap/ScrollTrigger')
      .then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh()
      })
      .catch(() => {
        // No-op when GSAP is not configured.
      })
  }, [pathname, hash])

  return null
}

export default ScrollToTop