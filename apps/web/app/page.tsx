// Fixed Obsidian Neon Landing - Proper TSX with imports
'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero with neon */}
      <header className="p-8 flex justify-between items-center border-b border-white/10">
        <div className="text-4xl font-bold tracking-tighter neon-glow">X TV</div>
        <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition">Sign in with X</button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-6xl font-bold mb-4 text-center neon-glow">TV for the real-time web</h1>
        <p className="text-xl text-white/70 mb-12 max-w-md text-center">Login with X. Pick a channel. Watch endless video in a beautiful fullscreen TV experience.</p>
        
        {/* Refined Channel Carousel */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl mb-6">7 Channels - Always something on</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {['News', 'Music', 'Adult X', 'Animals', 'Cartoon', 'Anime', 'Trending / Viral'].map((channel, i) => (
              <div key={i} className="bg-zinc-900/80 border border-white/10 rounded-2xl p-8 min-w-[280px] flex-shrink-0 snap-center neon-border hover:border-purple-500 transition-all cursor-pointer">
                <div className="text-5xl mb-4">{['📰', '🎵', '🔥', '🐾', '📺', '🎌', '🔥'][i]}</div>
                <h3 className="text-2xl font-semibold mb-2 neon-glow">{channel}</h3>
                <p className="text-sm text-white/60">Real-time from X</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
