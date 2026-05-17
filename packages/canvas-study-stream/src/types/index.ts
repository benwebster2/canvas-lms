/**
 * Canvas Study Stream Type Definitions
 * 
 * Comprehensive TypeScript interfaces and types for the Canvas Study Stream feature.
 * Strict mode enabled - no implicit 'any' types.
 */

// ============================================================================
// MUSIC TRACK TYPES
// ============================================================================

/**
 * Represents a single music track with metadata
 * @example
 * ```ts
 * const track: MusicTrack = {
 *   id: 'track-123',
 *   title: 'Ambient Study',
 *   artist: 'Focus Music',
 *   url: 'https://cdn.example.com/audio/ambient.mp3',
 *   duration: 3600,
 *   genre: 'ambient',
 *   coverImage: 'https://cdn.example.com/covers/ambient.jpg'
 * }
 * ```
 */
export interface MusicTrack {
  /** Unique identifier for the track */
  id: string
  /** Track title/name */
  title: string
  /** Artist or composer name */
  artist: string
  /** Full URL to the audio file */
  url: string
  /** Duration in seconds */
  duration: number
  /** Optional genre classification */
  genre?: string
  /** Optional cover image URL */
  coverImage?: string
  /** Optional preview URL for short clips */
  previewUrl?: string
}

/**
 * Readonly version of MusicTrack for immutable state
 */
export type ReadonlyMusicTrack = Readonly<MusicTrack>

// ============================================================================
// QUICK LINKS TYPES
// ============================================================================

/**
 * Represents a quick link for accessing music libraries or study resources
 * @example
 * ```ts
 * const link: QuickLink = {
 *   id: 'spotify',
 *   label: 'Spotify Study Playlists',
 *   url: 'https://open.spotify.com/search/study%20music',
 *   icon: 'spotify'
 * }
 * ```
 */
export interface QuickLink {
  /** Unique identifier for the link */
  id: string
  /** Display label for the link button */
  label: string
  /** Full URL to open when clicked */
  url: string
  /** Optional icon identifier for UI rendering */
  icon?: string
  /** Optional description shown on hover */
  description?: string
}

/**
 * Readonly version of QuickLink for immutable state
 */
export type ReadonlyQuickLink = Readonly<QuickLink>

// ============================================================================
// PLAYER STATE TYPES
// ============================================================================

/**
 * Enumeration of playback modes
 */
export enum PlaybackMode {
  Normal = 'normal',
  Looping = 'looping',
  Shuffle = 'shuffle'
}

/**
 * Audio player state - immutable snapshot of player at a point in time
 * @example
 * ```ts
 * const state: PlayerState = {
 *   isPlaying: true,
 *   isPaused: false,
 *   currentTime: 120,
 *   duration: 3600,
 *   volume: 0.75,
 *   currentTrack: track,
 *   playbackMode: PlaybackMode.Normal,
 *   error: null
 * }
 * ```
 */
export interface PlayerState {
  /** Whether audio is currently playing */
  readonly isPlaying: boolean
  /** Whether playback is paused (paused but not stopped) */
  readonly isPaused: boolean
  /** Current playback position in seconds */
  readonly currentTime: number
  /** Total duration of current track in seconds */
  readonly duration: number
  /** Volume level 0-1 (0=muted, 1=maximum) */
  readonly volume: number
  /** Currently playing track or null if none */
  readonly currentTrack: ReadonlyMusicTrack | null
  /** Current playback mode */
  readonly playbackMode: PlaybackMode
  /** Error message if playback failed, null if no error */
  readonly error: string | null
  /** Whether loading/buffering is in progress */
  readonly isLoading: boolean
}

/**
 * Immutable player state type
 */
export type ReadonlyPlayerState = Readonly<PlayerState>

// ============================================================================
// QUICK LINKS SELECTOR STATE TYPES
// ============================================================================

/**
 * State for the quick links selector component
 * @example
 * ```ts
 * const state: QuickLinksSelectorState = {
 *   links: [spotifyLink, youtubeLink],
 *   selectedLinkId: 'spotify',
 *   isLoading: false,
 *   error: null
 * }
 * ```
 */
export interface QuickLinksSelectorState {
  /** Array of available quick links */
  readonly links: readonly ReadonlyQuickLink[]
  /** ID of currently selected link, null if none */
  readonly selectedLinkId: string | null
  /** Whether links are being loaded */
  readonly isLoading: boolean
  /** Error message if loading failed, null if no error */
  readonly error: string | null
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Canvas Study Stream configuration options
 * Can be passed during initialization or modified at runtime
 * @example
 * ```ts
 * const config: StudyStreamConfig = {
 *   autoPlay: false,
 *   defaultVolume: 0.5,
 *   persistState: true,
 *   theme: 'dark'
 * }
 * ```
 */
export interface StudyStreamConfig {
  /** Auto-play audio on component mount */
  autoPlay?: boolean
  /** Default volume level 0-1 */
  defaultVolume?: number
  /** Persist player state to localStorage */
  persistState?: boolean
  /** UI theme: 'light' or 'dark' */
  theme?: 'light' | 'dark'
  /** Persist quick links to localStorage */
  persistLinks?: boolean
  /** Maximum number of quick links to store */
  maxQuickLinks?: number
}

// ============================================================================
// EVENT HANDLER TYPES
// ============================================================================

/**
 * Callback for when a track starts playing
 */
export type OnTrackPlay = (track: ReadonlyMusicTrack) => void

/**
 * Callback for when playback is paused
 */
export type OnTrackPause = () => void

/**
 * Callback for when playback is stopped
 */
export type OnTrackStop = () => void

/**
 * Callback for progress updates (user seeking or time progression)
 */
export type OnProgressChange = (currentTime: number) => void

/**
 * Callback for volume changes
 */
export type OnVolumeChange = (volume: number) => void

/**
 * Callback for playback mode changes
 */
export type OnPlaybackModeChange = (mode: PlaybackMode) => void

/**
 * Callback for error events
 */
export type OnPlayerError = (error: Error) => void

/**
 * Callback for when a quick link is clicked
 */
export type OnQuickLinkClick = (link: ReadonlyQuickLink) => void

/**
 * Callback for when quick links are updated
 */
export type OnQuickLinksUpdate = (links: readonly ReadonlyQuickLink[]) => void

// ============================================================================
// PLAYER ACTION TYPES
// ============================================================================

/**
 * Actions that can be dispatched to the player
 * Discriminated union for type-safe action handling
 */
export type PlayerAction =
  | { type: 'PLAY'; payload: ReadonlyMusicTrack }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'SEEK'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYBACK_MODE'; payload: PlaybackMode }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }

// ============================================================================
// QUICK LINKS ACTION TYPES
// ============================================================================

/**
 * Actions that can be dispatched to quick links selector
 * Discriminated union for type-safe action handling
 */
export type QuickLinksAction =
  | { type: 'ADD_LINK'; payload: QuickLink }
  | { type: 'REMOVE_LINK'; payload: string }
  | { type: 'SELECT_LINK'; payload: string | null }
  | { type: 'SET_LINKS'; payload: readonly QuickLink[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Type guard to check if a value is a valid track
 */
export function isValidMusicTrack(value: unknown): value is MusicTrack {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'artist' in value &&
    'url' in value &&
    'duration' in value &&
    typeof (value as any).id === 'string' &&
    typeof (value as any).title === 'string' &&
    typeof (value as any).artist === 'string' &&
    typeof (value as any).url === 'string' &&
    typeof (value as any).duration === 'number'
  )
}

/**
 * Type guard to check if a value is a valid quick link
 */
export function isValidQuickLink(value: unknown): value is QuickLink {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'label' in value &&
    'url' in value &&
    typeof (value as any).id === 'string' &&
    typeof (value as any).label === 'string' &&
    typeof (value as any).url === 'string'
  )
}