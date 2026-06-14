import { SignIn } from '@/components/SignIn';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-white/10">
        <div className="text-2xl font-bold tracking-tight">X TV</div>
        <SignIn />
      </header>
      {/* Main content - Obsidian Neon style matching user image */}
      <main className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-zinc-950 border-r border-white/10 p-4 flex flex-col">
          <div className="text-sm uppercase tracking-widest mb-4 text-white/60">Channels</div>
          <div className="space-y-1">
            {['News', 'Music', 'Adult X', 'Animals', 'Cartoon', 'Anime', 'Trending / Viral'].map((channel, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{['📰','🎵','🔥','🐾','📺','🌸','🔥'][i]}</div>
                <span className="font-medium">{channel}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Main Player Area - Glassmorphic with rainbow neon */}
        <div className="flex-1 flex items-center justify-center p-8 relative bg-black">
          <div className="w-full max-w-5xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl" style={{boxShadow: '0 0 60px rgba(168, 85, 247, 0.5)'}}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-white/60">Select a channel to start watching</p>
              </div>
            </div>
            {/* Neon border overlay */}
            <div className="absolute inset-0 border-4 border-transparent rounded-3xl" style={{background: 'linear-gradient(45deg, #a855f7, #22d3ee, #ec4899, #f97316)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'xor'}}></div>
          </div>
        </div>
      </main>
    </div>
  );
}
