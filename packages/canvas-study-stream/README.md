# Canvas Study Stream Package

A Canvas LMS widget for ambient music playback and quick resource linking during study sessions.

## Features

- 🎵 **Music Player**: Play ambient music with controls for play, pause, stop, and volume
- 🔗 **Quick Links**: Quickly access music libraries and study resources
- 🎨 **Responsive Design**: Integrates seamlessly into Canvas LMS taskbar
- 🌙 **Dark Mode Support**: Theme-aware styling matching Canvas design system
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support

## Structure

```
src/
├── components/         # React components
│   ├── MusicPlayer.tsx
│   ├── QuickLinksSelector.tsx
│   └── TaskbarWidget.tsx
├── hooks/              # Custom React hooks
│   └── useAudioPlayer.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── index.tsx           # Main entry point
```

## Development

### Installation

This is a workspace package. Install dependencies from the root Canvas LMS directory:

```bash
yarn install
```

### Development Server

```bash
cd packages/canvas-study-stream
yarn dev
```

### Building

```bash
yarn build
```

### Testing

```bash
yarn test
```

### Type Checking

```bash
yarn type-check
```

## Implementation Tasks

- [ ] Issue #5: TypeScript Type Definitions
- [ ] Issue #1: QuickLinksSelector Component
- [ ] Issue #7: MusicPlayer Component
- [ ] Issue #8: useAudioPlayer Hook
- [ ] Issue #4: TaskbarWidget Integration
- [ ] Issue #3: Styling & CSS
- [ ] Issue #10: Unit Tests
- [ ] Issue #9: Documentation

## License

AGPL-3.0
