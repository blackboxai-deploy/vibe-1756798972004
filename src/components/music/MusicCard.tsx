'use client';

import React from 'react';
import Image from 'next/image';
import { usePlayer } from '@/lib/player-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Track, Playlist, Album } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MusicCardProps {
  type: 'track' | 'playlist' | 'album';
  data: Track | Playlist | Album;
  size?: 'small' | 'medium' | 'large';
  showPlayButton?: boolean;
  className?: string;
}

export default function MusicCard({ 
  type, 
  data, 
  size = 'medium', 
  showPlayButton = true,
  className 
}: MusicCardProps) {
  const { playTrack } = usePlayer();

  const handlePlay = () => {
    if (type === 'track') {
      playTrack(data as Track);
    } else if (type === 'playlist') {
      const playlist = data as Playlist;
      if (playlist.tracks.length > 0) {
        playTrack(playlist.tracks[0]);
      }
    } else if (type === 'album') {
      const album = data as Album;
      if (album.tracks.length > 0) {
        playTrack(album.tracks[0]);
      }
    }
  };

  const getImageUrl = () => {
    if (type === 'track') return (data as Track).coverUrl;
    if (type === 'playlist') return (data as Playlist).coverUrl;
    if (type === 'album') return (data as Album).coverUrl;
    return '';
  };

  const getTitle = () => {
    if (type === 'track') return (data as Track).title;
    if (type === 'playlist') return (data as Playlist).name;
    if (type === 'album') return (data as Album).title;
    return '';
  };

  const getSubtitle = () => {
    if (type === 'track') return (data as Track).artist;
    if (type === 'playlist') {
      const playlist = data as Playlist;
      return `by ${playlist.owner}`;
    }
    if (type === 'album') return (data as Album).artist;
    return '';
  };

  const getDescription = () => {
    if (type === 'playlist') {
      const playlist = data as Playlist;
      return playlist.description;
    }
    return null;
  };

  const sizeClasses = {
    small: 'w-32',
    medium: 'w-44',
    large: 'w-52'
  };

  const imageSize = {
    small: 128,
    medium: 176,
    large: 208
  };

  return (
    <Card 
      className={cn(
        "bg-gray-800 border-none hover:bg-gray-700 transition-all duration-300 group cursor-pointer",
        sizeClasses[size],
        className
      )}
    >
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className={cn(
            "relative overflow-hidden",
            type === 'track' || type === 'album' ? 'rounded-lg' : 'rounded-lg',
            "shadow-lg"
          )}>
            <Image
              src={getImageUrl()}
              alt={getTitle()}
              width={imageSize[size]}
              height={imageSize[size]}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cfde5419-6fb8-4712-a396-97f3638ca329.png';
              }}
            />
          </div>
          
          {/* Play Button Overlay */}
          {showPlayButton && (
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={handlePlay}
                className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg hover:scale-105 transition-all duration-200"
              >
                ▶️
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-sm line-clamp-1 hover:underline">
            {getTitle()}
          </h3>
          
          <p className="text-gray-400 text-xs line-clamp-2">
            {getSubtitle()}
          </p>
          
          {getDescription() && (
            <p className="text-gray-500 text-xs line-clamp-2 mt-1">
              {getDescription()}
            </p>
          )}
          
          {/* Track Count for Playlists/Albums */}
          {(type === 'playlist' || type === 'album') && (
            <p className="text-gray-500 text-xs mt-1">
              {type === 'playlist' 
                ? `${(data as Playlist).trackCount} songs`
                : `${(data as Album).trackCount} tracks`
              }
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}