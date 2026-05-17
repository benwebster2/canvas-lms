/**
 * Canvas Study Stream - Main Entry Point
 * 
 * Exports all components, hooks, and type definitions
 */

// Components
export { MusicPlayer, type MusicPlayerProps } from './components/MusicPlayer'
export { QuickLinksSelector, type QuickLinksSelectorProps } from './components/QuickLinksSelector'
export { TaskbarWidget, type TaskbarWidgetProps } from './components/TaskbarWidget'

// Hooks
export { useAudioPlayer } from './hooks/useAudioPlayer'
export { useQuickLinks } from './hooks/useQuickLinks'

// Types
export type {
  MusicTrack,
  ReadonlyMusicTrack,
  QuickLink,
  ReadonlyQuickLink,
  PlayerState,
  ReadonlyPlayerState,
  PlaybackMode,
  QuickLinksSelectorState,
  StudyStreamConfig,
  OnTrackPlay,
  OnTrackPause,
  OnTrackStop,
  OnProgressChange,
  OnVolumeChange,
  OnPlaybackModeChange,
  OnPlayerError,
  OnQuickLinkClick,
  OnQuickLinksUpdate,
  PlayerAction,
  QuickLinksAction
} from './types'

// Enums
export { PlaybackMode } from './types'

// Utility Functions
export { isValidMusicTrack, isValidQuickLink } from './types'