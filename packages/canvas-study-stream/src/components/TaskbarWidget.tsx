import React from 'react'
import { MusicPlayer } from './AmbientMusic'
import { QuickLinksSelector } from './QuickLinksSelector'

/**
 * TaskbarWidget Component
 * 
 * Main widget component that integrates into Canvas LMS taskbar.
 * Combines MusicPlayer and QuickLinksSelector into an expandable/collapsible widget.
 * 
 * TODO: Implement in Issue #4
 */
export interface TaskbarWidgetProps {
  isExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

export const TaskbarWidget: React.FC<TaskbarWidgetProps> = ({ isExpanded = false, onExpandedChange }) => {
  const [expanded, setExpanded] = React.useState(isExpanded)

  const handleToggle = () => {
    const newState = !expanded
    setExpanded(newState)
    onExpandedChange?.(newState)
  }

  return (
    <div className="taskbar-widget study-stream-widget">
      <button
        className="widget-toggle"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-label="Toggle Canvas Study Stream"
      >
        {/* TODO: Add widget icon */}
        Study Stream
      </button>

      {expanded && (
        <div className="widget-panel">
          <MusicPlayer
            track={null}
            state={{
              isPlaying: false,
              isPaused: false,
              currentTime: 0,
              duration: 0,
              volume: 0.5,
              currentTrack: null
            }}
            onPlay={() => {}}
            onPause={() => {}}
            onStop={() => {}}
            onVolumeChange={() => {}}
            onProgressChange={() => {}}
          />
          <QuickLinksSelector links={[]} onLinkClick={() => {}} />
        </div>
      )}
    </div>
  )
}

export default TaskbarWidget