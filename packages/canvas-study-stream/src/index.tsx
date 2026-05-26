/**
 * Canvas Study Stream - Main Entry Point
 * 
 * Exports all components, hooks, and type definitions
 */

// Components
export { MusicPlayer, type MusicPlayerProps } from './components/AmbientMusic'
export { QuickLinksSelector, type QuickLinksSelectorProps } from './components/QuickLinksSelector'
export { TaskbarWidget, type TaskbarWidgetProps } from './components/TaskbarWidget'

// Hooks
export { useAudioPlayer } from './hooks/useAudioPlayer'

// Types
export type {
  MusicTrack,
  QuickLink,
  PlayerState,
  StudyStreamConfig,
  QuickLinksSelectorState
} from './types'