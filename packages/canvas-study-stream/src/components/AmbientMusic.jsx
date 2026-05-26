import React, { useState } from 'react';

export default function AmbientMusicButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="canvas-study-stream-container">
      <button 
        className="ambient-music-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Ambient Music"
      >
        🎵 Study Stream Music
      </button>

      {isOpen && (
        <div className="ambient-music-panel" data-testid="music-panel">
          <h3>Ambient Audio Streams</h3>
          <p>Select a track to play alongside your coursework.</p>
          {/* Audio player controls will inject here */}
        </div>
      )}
    </div>
  );
}