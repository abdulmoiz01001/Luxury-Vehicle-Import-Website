import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { CompareProvider } from './context/CompareContext'
import MotionProvider from './components/animations/MotionProvider'
import CustomCursor from './components/ui/CustomCursor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CompareProvider>
        <MotionProvider>
          <CustomCursor />
          <App />
        </MotionProvider>
        <Toaster position="top-right" />
      </CompareProvider>
    </HelmetProvider>
  </StrictMode>,
)
