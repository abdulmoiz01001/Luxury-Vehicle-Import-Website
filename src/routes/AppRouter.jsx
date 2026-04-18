import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import BrandLoader from '../components/animations/BrandLoader'

const HomePage = lazy(() => import('../pages/HomePage'))
const VehicleListingPage = lazy(() => import('../pages/VehicleListingPage'))
const VehicleDetailPage = lazy(() => import('../pages/VehicleDetailPage'))
const CompareVehiclesPage = lazy(() => import('../pages/CompareVehiclesPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ComplaintPage = lazy(() => import('../pages/ComplaintPage'))
const SubmitReceiptPage = lazy(() => import('../pages/SubmitReceiptPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'vehicles', element: <VehicleListingPage /> },
      { path: 'vehicle/:slug', element: <VehicleDetailPage /> },
      { path: 'compare', element: <CompareVehiclesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'complaint', element: <ComplaintPage /> },
      { path: 'submit-receipt', element: <SubmitReceiptPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

const AppRouter = () => (
  <Suspense fallback={<BrandLoader />}>
    <RouterProvider router={router} />
  </Suspense>
)

export default AppRouter
