'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchCategories, mockTracks, mockPlaylists, mockAlbums, mockArtists } from '@/lib/mock-data';
import MusicCard from '@/components/music/MusicCard';
import TrackList from '@/components/music/TrackList';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      // In a real app, this would trigger an API call
    }
  };

  // Mock search results - in a real app, these would come from an API
  const searchResults = {
    tracks: mockTracks.filter(track => 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    playlists: mockPlaylists.filter(playlist =>
      playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    albums: mockAlbums.filter(album =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    artists: mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  const hasResults = searchResults.tracks.length > 0 || 
                   searchResults.playlists.length > 0 || 
                   searchResults.albums.length > 0 || 
                   searchResults.artists.length > 0;

  if (!hasSearched) {
    return (
      <div className="p-6">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-md">
            <Input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
            />
          </form>
        </div>

        {/* Browse Categories */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {searchCategories.map((category) => (
              <div
                key={category.id}
                className={cn(
                  "relative h-24 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105",
                  category.color
                )}
              >
                <div className="p-4 h-full flex flex-col justify-between">
                  <h3 className="text-white font-bold text-sm">{category.title}</h3>
                  <div className="absolute bottom-0 right-0 w-16 h-16 transform rotate-12 translate-x-2 translate-y-2">
                    <img
                      src={category.imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover rounded shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6c4a5ecb-750f-4012-94d8-15133f69f76f.png';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-md">
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500"
          />
        </form>
      </div>

      {/* Search Results */}
      {hasResults ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All</TabsTrigger>
            <TabsTrigger value="songs" className="data-[state=active]:bg-gray-700">Songs</TabsTrigger>
            <TabsTrigger value="artists" className="data-[state=active]:bg-gray-700">Artists</TabsTrigger>
            <TabsTrigger value="albums" className="data-[state=active]:bg-gray-700">Albums</TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-gray-700">Playlists</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Top Result */}
            {searchResults.tracks.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Top result</h2>
                <div className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 max-w-sm cursor-pointer transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={searchResults.tracks[0].coverUrl}
                        alt={searchResults.tracks[0].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d35b2c09-490a-4b2f-803d-59dbefdbe396.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-white truncate">
                        {searchResults.tracks[0].title}
                      </h3>
                      <p className="text-gray-400">
                        by {searchResults.tracks[0].artist} • Song
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg"
                    >
                      ▶️
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* Songs */}
            {searchResults.tracks.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Songs</h2>
                <TrackList tracks={searchResults.tracks.slice(0, 4)} showIndex={false} />
              </section>
            )}

            {/* Artists */}
            {searchResults.artists.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Artists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.artists.slice(0, 5).map((artist) => (
                    <div key={artist.id} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors group cursor-pointer">
                      <div className="relative mb-4">
                        <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg">
                          <img
                            src={artist.imageUrl}
                            alt={artist.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ad4844a-609f-495e-8834-bed286fa83cf.png';
                            }}
                          />
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-black shadow-lg"
                          >
                            ▶️
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm truncate">
                          {artist.name}
                        </h3>
                        <p className="text-gray-400 text-xs">Artist</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {searchResults.albums.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.albums.map((album) => (
                    <MusicCard
                      key={album.id}
                      type="album"
                      data={album}
                      size="medium"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {searchResults.playlists.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Playlists</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {searchResults.playlists.map((playlist) => (
                    <MusicCard
                      key={playlist.id}
                      type="playlist"
                      data={playlist}
                      size="medium"
                    />
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          <TabsContent value="songs">
            <TrackList tracks={searchResults.tracks} showIndex={false} />
          </TabsContent>

          <TabsContent value="artists">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.artists.map((artist) => (
                <div key={artist.id} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors group cursor-pointer">
                  <div className="relative mb-4">
                    <div className="w-full aspect-square rounded-full overflow-hidden shadow-lg">
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f8134d2-277c-4ba8-b20d-c77b3f635628.png';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm truncate">
                      {artist.name}
                    </h3>
                    <p className="text-gray-400 text-xs">Artist</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="albums">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.albums.map((album) => (
                <MusicCard
                  key={album.id}
                  type="album"
                  data={album}
                  size="medium"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.playlists.map((playlist) => (
                <MusicCard
                  key={playlist.id}
                  type="playlist"
                  data={playlist}
                  size="medium"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No results found for "{searchQuery}"
            </h3>
            <p>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading search...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}