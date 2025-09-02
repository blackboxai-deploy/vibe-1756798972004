// TypeScript interfaces for Spotify UI Clone

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl?: string;
  isExplicit?: boolean;
  popularity?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  owner: string;
  isPublic: boolean;
  trackCount: number;
  totalDuration: number; // in seconds
  tracks: Track[];
  followers?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: Date;
  trackCount: number;
  totalDuration: number;
  tracks: Track[];
  genre?: string;
  label?: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  isVerified: boolean;
  genres: string[];
  monthlyListeners?: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  isPremium: boolean;
  country: string;
  followers: number;
  following: number;
  playlists: Playlist[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'track' | 'context';
  queue: Track[];
  previousTracks: Track[];
}

export interface SearchResults {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
}

export type ViewType = 'home' | 'search' | 'library' | 'playlist' | 'album' | 'artist';

export type RepeatMode = 'off' | 'track' | 'context';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface CategoryCard {
  id: string;
  title: string;
  color: string;
  imageUrl: string;
}