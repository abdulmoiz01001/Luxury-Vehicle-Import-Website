import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import PageTransition from '../components/animations/PageTransition'
import ScrollToTop from '../hooks/ScrollToTop'

const MainLayout = () => {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const targetId = location.hash.replace('#', '')
    const target = document.getElementById(targetId)
    if (!target) return

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-slate-50">
      <ScrollToTop />
      <Header />
      <main>
        <PageTransition routeKey={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
