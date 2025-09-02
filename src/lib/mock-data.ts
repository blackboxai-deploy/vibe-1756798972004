// Mock data for Spotify UI Clone
import { Track, Playlist, Album, Artist, CategoryCard } from './types';

// Mock tracks
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c2115878-6bb0-429e-85e5-3d479e913907.png',
    isExplicit: false,
    popularity: 95
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fac5336a-b801-4132-b836-cd77cd94ecce.png',
    isExplicit: false,
    popularity: 89
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d2624298-80c7-4388-ab37-920297440231.png',
    isExplicit: false,
    popularity: 92
  },
  {
    id: '4',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/de21cb6a-16cb-4f00-a095-3ca1862fe8f6.png',
    isExplicit: false,
    popularity: 88
  },
  {
    id: '5',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1162a13d-c370-4324-9675-df845c18596c.png',
    isExplicit: false,
    popularity: 90
  },
  {
    id: '6',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    album: 'Midnights',
    duration: 200,
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/39c23953-f582-46c7-8ed6-13c6395c882d.png',
    isExplicit: false,
    popularity: 94
  }
];

// Mock playlists
export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    description: 'The biggest hits right now.',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/22196f79-8031-4f12-a886-9326f2189624.png',
    owner: 'Spotify',
    isPublic: true,
    trackCount: 50,
    totalDuration: 10800,
    tracks: mockTracks.slice(0, 4),
    followers: 32500000,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Chill Hits',
    description: 'Kick back to the best new and recent songs.',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/68f5a0d8-b188-4bb1-8e77-3cbbf0056393.png',
    owner: 'Spotify',
    isPublic: true,
    trackCount: 42,
    totalDuration: 9200,
    tracks: mockTracks.slice(2, 6),
    followers: 15600000,
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    name: 'My Favorites',
    description: 'Your favorite songs all in one place.',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6d7ed17a-366d-4a9b-a0c1-992b212c9dec.png',
    owner: 'You',
    isPublic: false,
    trackCount: 127,
    totalDuration: 25400,
    tracks: mockTracks,
    followers: 0,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '4',
    name: 'Discover Weekly',
    description: 'Your weekly mixtape of fresh music.',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a461de63-c1eb-4046-8170-2f235d0fe4e6.png',
    owner: 'Spotify',
    isPublic: false,
    trackCount: 30,
    totalDuration: 7200,
    tracks: mockTracks.slice(0, 3),
    followers: 0,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '5',
    name: 'Workout Mix',
    description: 'High energy songs to fuel your workout.',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/40bf01b2-8505-47fe-bb33-0327b9e89f64.png',
    owner: 'You',
    isPublic: true,
    trackCount: 65,
    totalDuration: 15600,
    tracks: mockTracks.slice(1, 5),
    followers: 245,
    createdAt: new Date('2023-09-12'),
    updatedAt: new Date('2024-01-10')
  }
];

// Mock albums
export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/699ffdc2-3496-4097-8335-8e164f046c83.png',
    releaseDate: new Date('2020-03-20'),
    trackCount: 14,
    totalDuration: 3360,
    tracks: [mockTracks[0]],
    genre: 'R&B',
    label: 'XO/Republic Records'
  },
  {
    id: '2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7966c494-3380-4da5-9b47-8f00f6ac94bc.png',
    releaseDate: new Date('2020-03-27'),
    trackCount: 11,
    totalDuration: 2220,
    tracks: [mockTracks[4]],
    genre: 'Pop',
    label: 'Warner Records'
  },
  {
    id: '3',
    title: 'Midnights',
    artist: 'Taylor Swift',
    coverUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/86c72374-8379-4079-a410-c3fc735dad11.png',
    releaseDate: new Date('2022-10-21'),
    trackCount: 13,
    totalDuration: 2640,
    tracks: [mockTracks[5]],
    genre: 'Pop',
    label: 'Republic Records'
  }
];

// Mock artists
export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3a257891-2698-4649-abcf-fd20a0c59c35.png',
    followers: 95000000,
    isVerified: true,
    genres: ['R&B', 'Pop', 'Electronic'],
    monthlyListeners: 89000000
  },
  {
    id: '2',
    name: 'Taylor Swift',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f8af275-1711-4862-8456-1a6cbd8f0ee6.png',
    followers: 78000000,
    isVerified: true,
    genres: ['Pop', 'Country', 'Alternative'],
    monthlyListeners: 82000000
  },
  {
    id: '3',
    name: 'Dua Lipa',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3130cb27-a630-45c3-b384-fa3b6534bfc6.png',
    followers: 45000000,
    isVerified: true,
    genres: ['Pop', 'Dance', 'Electronic'],
    monthlyListeners: 67000000
  }
];

// Mock search categories
export const searchCategories: CategoryCard[] = [
  {
    id: '1',
    title: 'Podcasts',
    color: 'bg-green-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/25056fda-2de3-42d8-b2a2-019ebc95d1ac.png'
  },
  {
    id: '2',
    title: 'Charts',
    color: 'bg-red-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0408e170-318a-4bc3-9a51-a57746933915.png'
  },
  {
    id: '3',
    title: 'New Releases',
    color: 'bg-blue-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f979dd3-0afc-4f77-b7fd-3aa2255bb8c3.png'
  },
  {
    id: '4',
    title: 'Hip-Hop',
    color: 'bg-purple-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a7e6966e-60f6-4c4c-98c1-fa2fe4dd60f4.png'
  },
  {
    id: '5',
    title: 'Rock',
    color: 'bg-orange-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4271b781-c19f-46ac-bf28-bb457d260b41.png'
  },
  {
    id: '6',
    title: 'Pop',
    color: 'bg-pink-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ac6abf7-6b29-4e85-ade9-c403e29d6e62.png'
  },
  {
    id: '7',
    title: 'Electronic',
    color: 'bg-cyan-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/af7f2df2-95e4-4e69-9380-4a6f09379b32.png'
  },
  {
    id: '8',
    title: 'Jazz',
    color: 'bg-yellow-600',
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d4396cf4-94e3-49a3-8b4e-cfe9efb5223b.png'
  }
];

// Recently played tracks
export const recentlyPlayed: Track[] = mockTracks.slice(0, 6);

// Made for you playlists
export const madeForYou: Playlist[] = mockPlaylists.slice(0, 3);

// Featured playlists
export const featuredPlaylists: Playlist[] = mockPlaylists;