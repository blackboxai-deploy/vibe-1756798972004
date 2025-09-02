'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockPlaylists, mockTracks, recentlyPlayed } from '@/lib/mock-data';
import MusicCard from '@/components/music/MusicCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'creator'>('recent');

  const userPlaylists = mockPlaylists.filter(p => p.owner === 'You');
  const likedSongs = mockTracks.slice(0, 50); // Mock liked songs
  const savedAlbums = []; // Mock empty for now

  const filteredPlaylists = userPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'creator':
        return a.owner.localeCompare(b.owner);
      case 'recent':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const likedSongsItem = {
    id: 'liked',
    name: 'Liked Songs',
    owner: 'You',
    trackCount: likedSongs.length,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f946a3ce-17fd-47c6-9964-727972724fc4.png',
    type: 'liked' as const
  };
  
  const playlistItems = userPlaylists.slice(0, 3).map(playlist => ({ ...playlist, type: 'playlist' as const }));
  
  const quickAccessItems = [likedSongsItem, ...playlistItems];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Your Library</h1>
            <p className="text-gray-400">Manage your saved music and playlists</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              📁
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
              className="text-gray-400 hover:text-white"
            >
              {viewType === 'grid' ? '☰' : '▦'}
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'alphabetical' | 'creator')}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 text-sm focus:border-green-500 focus:outline-none"
            >
              <option value="recent">Recently Added</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="creator">Creator</option>
            </select>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessItems.map((item) => (
              <Link 
                key={item.id} 
                href={'type' in item && item.type === 'liked' ? '/liked' : `/playlist/${item.id}`}
              >
                <div className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors group cursor-pointer">
                  <div className="w-16 h-16 bg-gray-700 flex-shrink-0">
                    <img
                      src={item.coverUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba5a272e-cfc4-4a73-9687-05ce56fcfa01.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 px-4 py-2 min-w-0">
                    <div className="text-white font-medium text-sm truncate">
                      {item.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {item.trackCount} songs
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-6">
            <TabsTrigger value="playlists" className="data-[state=active]:bg-gray-700">
              Playlists ({userPlaylists.length})
            </TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-gray-700">
              Artists (0)
            </TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-gray-700">
              Albums ({savedAlbums.length})
            </TabsTrigger>
            <TabsTrigger value="downloaded" className="data-[state=active]:bg-gray-700">
              Downloaded (0)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playlists">
            {sortedPlaylists.length > 0 ? (
              <div className={cn(
                viewType === 'grid' 
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  : "space-y-2"
              )}>
                {viewType === 'grid' ? (
                  sortedPlaylists.map((playlist) => (
                    <MusicCard
                      key={playlist.id}
                      type="playlist"
                      data={playlist}
                      size="small"
                    />
                  ))
                ) : (
                  sortedPlaylists.map((playlist) => (
                    <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                      <div className="flex items-center p-2 hover:bg-gray-800 rounded transition-colors group">
                        <div className="w-12 h-12 bg-gray-700 rounded mr-4 flex-shrink-0">
                          <img
                            src={playlist.coverUrl}
                            alt={playlist.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8a5b1649-fad2-4070-acfc-9f21e1c3dead.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm truncate">
                            {playlist.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {playlist.trackCount} songs • by {playlist.owner}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-400 text-black"
                          >
                            ▶️
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400">
                  <div className="text-6xl mb-4">🎵</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {searchQuery ? `No playlists found for "${searchQuery}"` : "Create your first playlist"}
                  </h3>
                  <p className="mb-6">
                    {searchQuery ? 'Try searching with different keywords.' : "It's easy, we'll help you"}
                  </p>
                  {!searchQuery && (
                    <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
                      Create playlist
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="artists">
            <div className="text-center py-16">
              <div className="text-gray-400">
                <div className="text-6xl mb-4">🎤</div>
                <h3 className="text-xl font-semibold text-white mb-2">Follow your first artist</h3>
                <p>Follow artists you love to see what they're up to.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="albums">
            <div className="text-center py-16">
              <div className="text-gray-400">
                <div className="text-6xl mb-4">💿</div>
                <h3 className="text-xl font-semibold text-white mb-2">Save your first album</h3>
                <p>Save albums to access them quickly and easily.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="downloaded">
            <div className="text-center py-16">
              <div className="text-gray-400">
                <div className="text-6xl mb-4">⬇️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Download music for offline listening</h3>
                <p>You haven't downloaded any music yet.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recently Played Section */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-semibold text-white mb-4">Recently played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {recentlyPlayed.slice(0, 6).map((track) => (
            <MusicCard
              key={track.id}
              type="track"
              data={track}
              size="small"
            />
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}