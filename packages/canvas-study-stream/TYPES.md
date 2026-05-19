# Canvas Study Stream - Type Definitions Guide

## Overview

All TypeScript types for the Canvas Study Stream feature are defined in `src/types/index.ts` with strict mode enabled. No implicit `any` types are allowed.

## Core Types

### Music Track Types

#### `MusicTrack`
Represents a single music track with metadata.

```typescript
interface MusicTrack {
  id: string                    // Unique identifier
  title: string                 // Track title
  artist: string                // Artist/composer
  url: string                   // Audio file URL
  duration: number              // Duration in seconds
  genre?: string                // Optional genre
  coverImage?: string           // Optional cover image URL
  previewUrl?: string           // Optional preview URL
}
```

#### `ReadonlyMusicTrack`
Immutable version of MusicTrack, used for state to prevent accidental mutations.

---

### Quick Link Types

#### `QuickLink`
Represents a quick link for accessing resources.

```typescript
interface QuickLink {
  id: string                    // Unique identifier
  label: string                 // Display label
  url: string                   // Link URL
  icon?: string                 // Optional icon identifier
  description?: string          // Optional description
}
```

#### `ReadonlyQuickLink`
Immutable version of QuickLink.

---

### Player State Types

#### `PlayerState`
Complete snapshot of audio player state at a point in time. All properties are readonly to enforce immutability in state management.

```typescript
interface PlayerState {
  readonly isPlaying: boolean           // Currently playing
  readonly isPaused: boolean            // Paused (not stopped)
  readonly currentTime: number          // Current position (seconds)
  readonly duration: number             // Total duration (seconds)
  readonly volume: number               // Volume 0-1
  readonly currentTrack: MusicTrack | null  // Playing track
  readonly playbackMode: PlaybackMode   // Current mode
  readonly error: string | null         // Error message
  readonly isLoading: boolean           // Loading/buffering
}
```

#### `PlaybackMode` Enum
```typescript
enum PlaybackMode {
  Normal = 'normal',      // Play once
  Looping = 'looping',    // Loop track
  Shuffle = 'shuffle'     // Random order (with playlist)
}
```

---

### Quick Links Selector State

#### `QuickLinksSelectorState`
State for quick links management component.

```typescript
interface QuickLinksSelectorState {
  readonly links: readonly ReadonlyQuickLink[]  // Available links
  readonly selectedLinkId: string | null        // Selected link
  readonly isLoading: boolean                   // Loading state
  readonly error: string | null                 // Error message
}
```

---

### Configuration

#### `StudyStreamConfig`
Configuration options for the study stream feature.

```typescript
interface StudyStreamConfig {
  autoPlay?: boolean              // Auto-play on mount
  defaultVolume?: number          // Default volume 0-1
  persistState?: boolean          // Persist to localStorage
  theme?: 'light' | 'dark'       // UI theme
  persistLinks?: boolean          // Persist links
  maxQuickLinks?: number          // Max links to store
}
```

---

## Event Handlers

All event handler types are function type aliases for type-safe callbacks:

- `OnTrackPlay` - Called when track starts
- `OnTrackPause` - Called when paused
- `OnTrackStop` - Called when stopped
- `OnProgressChange` - Called on seek/progress (currentTime: number)
- `OnVolumeChange` - Called on volume change (volume: number)
- `OnPlaybackModeChange` - Called on mode change (mode: PlaybackMode)
- `OnPlayerError` - Called on error (error: Error)
- `OnQuickLinkClick` - Called on link click (link: ReadonlyQuickLink)
- `OnQuickLinksUpdate` - Called on links update (links: readonly ReadonlyQuickLink[])

---

## Action Types

### PlayerAction
Discriminated union for type-safe player actions:

```typescript
type PlayerAction =
  | { type: 'PLAY'; payload: ReadonlyMusicTrack }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'SEEK'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYBACK_MODE'; payload: PlaybackMode }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
```

### QuickLinksAction
Discriminated union for quick links actions:

```typescript
type QuickLinksAction =
  | { type: 'ADD_LINK'; payload: QuickLink }
  | { type: 'REMOVE_LINK'; payload: string }
  | { type: 'SELECT_LINK'; payload: string | null }
  | { type: 'SET_LINKS'; payload: readonly QuickLink[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
```

---

## Utility Functions

### Type Guards

#### `isValidMusicTrack(value: unknown): value is MusicTrack`
Validates that a value is a valid MusicTrack object.

```typescript
const data = JSON.parse(trackJson)
if (isValidMusicTrack(data)) {
  playTrack(data) // TypeScript knows this is MusicTrack
}
```

#### `isValidQuickLink(value: unknown): value is QuickLink`
Validates that a value is a valid QuickLink object.

```typescript
const link = localStorage.getItem('lastLink')
if (isValidQuickLink(JSON.parse(link))) {
  // Safe to use
}
```

---

## Strict Mode Compliance

✅ All types follow TypeScript strict mode requirements:
- ✅ No implicit `any` types
- ✅ Explicit return types for all functions
- ✅ Readonly properties in state
- ✅ Proper union types instead of generic types
- ✅ Discriminated unions for actions
- ✅ Type guards for runtime validation

---

## Usage Examples

### Using Player State
```typescript
import { PlayerState, PlaybackMode } from '@canvas/study-stream'

const playerState: PlayerState = {
  isPlaying: true,
  isPaused: false,
  currentTime: 120,
  duration: 3600,
  volume: 0.75,
  currentTrack: null,
  playbackMode: PlaybackMode.Normal,
  error: null,
  isLoading: false
}
```

### Dispatching Actions
```typescript
import { PlayerAction, PlaybackMode } from '@canvas/study-stream'

const pauseAction: PlayerAction = { type: 'PAUSE' }
const seekAction: PlayerAction = { type: 'SEEK', payload: 300 }
const setModeAction: PlayerAction = {
  type: 'SET_PLAYBACK_MODE',
  payload: PlaybackMode.Looping
}
```

### Type-Safe Event Handlers
```typescript
import { OnTrackPlay, OnProgressChange, ReadonlyMusicTrack } from '@canvas/study-stream'

const handleTrackPlay: OnTrackPlay = (track: ReadonlyMusicTrack) => {
  console.log(`Now playing: ${track.title}`)
}

const handleProgress: OnProgressChange = (currentTime: number) => {
  console.log(`Progress: ${currentTime}s`)
}
```
