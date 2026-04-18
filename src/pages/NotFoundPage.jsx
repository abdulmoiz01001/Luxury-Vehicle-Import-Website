import { Link } from 'react-router-dom'
import Seo from '../seo/Seo'

const NotFoundPage = () => (
  <>
    <Seo title="Page Not Found" description="The requested page could not be found on Bhinder Corporation Ltd website." path="/404" />
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">404 Error</p>
        <h1 className="mt-3 text-5xl font-black text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you requested does not exist or was moved.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">Back to Home</Link>
      </div>
    </section>
  </>
)

export default NotFoundPage
