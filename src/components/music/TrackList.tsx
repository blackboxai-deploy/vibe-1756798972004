'use client';

import React from 'react';
import { Track } from '@/lib/types';
import TrackItem from './TrackItem';

interface TrackListProps {
  tracks: Track[];
  showIndex?: boolean;
  showAlbum?: boolean;
  showDateAdded?: boolean;
  className?: string;
}

export default function TrackList({ 
  tracks, 
  showIndex = true, 
  showAlbum = true, 
  showDateAdded = false,
  className = ""
}: TrackListProps) {

  return (
    <div className={`text-white ${className}`}>
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
        {showIndex && <div className="col-span-1">#</div>}
        <div className={showIndex ? "col-span-6" : "col-span-7"}>Title</div>
        {showAlbum && <div className="col-span-3 hidden md:block">Album</div>}
        {showDateAdded && <div className="col-span-2 hidden lg:block">Date added</div>}
        <div className="col-span-2 text-right">🕐</div>
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={showIndex ? index + 1 : undefined}
            showAlbum={showAlbum}
            showDateAdded={showDateAdded}
          />
        ))}
      </div>
    </div>
  );
}