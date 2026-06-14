'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Play } from 'lucide-react';
import { channels } from '../lib/tv-data';

// Complete new UI for the landing (scraped old shadcn hero/scroller).
// Inspired by reference at F:\New_folder\visual-x:
// - Black + #ff0033 red accent everywhere interactive.
// - Simple header + red hero + prominent login button (styled like reference).
// - Channel preview as .channel-card (hover lift + red shadow, no clipping).
// - Clean, loads reliably (plain elements + custom classes from globals.css + tailwind).
// Auth integrated (existing signIn works). Click channels or login → /tv for the player.

export default function XTVLanding() {
  return (
    <div className="min-h-dvh tv-container flex flex-col">
      {/* Header - placement inspired by reference (branding | powered | auth) */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-2xl tracking-[-1px]">𝕏 TV</span>
          <span className="text-[10px] uppercase tracking-[2px] bg-white/10 px-2 py-0.5 rounded">TV MODE</span>
        </div>
        <div className="text-xs text-white/60 tracking-[2px] hidden md:block">POWERED BY X • INFINITE PLAYBACK</div>
        <button
          onClick={() => signIn('twitter')}
          className="signin-btn text-sm"
        >
          Sign in with X
        </button>
      </nav>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-20 text-center">
          {/* Hero - red accent title, clean description, prominent CTA (inspiration style) */}
          <div className="mb-16">
            <div className="inline-block text-[10px] tracking-[3px] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-6">Visual X • TV for the real-time web</div>
            
            <h1 className="text-7xl md:text-8xl font-semibold tracking-[-5px] leading-none mb-6">
              TV for the<br /><span className="text-[#ff0033]">real-time web.</span>
            </h1>

            <p className="max-w-md mx-auto text-xl text-white/70 mb-8">
              Login with X. Pick a channel. Watch endless video in a beautiful fullscreen TV experience.
            </p>

            {/* Preview video area to show the TV UI (inspired by reference .video-container + tv-glow) */}
            <div className="mx-auto w-full max-w-2xl mb-8">
              <div className="video-container tv-glow mx-auto aspect-video rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <div className="text-center text-white/40">
                  <Play className="mx-auto text-[#ff0033] mb-2" size={48} />
                  <div className="text-sm">Preview • Sign in to start streaming</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => signIn('twitter')}
                className="signin-btn text-base px-10 h-12"
              >
                Sign in with X
              </button>
              <Link href="/tv">
                <span className="control-btn inline-flex items-center px-8 h-12 rounded-full border border-white/30 hover:border-[#ff0033] text-sm font-medium">
                  Enter TV Mode
                </span>
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-white/50">X-only OAuth • No email or password</p>
          </div>

          {/* Channel preview - .channel-card grid (inspiration hover + red, no shadcn, no clip) */}
          <div>
            <div className="mb-4 text-left">
              <div className="uppercase text-xs tracking-[3px] text-white/60">7 Channels</div>
              <div className="text-3xl font-semibold tracking-tight">Always something on</div>
            </div>

            {/* Horizontal scroller for channel preview - avoids narrow columns and clipping, inspired by reference channel cards */}
            <div className="flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory">
              {channels.map((ch) => (
                <Link 
                  key={ch.id} 
                  href="/tv" 
                  className="channel-card flex-shrink-0 w-36 snap-start block rounded-2xl p-3 text-left border border-white/10 hover:border-[#ff0033] bg-[#1a1a1a] transition-all group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform inline-block">{ch.icon}</div>
                  <div className="font-medium text-white tracking-tight text-sm mb-0.5">{ch.name}</div>
                  <div className="text-[10px] text-white/50 line-clamp-2 mb-1">{ch.description}</div>
                  <div className="text-[10px] text-[#ff0033] opacity-70 group-hover:opacity-100">Real-time from X →</div>
                </Link>
              ))}
            </div>
            <div className="text-[10px] text-white/40">Scroll to see all channels →</div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        Built with Next.js • X OAuth • Lucide • Framer • Supabase. Inspired by visual-x reference. Sprint 0 foundation.
      </footer>
    </div>
  );
}
