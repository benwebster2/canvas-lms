import React, { useState, useRef } from 'react'
import { ReadonlyQuickLink, OnQuickLinkClick, OnQuickLinksUpdate, QuickLink } from '../types'
import '../styles/QuickLinksSelector.css'

/**
 * QuickLinksSelector Component Props
 */
export interface QuickLinksSelectorProps {
  /** Array of available quick links */
  readonly links: readonly ReadonlyQuickLink[]
  /** Called when a link is clicked */
  readonly onLinkClick: OnQuickLinkClick
  /** Called when a link is added */
  readonly onAddLink?: (link: QuickLink) => void
  /** Called when a link is removed */
  readonly onRemoveLink?: (linkId: string) => void
  /** Called when links list is updated */
  readonly onUpdate?: OnQuickLinksUpdate
  /** Maximum number of links allowed (default: 10) */
  readonly maxLinks?: number
}

/**
 * QuickLinksSelector Component
 * 
 * Displays and manages quick links for accessing music libraries and resources.
 * Features: display links, open in new tab, add/remove links, persist to localStorage.
 * 
 * Implements Issue #1 with:
 * - [x] Render quick links as buttons
 * - [x] Handle link clicks (open in new tab)
 * - [x] Add link functionality
 * - [x] Remove link functionality
 * - [x] Persist to localStorage
 * - [x] Keyboard navigation support
 * - [x] Accessible with ARIA labels
 */
export const QuickLinksSelector: React.FC<QuickLinksSelectorProps> = ({
  links,
  onLinkClick,
  onAddLink,
  onRemoveLink,
  onUpdate,
  maxLinks = 10
}) => {
  const [isAddingLink, setIsAddingLink] = useState(false)
  const [newLinkLabel, setNewLinkLabel] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputLabelRef = useRef<HTMLInputElement>(null)
  const inputUrlRef = useRef<HTMLInputElement>(null)

  /**
   * Handle link click - open in new tab and notify parent
   */
  const handleLinkClick = (link: ReadonlyQuickLink) => {
    window.open(link.url, '_blank', 'noopener,noreferrer')
    onLinkClick(link)
  }

  /**
   * Validate and add new link
   */
  const handleAddLink = () => {
    setError(null)

    // Validation
    if (!newLinkLabel.trim()) {
      setError('Link label is required')
      inputLabelRef.current?.focus()
      return
    }

    if (!newLinkUrl.trim()) {
      setError('Link URL is required')
      inputUrlRef.current?.focus()
      return
    }

    // Validate URL format
    try {
      new URL(newLinkUrl)
    } catch {
      setError('Please enter a valid URL')
      inputUrlRef.current?.focus()
      return
    }

    // Check max links limit
    if (links.length >= maxLinks) {
      setError(`Maximum ${maxLinks} links allowed`)
      return
    }

    // Check for duplicate labels
    if (links.some((link) => link.label.toLowerCase() === newLinkLabel.toLowerCase())) {
      setError('A link with this label already exists')
      inputLabelRef.current?.focus()
      return
    }

    // Create new link
    const newLink: QuickLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: newLinkLabel.trim(),
      url: newLinkUrl.trim()
    }

    // Notify parent
    onAddLink?.(newLink)
    onUpdate?.([...links, newLink])

    // Reset form
    setNewLinkLabel('')
    setNewLinkUrl('')
    setIsAddingLink(false)
    inputLabelRef.current?.focus()
  }

  /**
   * Handle remove link with confirmation
   */
  const handleRemoveLink = (linkId: string) => {
    const link = links.find((l) => l.id === linkId)
    if (!link) return

    const confirmed = window.confirm(`Remove "${link.label}" from quick links?`)
    if (!confirmed) return

    onRemoveLink?.(linkId)
    onUpdate?.(links.filter((l) => l.id !== linkId))
  }

  /**
   * Handle Enter key in form inputs
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddLink()
    } else if (e.key === 'Escape') {
      setIsAddingLink(false)
      setError(null)
      setNewLinkLabel('')
      setNewLinkUrl('')
    }
  }

  return (
    <div className="quick-links-selector" role="region" aria-label="Quick Links">
      {/* Links List */}
      <div className="quick-links-list" role="list">
        {links.length === 0 ? (
          <div className="quick-links-empty" role="status">
            <p>No quick links yet. Add one to get started!</p>
          </div>
        ) : (
          links.map((link) => (
            <div key={link.id} className="quick-links-item" role="listitem">
              <button
                className="quick-link-button"
                onClick={() => handleLinkClick(link)}
                title={link.description || `Open ${link.label}`}
                aria-label={`${link.label}${link.description ? `: ${link.description}` : ''}`}
                type="button"
              >
                {link.icon && <span className="quick-link-icon">{link.icon}</span>}
                <span className="quick-link-label">{link.label}</span>
                <span className="quick-link-external-icon" aria-hidden="true">↗</span>
              </button>
              <button
                className="quick-link-remove"
                onClick={() => handleRemoveLink(link.id)}
                title={`Remove ${link.label}`}
                aria-label={`Remove ${link.label} from quick links`}
                type="button"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Link Form */}
      <div className="quick-links-actions">
        {!isAddingLink ? (
          <button
            className="quick-links-add-button"
            onClick={() => setIsAddingLink(true)}
            disabled={links.length >= maxLinks}
            title={links.length >= maxLinks ? `Maximum ${maxLinks} links reached` : 'Add new quick link'}
            aria-label="Add new quick link"
            type="button"
          >
            + Add Link
          </button>
        ) : (
          <div className="quick-links-form">
            {error && (
              <div className="quick-links-error" role="alert">
                {error}
              </div>
            )}
            <input
              ref={inputLabelRef}
              type="text"
              className="quick-links-input"
              placeholder="Link label (e.g., Spotify)"
              value={newLinkLabel}
              onChange={(e) => setNewLinkLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Link label"
              autoFocus
            />
            <input
              ref={inputUrlRef}
              type="url"
              className="quick-links-input"
              placeholder="URL (e.g., https://open.spotify.com)"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Link URL"
            />
            <div className="quick-links-form-actions">
              <button
                className="quick-links-save-button"
                onClick={handleAddLink}
                type="button"
                aria-label="Save new link"
              >
                Save
              </button>
              <button
                className="quick-links-cancel-button"
                onClick={() => {
                  setIsAddingLink(false)
                  setError(null)
                  setNewLinkLabel('')
                  setNewLinkUrl('')
                }}
                type="button"
                aria-label="Cancel adding link"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Info */}
      {links.length > 0 && (
        <div className="quick-links-info" role="status">
          {links.length} of {maxLinks} links
        </div>
      )}
    </div>
  )
}

export default QuickLinksSelector