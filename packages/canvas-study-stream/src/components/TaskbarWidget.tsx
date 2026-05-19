import React from 'react'
import { PlaybackMode } from '../types'
import { MusicPlayer } from './MusicPlayer'
import { QuickLinksSelector } from './QuickLinksSelector'

/**
 * TaskbarWidget Component Props
 */
export interface TaskbarWidgetProps {
  /** Whether widget starts expanded */
  readonly isExpanded?: boolean
  /** Called when expansion state changes */
  readonly onExpandedChange?: (expanded: boolean) => void
}

/**
 * TaskbarWidget Component
 * 
 * Main widget component that integrates into Canvas LMS taskbar.
 * Combines MusicPlayer and QuickLinksSelector into an expandable/collapsible widget.
 * Provides ambient music controls and quick access to study resources.
 * 
 * TODO: Implement in Issue #4
 * - [ ] Widget toggle button in taskbar
 * - [ ] Expand/collapse animation
 * - [ ] Responsive sizing for mobile/tablet/desktop
 * - [ ] Integration with Canvas footer/taskbar
 * - [ ] Persistence of expanded state
 * - [ ] Accessibility: ARIA labels, keyboard nav
 */
export const TaskbarWidget: React.FC<TaskbarWidgetProps> = ({ isExpanded = false, onExpandedChange }) => {
  const [expanded, setExpanded] = React.useState(isExpanded)

  const handleToggle = () => {
    const newState = !expanded
    setExpanded(newState)
    onExpandedChange?.(newState)
  }

  return (
    <div className="taskbar-widget study-stream-widget" role="complementary" aria-label="Canvas Study Stream">
      <button
        className="widget-toggle"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-label="Toggle Canvas Study Stream Widget"
        aria-controls="study-stream-panel"
        type="button"
      >
        {/* TODO: Add widget icon */}
        Study Stream
      </button>

      {expanded && (
        <div 
          className="widget-panel" 
          id="study-stream-panel"
          role="region"
          aria-label="Study Stream Controls"
        >
          <MusicPlayer
            track={null}
            state={{
              isPlaying: false,
              isPaused: false,
              currentTime: 0,
              duration: 0,
              volume: 0.5,
              currentTrack: null,
              playbackMode: PlaybackMode.Normal,
              error: null,
              isLoading: false
            }}
            onPlay={() => {}}
            onPause={() => {}}
            onStop={() => {}}
            onVolumeChange={() => {}}
            onProgressChange={() => {}}
          />
          <QuickLinksSelector 
            links={[]} 
            onLinkClick={() => {}} 
          />
        </div>
      )}
    </div>
  )
}

export default TaskbarWidget
