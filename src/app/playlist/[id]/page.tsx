'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { mockPlaylists } from '@/lib/mock-data';
import { usePlayer } from '@/lib/player-context';
import TrackList from '@/components/music/TrackList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PlaylistPage() {
  const params = useParams();
  const playlistId = params?.id as string;
  const { playTrack, state } = usePlayer();
  
  const playlist = mockPlaylists.find(p => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 py-16">
          <div className="text-6xl mb-4">🎵</div>
          <h2 className="text-xl font-semibold text-white mb-2">Playlist not found</h2>
          <p>The playlist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handlePlayPlaylist = () => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    }
    if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    }
    return followers.toString();
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div 
        className="relative bg-gradient-to-b from-purple-900 via-purple-800 to-gray-900"
        style={{
          background: `linear-gradient(180deg, rgba(83, 0, 83, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)`
        }}
      >
        <div className="p-6 pb-8">
          <div className="flex items-end space-x-6">
            {/* Playlist Cover */}
            <div className="flex-shrink-0">
              <div className="w-60 h-60 bg-gray-700 rounded shadow-2xl overflow-hidden">
                <Image
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e1640b98-53e1-458a-9415-1580cebae154.png';
                  }}
                />
              </div>
            </div>

            {/* Playlist Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium mb-2">Playlist</p>
              <h1 className="text-white text-4xl md:text-6xl font-black mb-4 leading-none">
                {playlist.name}
              </h1>
              <p className="text-gray-300 text-base mb-4 max-w-2xl">
                {playlist.description}
              </p>
              <div className="flex items-center text-sm text-gray-300 space-x-1">
                <span className="font-semibold text-white">{playlist.owner}</span>
                <span>•</span>
                <span>{playlist.followers ? formatFollowers(playlist.followers) : '0'} followers</span>
                <span>•</span>
                <span>{playlist.trackCount} songs,</span>
                <span className="text-gray-400">
                  about {formatDuration(playlist.totalDuration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black px-6 py-6">
        <div className="flex items-center space-x-6">
          <Button
            onClick={handlePlayPlaylist}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg hover:scale-105 transition-all duration-200"
          >
            {state.currentTrack && playlist.tracks.some(t => t.id === state.currentTrack?.id) && state.isPlaying ? '⏸️' : '▶️'}
          </Button>
          
          <Button
            variant="ghost"
            className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
          >
            💚
          </Button>
          
          <Button
            variant="ghost"
            className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
          >
            ⬇️
          </Button>
          
          <Button
            variant="ghost"
            className="w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
          >
            ⋯
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="bg-black bg-opacity-60 px-6 pb-6">
        <TrackList 
          tracks={playlist.tracks}
          showIndex={true}
          showAlbum={true}
          showDateAdded={false}
        />
        
        {/* Recommendations Section */}
        <Separator className="my-8 bg-gray-700" />
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recommended based on this playlist
          </h3>
          <div className="text-gray-400 text-sm">
            Discover new music that fits perfectly with this playlist.
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20 bg-black"></div>
    </div>
  );
}