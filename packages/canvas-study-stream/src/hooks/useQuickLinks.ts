import React, { useState, useCallback, useEffect } from 'react'
import { QuickLink, QuickLinksAction, ReadonlyQuickLink } from '../types'

/**
 * Hook for managing quick links with localStorage persistence
 * Handles adding, removing, and persisting quick links
 */
export function useQuickLinks(initialLinks: readonly ReadonlyQuickLink[] = []) {
  const [links, setLinks] = useState<readonly ReadonlyQuickLink[]>(initialLinks)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load links from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('canvas-study-stream-quick-links')
      if (stored) {
        const parsed = JSON.parse(stored) as QuickLink[]
        setLinks(parsed)
      }
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load links')
      setIsLoading(false)
    }
  }, [])

  // Save links to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('canvas-study-stream-quick-links', JSON.stringify(links))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save links')
      }
    }
  }, [links, isLoading])

  /**
   * Reducer function for handling quick links actions
   */
  const dispatch = useCallback((action: QuickLinksAction) => {
    switch (action.type) {
      case 'ADD_LINK': {
        setLinks((prev) => {
          const exists = prev.some((link) => link.id === action.payload.id)
          if (exists) {
            setError('Link with this ID already exists')
            return prev
          }
          return [...prev, action.payload]
        })
        break
      }
      case 'REMOVE_LINK': {
        setLinks((prev) => prev.filter((link) => link.id !== action.payload))
        setError(null)
        break
      }
      case 'SET_LINKS': {
        setLinks(action.payload)
        setError(null)
        break
      }
      case 'SET_ERROR': {
        setError(action.payload)
        break
      }
      default:
        break
    }
  }, [])

  return {
    links,
    isLoading,
    error,
    dispatch,
    addLink: (link: QuickLink) => dispatch({ type: 'ADD_LINK', payload: link }),
    removeLink: (linkId: string) => dispatch({ type: 'REMOVE_LINK', payload: linkId }),
    setLinks: (newLinks: readonly QuickLink[]) => dispatch({ type: 'SET_LINKS', payload: newLinks }),
    setError: (err: string | null) => dispatch({ type: 'SET_ERROR', payload: err })
  }
}

export default useQuickLinks
