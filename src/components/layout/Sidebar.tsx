'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { mockPlaylists } from '@/lib/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'Search', href: '/search', icon: '🔍' },
  { name: 'Your Library', href: '/library', icon: '📚' }
];

const libraryItems = [
  { name: 'Liked Songs', href: '/liked', icon: '💚' },
  { name: 'Recently Played', href: '/recent', icon: '🕐' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Main Navigation */}
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="text-2xl font-bold text-white">
            <span className="text-green-500">●</span> Spotify
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-medium transition-colors",
                  "hover:bg-gray-800 hover:text-white",
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400"
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <Separator className="bg-gray-800" />

      {/* Library Section */}
      <div className="px-6 py-4">
        <nav className="space-y-2">
          {libraryItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-medium transition-colors",
                  "hover:bg-gray-800 hover:text-white",
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400"
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <Separator className="bg-gray-800" />

      {/* Playlists */}
      <div className="flex-1 px-6 py-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Playlists
          </h3>
        </div>
        
        <ScrollArea className="h-full">
          <div className="space-y-1">
            {mockPlaylists.map((playlist) => (
              <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal transition-colors",
                    "hover:bg-gray-800 hover:text-white",
                    pathname === `/playlist/${playlist.id}`
                      ? "bg-gray-800 text-white"
                      : "text-gray-400"
                  )}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs">🎵</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {playlist.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        by {playlist.owner}
                      </div>
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-gray-800">
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500"
        >
          Install App
        </Button>
      </div>
    </div>
  );
}