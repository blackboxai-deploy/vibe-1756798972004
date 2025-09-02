'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/lib/player-context';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function MusicPlayer() {
  const { state, togglePlay, nextTrack, previousTrack, setVolume, setCurrentTime, toggleShuffle, setRepeatMode } = usePlayer();
  const [localCurrentTime, setLocalCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Simulate audio progress
  useEffect(() => {
    if (state.isPlaying && state.currentTrack && !isDragging) {
      const interval = setInterval(() => {
        setLocalCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= state.duration) {
            nextTrack();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [state.isPlaying, state.currentTrack, state.duration, nextTrack, isDragging]);

  // Update context when local time changes
  useEffect(() => {
    if (!isDragging) {
      setCurrentTime(localCurrentTime);
    }
  }, [localCurrentTime, setCurrentTime, isDragging]);

  // Reset local time when track changes
  useEffect(() => {
    if (state.currentTime === 0) {
      setLocalCurrentTime(0);
    }
  }, [state.currentTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    setLocalCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const getRepeatIcon = () => {
    switch (state.repeatMode) {
      case 'track':
        return '🔂';
      case 'context':
        return '🔁';
      default:
        return '🔁';
    }
  };

  const cycleRepeatMode = () => {
    const modes: ('off' | 'track' | 'context')[] = ['off', 'context', 'track'];
    const currentIndex = modes.indexOf(state.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  if (!state.currentTrack) {
    return null;
  }

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      {/* Current Track Info */}
      <div className="flex items-center space-x-4 w-80">
        <div className="w-14 h-14 bg-gray-800 rounded overflow-hidden flex-shrink-0">
          <Image
            src={state.currentTrack.coverUrl}
            alt={state.currentTrack.title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/28e12976-6f0a-4359-a595-d903a3dcd2a7.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">
            {state.currentTrack.title}
          </div>
          <div className="text-gray-400 text-xs truncate">
            {state.currentTrack.artist}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8"
        >
          💚
        </Button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleShuffle}
            className={cn(
              "text-gray-400 hover:text-white w-8 h-8",
              state.isShuffled && "text-green-500"
            )}
          >
            🔀
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={previousTrack}
            className="text-gray-400 hover:text-white w-8 h-8"
          >
            ⏮️
          </Button>
          
          <Button
            variant="ghost"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-transform"
          >
            {state.isPlaying ? '⏸️' : '▶️'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTrack}
            className="text-gray-400 hover:text-white w-8 h-8"
          >
            ⏭️
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleRepeatMode}
            className={cn(
              "text-gray-400 hover:text-white w-8 h-8",
              state.repeatMode !== 'off' && "text-green-500"
            )}
          >
            {getRepeatIcon()}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(localCurrentTime)}
          </span>
          <div className="flex-1">
            <Slider
              value={[localCurrentTime]}
              max={state.duration}
              step={1}
              onValueChange={handleProgressChange}
              onMouseDown={handleProgressMouseDown}
              onMouseUp={handleProgressMouseUp}
              className="w-full"
            />
          </div>
          <span className="text-xs text-gray-400 w-10">
            {formatTime(state.duration)}
          </span>
        </div>
      </div>

      {/* Volume and Options */}
      <div className="flex items-center space-x-2 w-80 justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white w-8 h-8 hidden md:flex"
        >
          🎤
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white w-8 h-8 hidden md:flex"
        >
          📋
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white w-8 h-8 hidden lg:flex"
        >
          🖥️
        </Button>
        
        <div className="flex items-center space-x-2 hidden sm:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVolume(state.isMuted ? 70 : 0)}
            className="text-gray-400 hover:text-white w-8 h-8"
          >
            {state.volume === 0 || state.isMuted ? '🔇' : state.volume < 50 ? '🔉' : '🔊'}
          </Button>
          <div className="w-20">
            <Slider
              value={[state.volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white w-8 h-8 hidden xl:flex"
        >
          📺
        </Button>
      </div>
    </div>
  );
}