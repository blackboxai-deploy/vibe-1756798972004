'use client';

import React from 'react';
import Link from 'next/link';
import { mockPlaylists, recentlyPlayed, madeForYou, featuredPlaylists } from '@/lib/mock-data';
import MusicCard from '@/components/music/MusicCard';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const quickPickPlaylists = mockPlaylists.slice(0, 6);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {getGreeting()}
        </h1>
        <p className="text-gray-400">
          Discover new music and revisit your favorites
        </p>
      </div>

      {/* Quick Picks */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">
          Quick picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickPickPlaylists.map((playlist) => (
            <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
              <div className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors group cursor-pointer">
                <div className="w-16 h-16 bg-gray-700 flex-shrink-0">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/651d6377-9897-4248-856a-8ace80095c8c.png';
                    }}
                  />
                </div>
                <div className="flex-1 px-4 py-2 min-w-0">
                  <div className="text-white font-medium text-sm truncate">
                    {playlist.name}
                  </div>
                  <div className="text-gray-400 text-xs truncate">
                    by {playlist.owner}
                  </div>
                </div>
                <div className="mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg"
                  >
                    ▶️
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Recently played
          </h2>
          <Button variant="link" className="text-gray-400 hover:text-white text-sm">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {recentlyPlayed.map((track) => (
            <MusicCard
              key={track.id}
              type="track"
              data={track}
              size="small"
            />
          ))}
        </div>
      </section>

      {/* Made For You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Made for you
          </h2>
          <Button variant="link" className="text-gray-400 hover:text-white text-sm">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {madeForYou.map((playlist) => (
            <MusicCard
              key={playlist.id}
              type="playlist"
              data={playlist}
              size="medium"
            />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Featured playlists
          </h2>
          <Button variant="link" className="text-gray-400 hover:text-white text-sm">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredPlaylists.slice(0, 5).map((playlist) => (
            <MusicCard
              key={playlist.id}
              type="playlist"
              data={playlist}
              size="medium"
            />
          ))}
        </div>
      </section>

      {/* Recently Played Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Popular artists
          </h2>
          <Button variant="link" className="text-gray-400 hover:text-white text-sm">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recentlyPlayed.slice(0, 5).map((track) => (
            <div key={track.id} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors group cursor-pointer">
              <div className="relative mb-4">
                <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg">
                  <img
                    src={track.coverUrl}
                    alt={track.artist}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/046bdf59-17e2-4b41-b5b2-cd2d269fabe5.png';
                    }}
                  />
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    ▶️
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm truncate hover:underline">
                  {track.artist}
                </h3>
                <p className="text-gray-400 text-xs">Artist</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}