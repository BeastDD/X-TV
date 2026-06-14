// Updated landing page with refined UI
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero with neon */
      <header className="p-8 flex justify-between items-center border-b border-white/10">
        <div className="text-4xl font-bold tracking-tighter neon-glow">X TV</div>
        <div>Sign in with X</div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4">TV for the real-time web</h1>
        {/* Channel carousel etc. */}
      </main>
    </div>
  );
}