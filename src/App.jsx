import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AppRouter from './routes/AppRouter'
import BrandLoader from './components/animations/BrandLoader'

const App = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timer = window.setTimeout(() => setLoading(false), 900)
		return () => window.clearTimeout(timer)
	}, [])

	return (
		<>
			<AnimatePresence>{loading ? <BrandLoader key="brand-loader" /> : null}</AnimatePresence>
			{!loading ? <AppRouter /> : null}
		</>
	)
}

export default App
