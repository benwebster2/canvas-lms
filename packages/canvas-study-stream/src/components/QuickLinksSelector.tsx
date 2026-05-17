import React from 'react'
import { QuickLink } from '../types'

/**
 * QuickLinksSelector Component
 * 
 * Displays and manages quick links for accessing music libraries and resources.
 * Features: display links, open in new tab, add/remove links, persist to localStorage.
 * 
 * TODO: Implement in Issue #1
 */
export interface QuickLinksSelectorProps {
  links: QuickLink[]
  onLinkClick: (link: QuickLink) => void
  onAddLink?: (link: QuickLink) => void
  onRemoveLink?: (linkId: string) => void
}

export const QuickLinksSelector: React.FC<QuickLinksSelectorProps> = (props) => {
  return (
    <div className="quick-links-selector">
      <div className="quick-links-list">
        {/* TODO: Render quick links */}
      </div>
      <div className="quick-links-actions">
        {/* TODO: Implement add/remove link UI */}
      </div>
    </div>
  )
}

export default QuickLinksSelector