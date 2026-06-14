import { SignIn } from '@/components/SignIn';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="text-2xl font-bold tracking-tighter">X TV</div>
        <SignIn />
      </header>

      {/* Main - Obsidian Neon TV inspired by uploaded image */}
      <main className="flex-1 flex flex-col lg:flex-row bg-black">
        {/* Left Sidebar - Channels */}
        <div className="w-72 border-r border-gray-800 p-4 overflow-y-auto">
          <div className="text-sm uppercase tracking-widest mb-4 text-gray-400">CHANNELS</div>
          <div className="space-y-1">
            {['News', 'Music', 'Adult X', 'Animals', 'Cartoon', 'Anime', 'Trending / Viral'].map((channel, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-900 cursor-pointer transition-all group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 flex items-center justify-center text-sm">{i+1}</div>
                <span className="text-white group-hover:text-white transition-colors">{channel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Player Area - Glassmorphic with Rainbow Neon */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="relative w-full max-w-5xl aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-transparent" style={{boxShadow: '0 0 60px rgba(168, 85, 247, 0.5), 0 0 100px rgba(34, 211, 238, 0.3)'}}>
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-5xl">▶️</span>
                </div>
                <p className="text-xl text-gray-400">Select a channel to start infinite playback</p>
              </div>
            </div>

            {/* Neon Rainbow Border Glow */}
            <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-purple-500 via-cyan-500 via-pink-500 to-red-500 opacity-30 pointer-events-none"></div>

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between text-white">
                <div>Now Playing: Trending Clips</div>
                <div className="flex items-center gap-4">
                  <button>⏮️</button>
                  <button className="text-3xl">⏸️</button>
                  <button>⏭️</button>
                </div>
              </div>
              <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
