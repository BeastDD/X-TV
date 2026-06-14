// Full Obsidian Neon TV Player
'use client';

export default function TVPage() {
  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Slim Sidebar */}
      <div className="absolute left-0 top-0 h-full w-64 bg-black/80 border-r border-white/10 p-4">
        {/* Channels list with neon hovers */}
        <div>News</div>
        {/* etc for 7 channels */}
      </div>
      {/* Massive Video */}
      <div className="ml-64 h-full flex items-center justify-center tv-player">
        <video className="max-h-full" controls />
      </div>
      {/* Fade controls */}
      <div className="control-bar absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4 opacity-0 hover:opacity-100">
        Progress bar with neon
      </div>
    </div>
  );
}