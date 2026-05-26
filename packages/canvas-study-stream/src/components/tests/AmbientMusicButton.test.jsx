import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AmbientMusicButton from '../AmbientMusicButton';

describe('AmbientMusicButton - QA Verification Loop', () => {
  
  test('should toggle music panel visibility on button click', () => {
    // 1. ARRANGE
    render(<AmbientMusicButton />);
    
    // Assert initial state: button exists, panel is hidden
    const toggleButton = screen.getByRole('button', { name: /toggle ambient music/i });
    expect(toggleButton).toBeInTheDocument();
    expect(screen.queryByTestId('music-panel')).not.intoBeInTheDocument();

    // 2. ACT
    fireEvent.click(toggleButton);

    // 3. ASSERT
    const musicPanel = screen.getByTestId('music-panel');
    expect(musicPanel).toBeInTheDocument();
    expect(musicPanel).toHaveTextContent('Ambient Audio Streams');

    // 4. ACT AGAIN (Toggle off)
    fireEvent.click(toggleButton);

    // 5. ASSERT AGAIN
    expect(screen.queryByTestId('music-panel')).not.toBeInTheDocument();
  });
});