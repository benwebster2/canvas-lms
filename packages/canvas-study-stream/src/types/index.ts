/**
 * Canvas Study Stream Type Definitions
 * 
 * Defines all TypeScript interfaces and types for the Canvas Study Stream feature.
 */

/**
 * Represents a single music track
 */
export interface MusicTrack {
  id: string
  title: string
  artist: string
  url: string
  duration: number // in seconds
}

/**
 * Represents a quick link for accessing music libraries or resources
 */
export interface QuickLink {
  id: string
  label: string
  url: string
  icon?: string
}

/**
 * Audio player state management
 */
export interface PlayerState {
  isPlaying: boolean
  isPaused: boolean
  currentTime: number // in seconds
  duration: number
  volume: number // 0-1
  currentTrack: MusicTrack | null
}

/**
 * Canvas Study Stream configuration options
 */
export interface StudyStreamConfig {
  autoPlay?: boolean
  defaultVolume?: number
  persistState?: boolean
  theme?: 'light' | 'dark'
}

/**
 * Quick Links Selector state
 */
export interface QuickLinksSelectorState {
  links: QuickLink[]
  selectedLinkId: string | null
}