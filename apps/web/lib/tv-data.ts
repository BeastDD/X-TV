// TV data inspired by reference version at F:\New_folder\visual-x (mockData.ts)
// 7 channels from DOCUMENTATION + playable public video samples for demo.
// Each channel has videos with url (public mp4), title, username.
// "Infinite" playback: cycle or random on switch/next.

export interface Video {
  id: string;
  url: string;
  title: string;
  username: string;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  description: string;
  videos: Video[];
}

const sampleVideos: Omit<Video, 'id' | 'channel'>[] = [
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', title: 'Big Buck Bunny - Classic Short', username: '@animationstudio' },
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', title: 'Elephants Dream - Open Movie', username: '@blenderfoundation' },
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', title: 'Sintel - Epic Fantasy Short', username: '@blender' },
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Tears_of_Steel.mp4', title: 'Tears of Steel - Sci-Fi Action', username: '@blender' },
  { url: 'https://test-streams.github.io/streams/xbox.mp4', title: 'Xbox Trailer - Gaming Highlights', username: '@xbox' },
];

export const channels: Channel[] = [
  {
    id: 'news',
    name: 'News',
    icon: '📰',
    description: 'Breaking news clips and updates from X',
    videos: [
      { id: 'n1', ...sampleVideos[0], title: 'World News Update - Major Events', username: '@cnn' },
      { id: 'n2', ...sampleVideos[1], title: 'Tech News Today', username: '@techcrunch' },
    ]
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    description: 'Latest music videos and performances from X',
    videos: [
      { id: 'm1', ...sampleVideos[2], title: 'Taylor Swift - New Era Performance', username: '@taylorswift' },
      { id: 'm2', ...sampleVideos[3], title: 'The Weeknd - Live from X', username: '@theweeknd' },
    ]
  },
  {
    id: 'adult-x',
    name: 'Adult X',
    icon: '🔞',
    description: 'Mature content — 18+ only',
    videos: [
      { id: 'a1', ...sampleVideos[1], title: 'Exclusive Adult Clip 01', username: '@adultcreator1' },
    ]
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    description: 'Adorable and wild animal clips from X',
    videos: [
      { id: 'an1', ...sampleVideos[0], title: 'Cute Pets Compilation', username: '@animalplanet' },
      { id: 'an2', ...sampleVideos[4], title: 'Wildlife Moments', username: '@natgeo' },
    ]
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    icon: '🐭',
    description: 'Classic and modern cartoon highlights',
    videos: [
      { id: 'c1', ...sampleVideos[2], title: 'Looney Tunes Best Moments', username: '@looneytunes' },
    ]
  },
  {
    id: 'anime',
    name: 'Anime',
    icon: '🌸',
    description: 'Popular anime clips and highlights from X',
    videos: [
      { id: 'an1', ...sampleVideos[3], title: 'Attack on Titan - Epic Scene', username: '@aot_official' },
      { id: 'an2', ...sampleVideos[0], title: 'Jujutsu Kaisen Best Fights', username: '@jujutsukaisen' },
    ]
  },
  {
    id: 'trending',
    name: 'Trending / Viral',
    icon: '🔥',
    description: 'What is blowing up on X right now',
    videos: [
      { id: 't1', ...sampleVideos[4], title: 'Viral Challenge Compilation', username: '@tiktok' },
      { id: 't2', ...sampleVideos[5] || sampleVideos[0], title: 'Internet Breaking Moment', username: '@x' },
    ]
  },
];

export const getChannelById = (id: string) => channels.find(c => c.id === id);
export const getAllVideos = () => channels.flatMap(c => c.videos);