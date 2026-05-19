import React from 'react'
import { PlayerState, MusicTrack } from '../types'

/**
 * MusicPlayer Component
 * 
 * Main audio player component with playback controls, progress tracking,
 * and volume control.
 * 
 * TODO: Implement in Issue #7
 */
export interface MusicPlayerProps {
  track: MusicTrack | null
  state: PlayerState
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onVolumeChange: (volume: number) => void
  onProgressChange: (time: number) => void
}

export const MusicPlayer: React.FC<MusicPlayerProps> = (props) => {
  return (
    <div className="music-player">
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