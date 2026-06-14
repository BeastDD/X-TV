import { SignIn } from '@/components/SignIn';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="text-2xl font-bold tracking-tighter">X TV</div>
        <div>Sign in with X</div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4">TV for the real-time web</h1>
        {/* Add channel carousel and other elements based on mockup */}
        <div className="mt-8">Channel carousel here - Obsidian Neon style</div>
      </main>
    </div>
  );
}
