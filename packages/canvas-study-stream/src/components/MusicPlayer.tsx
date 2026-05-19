import React from 'react'
import { ReadonlyMusicTrack, ReadonlyPlayerState, OnTrackPlay, OnTrackPause, OnTrackStop, OnProgressChange, OnVolumeChange } from '../types'

/**
 * MusicPlayer Component Props
 * 
 * All properties are readonly to prevent accidental mutations within the component.
 */
export interface MusicPlayerProps {
  /** Current track being played or null */
  readonly track: ReadonlyMusicTrack | null
  /** Complete player state snapshot */
  readonly state: ReadonlyPlayerState
  /** Called when play is initiated */
  readonly onPlay: OnTrackPlay
  /** Called when paused */
  readonly onPause: OnTrackPause
  /** Called when stopped */
  readonly onStop: OnTrackStop
  /** Called when volume changes */
  readonly onVolumeChange: OnVolumeChange
  /** Called when user seeks or progress updates */
  readonly onProgressChange: OnProgressChange
}

/**
 * MusicPlayer Component
 * 
 * Main audio player component with playback controls, progress tracking,
 * and volume control.
 * 
 * TODO: Implement in Issue #7
 * - [ ] Audio element integration
 * - [ ] Play/pause/stop buttons
 * - [ ] Progress bar and time display
 * - [ ] Volume slider
 * - [ ] Track information display
 */
export const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
  return (
    <div className="music-player" role="region" aria-label="Music Player">
      <div className="player-controls">
        {/* TODO: Implement playback controls */}
      </div>
      <div className="player-progress">
        {/* TODO: Implement progress bar */}
      </div>
      <div className="player-volume">
        {/* TODO: Implement volume control */}
      </div>
    </div>
  )
}

export default MusicPlayer
