'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/lib/player-context';
import { Track } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TrackItemProps {
  track: Track;
  index?: number;
  showAlbum?: boolean;
  showDateAdded?: boolean;
  className?: string;
}

export default function TrackItem({
  track,
  index,
  showAlbum = true,
  showDateAdded = false,
  className = ""
}: TrackItemProps) {
  const { playTrack, state } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentTrack = state.currentTrack?.id === track.id;

  const handlePlay = () => {
    playTrack(track);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors group cursor-pointer",
        isCurrentTrack && "bg-gray-800",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      {/* Index/Play Button */}
      {index !== undefined && (
        <div className="col-span-1 flex items-center">
          {isHovered || isCurrentTrack ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 text-white hover:text-green-500"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
            >
              {isCurrentTrack && state.isPlaying ? '⏸️' : '▶️'}
            </Button>
          ) : (
            <span className={cn(
              "text-sm",
              isCurrentTrack ? "text-green-500" : "text-gray-400"
            )}>
              {index}
            </span>
          )}
        </div>
      )}

      {/* Track Info */}
      <div className={cn(
        "flex items-center space-x-3",
        index !== undefined ? "col-span-6" : "col-span-7"
      )}>
        <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden flex-shrink-0">
          <Image
            src={track.coverUrl}
            alt={track.title}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f55d1253-840f-472b-9745-95c419f1ebe6.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className={cn(
            "text-sm font-medium truncate",
            isCurrentTrack ? "text-green-500" : "text-white"
          )}>
            {track.title}
            {track.isExplicit && (
              <span className="ml-2 text-xs bg-gray-600 text-gray-300 px-1 rounded">
                E
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {track.artist}
          </div>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="col-span-3 hidden md:flex items-center">
          <span className="text-sm text-gray-400 truncate hover:text-white hover:underline cursor-pointer">
            {track.album}
          </span>
        </div>
      )}

      {/* Date Added */}
      {showDateAdded && (
        <div className="col-span-2 hidden lg:flex items-center">
          <span className="text-sm text-gray-400">
            {formatDate(new Date())}
          </span>
        </div>
      )}

      {/* Duration and Options */}
      <div className="col-span-2 flex items-center justify-end space-x-2">
        {(isHovered || isCurrentTrack) && (
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              // Add to liked songs logic here
            }}
          >
            💚
          </Button>
        )}
        
        <span className="text-sm text-gray-400">
          {formatDuration(track.duration)}
        </span>
        
        {(isHovered || isCurrentTrack) && (
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              // More options logic here
            }}
          >
            ⋯
          </Button>
        )}
      </div>
    </div>
  );
}