'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export default function TopBar({ onSearch, showSearch = true }: TopBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const goBack = () => {
    router.back();
  };

  const goForward = () => {
    router.forward();
  };

  return (
    <header className="h-16 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800 px-6 flex items-center justify-between">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-black bg-opacity-70 text-white hover:bg-gray-800"
          >
            ←
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goForward}
            className="w-8 h-8 rounded-full bg-black bg-opacity-70 text-white hover:bg-gray-800"
          >
            →
          </Button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-full",
                  "bg-white text-black placeholder-gray-500",
                  "border-none focus:ring-2 focus:ring-green-500 focus:outline-none",
                  "hover:bg-gray-100 transition-colors"
                )}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">🔍</span>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        {/* Premium Badge */}
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold"
        >
          Explore Premium
        </Button>

        {/* Install App */}
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800 hidden md:flex"
        >
          📱 Install App
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 rounded-full bg-black bg-opacity-70 text-white hover:bg-gray-800"
        >
          🔔
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa6dd4c1-15f9-4039-a874-160abe97d99b.png" 
                  alt="User Avatar" 
                />
                <AvatarFallback className="bg-green-600 text-white">U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 bg-gray-900 border-gray-700 text-white"
            align="end" 
            forceMount
          >
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-gray-400">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Account
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Upgrade to Premium
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}