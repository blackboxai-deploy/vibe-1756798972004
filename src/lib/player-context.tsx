'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PlayerState, Track } from './types';

// Initial player state
const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 70,
  isMuted: false,
  isShuffled: false,
  repeatMode: 'off',
  queue: [],
  previousTracks: []
};

// Action types
type PlayerAction = 
  | { type: 'PLAY_TRACK'; payload: Track }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'TOGGLE_SHUFFLE' }
  | { type: 'SET_REPEAT_MODE'; payload: 'off' | 'track' | 'context' }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREVIOUS_TRACK' }
  | { type: 'SET_QUEUE'; payload: Track[] }
  | { type: 'ADD_TO_QUEUE'; payload: Track };

// Player reducer
function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
        currentTime: 0,
        duration: action.payload.duration
      };
    
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false
      };
    
    case 'RESUME':
      return {
        ...state,
        isPlaying: true
      };
    
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload
      };
    
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload
      };
    
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
        isMuted: action.payload === 0
      };
    
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
        volume: state.isMuted ? 70 : 0
      };
    
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled
      };
    
    case 'SET_REPEAT_MODE':
      return {
        ...state,
        repeatMode: action.payload
      };
    
    case 'NEXT_TRACK':
      if (state.queue.length > 0) {
        const nextTrack = state.queue[0];
        return {
          ...state,
          currentTrack: nextTrack,
          queue: state.queue.slice(1),
          previousTracks: state.currentTrack 
            ? [...state.previousTracks, state.currentTrack]
            : state.previousTracks,
          currentTime: 0,
          duration: nextTrack.duration
        };
      }
      return state;
    
    case 'PREVIOUS_TRACK':
      if (state.previousTracks.length > 0) {
        const previousTrack = state.previousTracks[state.previousTracks.length - 1];
        return {
          ...state,
          currentTrack: previousTrack,
          previousTracks: state.previousTracks.slice(0, -1),
          queue: state.currentTrack 
            ? [state.currentTrack, ...state.queue]
            : state.queue,
          currentTime: 0,
          duration: previousTrack.duration
        };
      }
      return state;
    
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload
      };
    
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload]
      };
    
    default:
      return state;
  }
}

// Context interface
interface PlayerContextType {
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: 'off' | 'track' | 'context') => void;
}

// Create context
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Helper functions
  const playTrack = (track: Track) => {
    dispatch({ type: 'PLAY_TRACK', payload: track });
  };

  const togglePlay = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' });
  };

  const previousTrack = () => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const setCurrentTime = (time: number) => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  };

  const toggleShuffle = () => {
    dispatch({ type: 'TOGGLE_SHUFFLE' });
  };

  const setRepeatMode = (mode: 'off' | 'track' | 'context') => {
    dispatch({ type: 'SET_REPEAT_MODE', payload: mode });
  };

  const value = {
    state,
    dispatch,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    setCurrentTime,
    toggleShuffle,
    setRepeatMode
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook to use player context
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}