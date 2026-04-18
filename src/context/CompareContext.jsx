import { createContext, useContext, useMemo, useState } from 'react'

const CompareContext = createContext(null)

export const CompareProvider = ({ children }) => {
  const [selectedSlugs, setSelectedSlugs] = useState([])

  const normalizeSelection = (slugs = []) => {
    const unique = Array.from(new Set(slugs.filter(Boolean)))
    return unique.slice(0, 3)
  }

  const toggleCompare = (slug) => {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug)
      }
      if (current.length >= 3) {
        return current
      }
      return [...current, slug]
    })
  }

  const clearCompare = () => setSelectedSlugs([])

  const setCompareSelection = (slugs) => {
    setSelectedSlugs(normalizeSelection(slugs))
  }

  const value = useMemo(
    () => ({ selectedSlugs, toggleCompare, clearCompare, setCompareSelection }),
    [selectedSlugs],
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export const useCompare = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider')
  }
  return context
}
