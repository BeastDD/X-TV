import { SignIn } from '@/components/SignIn';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold tracking-tighter">X TV</div>
        </div>
        <SignIn />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-4 tracking-tighter">TV for the real-time web</h1>
          <p className="text-xl text-white/70">Login with X. Pick a channel. Watch endless video in a beautiful fullscreen TV experience.</p>
        </div>

        {/* Channel Sidebar Simulation for Landing */}
        <div className="w-full max-w-6xl">
          {/* Your 7 channels here with neon */}
        </div>
      </main>
    </div>
  );
}
