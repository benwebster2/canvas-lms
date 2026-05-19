# Session 1: QA & Testing Mindset Investigation

## My Target Exploration Prompt

Role: Act as a Senior QA Architect and TDD Specialist.

Context: I am planning a new feature for a Canvas LMS environment: a "Quicklink Ambient Music Dashboard." When a student clicks a quicklink in Canvas, it opens a small pop-up dashboard allowing them to select and play preloaded ambient music tracks to help them focus while studying. 

Because Canvas is a massive brownfield codebase, I want to explore how to design and guard this feature using a strong testing mindset before any implementation code is written.

Task: Please provide a comprehensive engineering breakdown that addresses the following:

1. Modern QA & Prevention: For this Ambient Music Dashboard feature, give a concrete example of how a "Shift-Left" QA approach prevents defects during the design/requirement stage, compared to a traditional "test at the end" approach.

2. AAA Pattern & Boundary Testing: Show me the structural shape (a pseudo-code skeleton or conceptual layout) of a single unit test using the Arrange, Act, Assert (AAA) pattern. The test must focus on an edge case or boundary condition for the playlist feature (for example: attempting to play an empty playlist, handling a missing/null audio file identifier, or skipping past the last track). Ensure the test name is highly descriptive.

3. Test Isolation: This dashboard needs to fetch preloaded tracks. Explain why it is critical to isolate our unit tests from the real network or backend storage when verifying the dashboard's component logic. What happens to our feedback loop if our unit test makes a real network call to stream the music file?

4. TDD Tradeoffs (Red-Green-Refactor): Walk me through how using the strict TDD cycle would look when building the track-switching logic for this music pop-up. What is a specific design benefit we get from writing the failing test first here, and what is a potential downside or trap of using strict TDD in a heavily integrated LMS environment?

Formatting: Do not write actual application implementation code. Use clear markdown sections and conceptual test shapes with descriptive failure comments to show what makes a test maintainable and trustworthy.

---

# COMPREHENSIVE QA & TESTING BREAKDOWN

## 1. Modern QA & Prevention: Shift-Left Approach vs. Traditional Testing

### The Problem: Traditional "Test-at-the-End" Approach

In a traditional waterfall or late-stage testing model applied to the Ambient Music Dashboard:

- **Design Phase**: Product team specifies "students can play ambient music" ✓
- **Development Phase**: Engineers build a playlist component, stream logic, and track selector
- **Testing Phase (6 weeks later)**: QA discovers:
  - No consideration for students on slow network connections (buffering UI feedback missing)
  - No accessibility support (screen reader users cannot navigate playlists)
  - No error handling for corrupted audio files
  - Permission checks are missing (students from restricted institutions can't access)
  - Dashboard crashes when playlist has > 500 tracks due to DOM bloat

**Cost of Late Discovery:**
- Rework required across multiple layers (frontend, backend, permissions)
- Feature launch delayed 3-4 weeks
- Technical debt added (quick fixes instead of proper solutions)
- Real users already disappointed by beta access

### The Solution: Shift-Left QA Approach

**Shift-Left means: Inject quality thinking into requirements and design, BEFORE code is written.**

#### Concrete Example: Ambient Music Dashboard Shift-Left

**Requirements Phase (QA Involvement):**

| Requirement | Traditional Approach | Shift-Left QA Perspective |
|---|---|---|
| "Play ambient music" | ✓ Accepted as-is | **Question:** What happens when the audio stream fails mid-playback? Should we resume or restart? |
| | | **Question:** Can a student have the dashboard open for 8 hours? Do we need connection health checks? |
| | | **Decision:** Implement graceful degradation: show offline indicator, queue track for when connection returns |
| "Select from preloaded tracks" | ✓ Accepted as-is | **Question:** What if a track is corrupted in the database? Should we hide it or show an error? |
| | | **Question:** How many tracks are we preloading? If 1000, how does pagination affect UX? |
| | | **Decision:** Batch-load 50 tracks at a time; validate audio file integrity on import, not playback |
| "Small pop-up dashboard" | ✓ Accepted as-is | **Question:** Is this a modal (blocks interaction) or floating panel (allows multitasking)? |
| | | **Question:** What screen sizes are we supporting? Can a student use it on a phone? |
| | | **Decision:** Floating resizable panel with responsive layout; test at 320px (mobile), 768px (tablet), 1920px (desktop) |

**Design Phase (QA-Informed):**

Before a single line of code, QA architect creates a **Requirements Verification Matrix** that maps each requirement to testable acceptance criteria:

```markdown
### Requirement: Students can select and play ambient music

#### Acceptance Criteria (Testable):
- [ ] User can open dashboard within 2 seconds of clicking quicklink
- [ ] Dashboard displays all preloaded tracks without pagination errors
- [ ] Playing a track initiates audio playback within 1 second
- [ ] Stopping a track halts playback immediately
- [ ] Network failure during playback shows error state, not silent failure
- [ ] Dashboard remains accessible with screen reader enabled
- [ ] UI is usable on screens as small as 320px width

#### Edge Cases Identified Early:
- Empty playlist (no tracks preloaded) → Show "No tracks available" state
- Corrupted audio file → Skip with user notification, not crash
- Network timeout after 5 seconds → Retry or show offline option
- User navigates away → Clean up audio stream resources
- Student has 10 tabs open → Ensure only one dashboard instance plays audio
```

**Result of Shift-Left:**

- ✅ **0 Late-Stage Surprises**: Accessibility, error handling, and network resilience are designed in, not bolted on
- ✅ **Faster Development**: Engineers write code to spec, not to guesses
- ✅ **Reduced Rework**: Edge cases caught before implementation
- ✅ **Lower Defect Escape Rate**: Real users encounter fewer bugs at launch

---

## 2. AAA Pattern & Boundary Testing: Conceptual Test Shape

### The AAA (Arrange-Act-Assert) Pattern Explained

The **AAA pattern** provides a universal skeleton for structuring any unit test to maximize clarity and maintainability:

- **Arrange**: Set up the test's initial state (mocks, data, context)
- **Act**: Execute the single behavior being tested
- **Assert**: Verify that the behavior produced the expected outcome

### Concrete Example: Boundary Test for Empty Playlist

**Scenario:** A student opens the Ambient Music Dashboard, but no tracks have been preloaded to the database. The `PlaylistManager` component should gracefully handle this edge case without crashing.

#### Pseudo-Code Test Skeleton (AAA Pattern)

```javascript
/**
 * Test Name: HIGHLY DESCRIPTIVE - Communicates intent, scope, and expected outcome
 * 
 * Naming Pattern: [componentName] [method/behavior] [context] [expected outcome]
 * This makes test failures instantly actionable to the team.
 */
describe('PlaylistManager', () => {
  
  test('playNextTrack_withEmptyPlaylist_shouldNotCrashAndReturnErrorState', () => {
    
    // ─────────────────────────────────────────────────────────────────────
    // ARRANGE: Set up the test's preconditions
    // ─────────────────────────────────────────────────────────────────────
    
    // Create a mock data structure (the component's dependency)
    const mockPlaylistData = {
      tracks: [],  // ← BOUNDARY CONDITION: Empty array (the edge case)
      currentIndex: 0,
      isPlaying: false
    };
    
    // Create a mock audio player to avoid real network calls
    const mockAudioPlayer = {
      play: jest.fn().mockResolvedValue(true),
      pause: jest.fn(),
      getCurrentTime: jest.fn().mockReturnValue(0),
      setVolume: jest.fn()
    };
    
    // Instantiate the component with mocked dependencies
    const playlistManager = new PlaylistManager(
      mockPlaylistData,
      mockAudioPlayer
    );
    
    // ─────────────────────────────────────────────────────────────────────
    // ACT: Execute the single behavior we're testing
    // ─────────────────────────────────────────────────────────────────────
    
    const result = playlistManager.playNextTrack();
    
    // ─────────────────────────────────────────────────────────────────────
    // ASSERT: Verify the behavior produced the expected outcome
    // ─────────────────────────────────────────────────────────────────────
    
    // Assertion 1: The method should NOT throw an error (robustness)
    expect(result).not.toThrow();
    
    // Assertion 2: Should return an error state object, not undefined
    expect(result).toEqual(
      expect.objectContaining({
        success: false,
        errorCode: 'EMPTY_PLAYLIST',
        userMessage: 'No tracks available. Add some tracks and try again.',
        nextIndex: -1  // ← Indicates no track is available
      })
    );
    
    // Assertion 3: Audio player should NOT have been called (critical!)
    // This prevents attempted playback of non-existent audio
    expect(mockAudioPlayer.play).not.toHaveBeenCalled();
    
    // Assertion 4: Component state should reflect error condition
    expect(playlistManager.getState()).toMatchObject({
      isPlaying: false,
      currentTrackId: null,
      errorState: 'EMPTY_PLAYLIST'
    });
  });
});
```

### Why This Test Is Well-Structured

| Aspect | Why It Matters |
|---|---|
| **Highly Descriptive Name** | A developer can understand the test's purpose without reading the code |
| **Single Responsibility** | Tests ONE behavior: how the system handles empty playlists |
| **Boundary Condition** | Focuses on the edge case (empty array) that often breaks untested code |
| **Multiple Assertions** | Verifies robustness (no crash), correctness (error state), and isolation (no side effects) |
| **Clear Comments** | Separates the three phases with visual markers |
| **Mock Dependencies** | AudioPlayer is mocked to prevent real network calls (see Test Isolation section) |

### Another Boundary Example: Null Audio File Identifier

```javascript
test('playTrack_withNullAudioFileId_shouldReturnValidationErrorAndNotAttemptPlayback', () => {
  
  // ARRANGE
  const trackWithNullAudioId = {
    id: 'track-123',
    title: 'Focus Ambient',
    audioFileId: null,  // ← BOUNDARY: Missing/null identifier
    duration: 3600
  };
  
  const mockAudioPlayer = {
    play: jest.fn(),
    loadStream: jest.fn()
  };
  
  const playlistManager = new PlaylistManager(
    { tracks: [trackWithNullAudioId], currentIndex: 0 },
    mockAudioPlayer
  );
  
  // ACT
  const result = playlistManager.playTrack(trackWithNullAudioId);
  
  // ASSERT
  expect(result.success).toBe(false);
  expect(result.errorCode).toBe('INVALID_AUDIO_FILE_REFERENCE');
  
  // Critical: Ensure we never attempted to stream a null reference
  expect(mockAudioPlayer.loadStream).not.toHaveBeenCalled();
  expect(mockAudioPlayer.play).not.toHaveBeenCalled();
});
```

---

## 3. Test Isolation: Why Mocking Network & Backend Is Critical

### The Problem: Tests That Call the Real Backend

Imagine a unit test WITHOUT isolation:

```javascript
// ❌ BAD: Test makes a REAL network call
test('loadTracks_shouldPopulatePlaylist', async () => {
  const playlistManager = new PlaylistManager();
  
  // This makes a REAL HTTP request to the Canvas backend
  const tracks = await playlistManager.fetchPlaylistFromBackend();
  
  expect(tracks.length).toBeGreaterThan(0);
});
```

### What Goes Wrong in a Brownfield LMS Environment

| Problem | Impact on Development |
|---|---|
| **Flaky Tests** | Backend might be down, network might timeout, database might be slow. Test passes locally, fails in CI/CD. |
| **Slow Feedback Loop** | Each test takes 2-5 seconds to fetch real data. 100 tests = 5+ minutes. Developers stop running tests locally. |
| **Dependency on Test Data** | Tests only pass if specific tracks exist in the test backend. When QA deletes old test data, tests break unpredictably. |
| **Hidden Environment Coupling** | Test behavior depends on which Canvas instance (staging/prod replica) is running. Hard to debug failures. |
| **Masked Logic Errors** | If playlistManager's sorting logic is broken, but the backend returns pre-sorted data, the bug hides. Test passes falsely. |
| **Difficult to Test Edge Cases** | How do you simulate a 10-second network timeout? A 500 error from backend? Corrupted JSON? Hard without mocking. |

### The Solution: Test Isolation via Mocking

```javascript
// ✅ GOOD: Test is isolated from the network
test('loadTracks_withValidBackendResponse_shouldPopulatePlaylistInOrder', async () => {
  
  // ARRANGE: Mock the backend service
  const mockBackendService = {
    fetchPlaylist: jest.fn().mockResolvedValue({
      tracks: [
        { id: 'track-1', title: 'Focus 1', duration: 3600 },
        { id: 'track-2', title: 'Focus 2', duration: 3600 },
        { id: 'track-3', title: 'Focus 3', duration: 3600 }
      ]
    })
  };
  
  const playlistManager = new PlaylistManager(mockBackendService);
  
  // ACT
  const tracks = await playlistManager.loadTracks();
  
  // ASSERT
  expect(tracks).toHaveLength(3);
  expect(tracks[0].title).toBe('Focus 1');
  
  // Verify the mock was called exactly once (no re-fetching)
  expect(mockBackendService.fetchPlaylist).toHaveBeenCalledTimes(1);
});
```

### The Feedback Loop Difference

**Without Isolation (Real Network):**
```
Developer runs test
  ↓
[Wait 5 seconds for network call]
  ↓
Backend is slow or unreachable
  ↓
Test FAILS, but is it the code or the network?
  ↓
Developer is frustrated, stops running tests locally
  ↓
Bugs slip through to CI/CD
  ↓
CI pipeline fails after 10 minutes of full test suite run
```

**With Isolation (Mocked):**
```
Developer runs test
  ↓
[Instant mock response, < 50ms]
  ↓
Test fails immediately if component logic is wrong
  ↓
Developer sees exactly what the issue is
  ↓
Developer fixes the code logic, re-runs in < 100ms
  ↓
Confident code reaches CI/CD
  ↓
CI pipeline runs in 2 minutes with guaranteed isolation
```

### Test Isolation Layers for the Ambient Music Dashboard

```markdown
### Layer 1: Unit Tests (Isolated from Everything)
- Test: PlaylistManager.playNextTrack()
- Mocked: BackendService, AudioPlayer, DataStore
- Speed: < 100ms per test
- Scope: Single function logic

### Layer 2: Integration Tests (Isolated from External APIs, but Real Components)
- Test: PlaylistManager + AudioPlayer together
- Mocked: BackendService, Network calls
- Real: Component interaction, state management
- Speed: < 500ms per test
- Scope: Multi-component workflows

### Layer 3: End-to-End Tests (Minimal Mocking, Real-Like Scenarios)
- Test: Full user journey from opening dashboard to playing a track
- Mocked: Only external services (real Canvas backend may be a test instance)
- Real: UI interactions, backend responses, audio streams
- Speed: 2-10 seconds per test
- Scope: Complete feature workflows, user-facing behavior

### Layer 4: Contract Tests (Verify Mock Assumptions)
- Test: Our mocked BackendService matches real API contract
- Validates: The shape of mock data matches what the real backend returns
- Speed: < 200ms per test
- Scope: Ensures mock assumptions don't drift from reality
```

### Why Isolation Matters in a Brownfield Codebase

Canvas LMS is massive and complex. Without test isolation:
- **Flakiness multiplies**: Each test depends on multiple external systems
- **Debugging becomes impossible**: Is it your code, the network, the backend, or the test data?
- **Tests become slow**: Entire test suite can take 30+ minutes
- **Developers skip testing**: Feedback loop is too long, so tests aren't run locally
- **Regressions escape**: Untested code reaches production

**With isolation**: Each test is a focused, fast, deterministic unit of confidence.

---

## 4. TDD Tradeoffs: Red-Green-Refactor Cycle for Track-Switching Logic

### What is the TDD Cycle?

The **Red-Green-Refactor** cycle is the core of Test-Driven Development:

1. **Red**: Write a failing test for a feature that doesn't exist yet
2. **Green**: Write the minimal code to make the test pass
3. **Refactor**: Clean up the code without changing behavior, ensuring the test still passes

### Real Example: Building Track-Switching Logic

#### Iteration 1: Switching to the Next Track

**RED Phase: Write the failing test first**

```javascript
describe('PlaylistTrackSwitching', () => {
  
  test('switchToNextTrack_withCurrentTrackAtIndex0_shouldIncrementIndexAndPlayNewTrack', () => {
    
    // ARRANGE
    const playlist = {
      tracks: [
        { id: 'track-1', title: 'Ambient 1', audioFileId: 'file-1' },
        { id: 'track-2', title: 'Ambient 2', audioFileId: 'file-2' },
        { id: 'track-3', title: 'Ambient 3', audioFileId: 'file-3' }
      ],
      currentTrackIndex: 0
    };
    
    const mockAudioPlayer = { play: jest.fn() };
    const trackSwitcher = new TrackSwitcher(playlist, mockAudioPlayer);
    
    // ACT
    trackSwitcher.switchToNextTrack();
    
    // ASSERT
    expect(trackSwitcher.getCurrentTrackIndex()).toBe(1);
    expect(mockAudioPlayer.play).toHaveBeenCalledWith('file-2');
  });
});

// ❌ TEST FAILS
// Error: TrackSwitcher is not defined
// Error: switchToNextTrack is not a function
```

At this point, we have a **failing test** (RED). This test describes the desired behavior but the code doesn't exist.

**GREEN Phase: Write minimal code to pass the test**

```javascript
// The MINIMAL implementation to make the test pass
class TrackSwitcher {
  constructor(playlist, audioPlayer) {
    this.playlist = playlist;
    this.audioPlayer = audioPlayer;
  }
  
  switchToNextTrack() {
    const nextIndex = this.playlist.currentTrackIndex + 1;
    this.playlist.currentTrackIndex = nextIndex;
    
    const nextTrack = this.playlist.tracks[nextIndex];
    this.audioPlayer.play(nextTrack.audioFileId);
  }
  
  getCurrentTrackIndex() {
    return this.playlist.currentTrackIndex;
  }
}

// ✅ TEST PASSES
```

**REFACTOR Phase: Clean up without changing behavior**

```javascript
// Improved version (cleaner, more maintainable, same behavior)
class TrackSwitcher {
  constructor(playlist, audioPlayer) {
    this.playlist = playlist;
    this.audioPlayer = audioPlayer;
  }
  
  switchToNextTrack() {
    const nextIndex = this.getCurrentTrackIndex() + 1;
    this.setCurrentTrackIndex(nextIndex);
    this.playCurrentTrack();
  }
  
  setCurrentTrackIndex(index) {
    this.playlist.currentTrackIndex = index;
  }
  
  getCurrentTrackIndex() {
    return this.playlist.currentTrackIndex;
  }
  
  playCurrentTrack() {
    const currentTrack = this.playlist.tracks[this.getCurrentTrackIndex()];
    this.audioPlayer.play(currentTrack.audioFileId);
  }
}

// ✅ TEST STILL PASSES
// Code is now more modular (single-responsibility principle applied)
```

#### Iteration 2: Handle Boundary Condition (Last Track)

Now we write ANOTHER failing test for the edge case:

```javascript
test('switchToNextTrack_whenCurrentTrackIsLastTrack_shouldNotCrashAndReturnToFirstTrack', () => {
  
  // ARRANGE
  const playlist = {
    tracks: [
      { id: 'track-1', title: 'Ambient 1', audioFileId: 'file-1' },
      { id: 'track-2', title: 'Ambient 2', audioFileId: 'file-2' },
      { id: 'track-3', title: 'Ambient 3', audioFileId: 'file-3' }
    ],
    currentTrackIndex: 2  // ← At the last track
  };
  
  const mockAudioPlayer = { play: jest.fn() };
  const trackSwitcher = new TrackSwitcher(playlist, mockAudioPlayer);
  
  // ACT
  trackSwitcher.switchToNextTrack();
  
  // ASSERT
  // Expected: Wrap around to the first track (loop behavior)
  expect(trackSwitcher.getCurrentTrackIndex()).toBe(0);
  expect(mockAudioPlayer.play).toHaveBeenCalledWith('file-1');
});

// ❌ TEST FAILS
// Error: Expected 0, but got 3
// (The index went out of bounds, no wrapping logic exists)
```

**GREEN Phase:**

```javascript
switchToNextTrack() {
  let nextIndex = this.getCurrentTrackIndex() + 1;
  
  // Wrap around if we've gone past the last track
  if (nextIndex >= this.playlist.tracks.length) {
    nextIndex = 0;
  }
  
  this.setCurrentTrackIndex(nextIndex);
  this.playCurrentTrack();
}

// ✅ BOTH TESTS PASS
```

**REFACTOR Phase:**

```javascript
switchToNextTrack() {
  const nextIndex = this.getNextTrackIndex();
  this.setCurrentTrackIndex(nextIndex);
  this.playCurrentTrack();
}

getNextTrackIndex() {
  const currentIndex = this.getCurrentTrackIndex();
  const totalTracks = this.playlist.tracks.length;
  
  // Circular array: wrap around when reaching the end
  return (currentIndex + 1) % totalTracks;
}

// ✅ BOTH TESTS PASS
// Logic is extracted into a named method (improves readability)
```

### Design Benefit: Why Test-First Reveals Better Design

By writing the test FIRST, we discovered:

1. **Clear API Contract**: The test shows us the method signature we need (`switchToNextTrack`, `getCurrentTrackIndex`)
2. **Edge Cases Surface Early**: We caught the boundary condition (last track wrapping) BEFORE implementing the naive version
3. **Modular Design Emerges**: The test forced us to separate concerns (`playCurrentTrack`, `getNextTrackIndex`)
4. **No Accidental Complexity**: We wrote ONLY the code needed to pass the test, not speculative features

### The Tradeoff: Potential Downside in a Brownfield LMS Environment

**The TDD Trap in Canvas:**

```markdown
### Problem 1: Heavy Integration Points
Canvas LMS is deeply integrated. The track-switching logic might need to:
- Update user progress records in the database
- Trigger analytics events
- Update the UI state manager
- Sync with other open Canvas windows

If we write tests at the unit level (good practice), we end up with:
- 50 tests for track switching logic
- Each test requires complex mocking
- Tests become brittle when integration points change
- We mock away the actual integration, so real bugs hide

### Example: TDD Test Passes, But Integration Breaks
✅ Unit test: TrackSwitcher.switchToNextTrack() works perfectly
✅ Unit test: currentTrackIndex increments correctly
✅ Unit test: AudioPlayer.play() is called with correct file ID

❌ Integration failure: The UI state manager wasn't updated, so the dashboard shows wrong track info
❌ Integration failure: Analytics endpoint expects a different event structure than what we mocked
❌ Integration failure: Real Canvas backend returns audioFileId in a different format than our mock

Why? The unit tests never exercised the real integration points.
```

### The Solution: Balanced TDD in Brownfield Codebases

**Use TDD strategically, not dogmatically:**

```markdown
### TDD Approach for Ambient Music Dashboard in Canvas

#### 1. Core Business Logic (STRICT TDD)
- **PlaylistManager**: Track switching, playlist ordering, skip logic
- **AudioPlayer State Machine**: Play/pause/stop transitions
- **These are pure logic; TDD ensures correctness**
- Use 100% unit test coverage with mocks
- Fast feedback loop, easy to refactor

#### 2. Integration Points (HYBRID: Some TDD + Integration Tests)
- **DashboardComponent integrates with Canvas UI state**
- Write TDD unit tests for the component's pure logic
- ALSO write integration tests that verify:
  - Component correctly dispatches state updates
  - State manager correctly receives and persists updates
- Mocks are used strategically (not for ALL dependencies)

#### 3. Real Integration (Integration/E2E Tests, Not Unit Tests)
- **Test: Opening dashboard → Selecting track → Playing → Verifying Canvas analytics recorded**
- Don't use TDD here; write integration tests
- Use a test Canvas instance with real database
- Verify the ACTUAL integration works as expected
- These are slower but catch real problems

### Example: Where TDD Shines vs. Where It Doesn't

TDD SHINES:
- Logic for determining if we can skip to next track (permissions, playlist state)
- Calculating elapsed time with complex buffering states
- Handling edge cases in track ordering algorithms

TDD DOESN'T SHINE (or becomes expensive):
- Verifying the dashboard opens within 2 seconds (depends on network, browser, system load)
- Testing that the audio stream actually plays through Canvas's event bus
- Confirming analytics data matches Canvas's expected schema
```

### The Trap to Avoid: Over-Mocking

```markdown
### ❌ The Over-Mocking Trap (Strict TDD gone wrong in brownfield code)

Writing TDD tests, we mock:
- Canvas state manager → mock
- Analytics service → mock
- Backend API → mock
- DOM events → mock
- Audio stream → mock

Result:
- 200 unit tests, 95% coverage
- All tests pass locally
- Code deployed to Canvas
- Actual dashboard doesn't work; state isn't persisting
- Analytics never record student engagement
- Audio plays but UI doesn't update

Why? The mocks were SO isolated that they didn't match reality.
The integration wasn't tested.

### ✅ The Balanced Approach

Unit Tests (TDD, heavily mocked):
- 40 tests for core logic (30% of test suite)
- Pure algorithms, edge cases, error handling

Integration Tests (minimal mocking):
- 30 tests for Canvas integration (40% of test suite)
- Real Canvas state manager, but mocked backend API
- Tests the actual UI/state synchronization

End-to-End Tests (almost no mocking):
- 15 tests for full workflows (30% of test suite)
- Real Canvas instance, real audio playback
- Slow but catch real problems

Total: 85 tests, realistic 30-second run time, high confidence
```

---

## Summary: QA Mindset for Brownfield Feature Development

| Practice | Benefit in Canvas LMS | Implementation |
|---|---|---|
| **Shift-Left QA** | Catch integration issues in design, not at launch | Involve QA in requirements, create acceptance criteria before code |
| **AAA Pattern** | Ensure tests are maintainable and crystal-clear | Use descriptive test names, always separate Arrange/Act/Assert |
| **Test Isolation** | Fast feedback loop, reduced flakiness | Mock external dependencies (network, backend), test only the component |
| **Balanced TDD** | Core logic is well-designed, integration is verified | Unit tests with TDD for pure logic; integration tests for Canvas integration |

The key insight: **In a brownfield codebase, quality is about strategic testing at the right layer, not testing everything.**