import { SignIn } from '@/components/SignIn';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="...">...</header>
      {/* Main content with sidebar and player based on image */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4">
          {/* Channels list */}
        </aside>
        {/* Main Player Area */}
        <main className="flex-1 relative">
          {/* Glassmorphic player with neon border */}
        </main>
      </div>
    </div>
  );
}
