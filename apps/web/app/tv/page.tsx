'use client';

export default function TVPage() {
  return (
    <div className="h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 p-4">Channels sidebar with neon accents</div>
      {/* Player */}
      <div className="flex-1 relative">
        <div className="tv-player absolute inset-0 flex items-center justify-center">Massive Video Player</div>
        {/* Fade controls */}
      </div>
    </div>
  );
}