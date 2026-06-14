'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, SkipForward, Maximize, X } from 'lucide-react';
import { channels, type Channel, type Video } from '../lib/tv-data';

// Complete new immersive TV UI (scraped old placeholder grid/shadcn).
// Placement & design directly inspired by reference at F:\New_folder\visual-x:
// - Header (branding | powered | user/auth)
// - Left: CHANNELS sidebar with .channel-card (hover lift + red shadow, click switches)
// - Center: .video-container.tv-glow + <video> (object-fit contain) + absolute overlays
// - Bottom: controls with .progress-bar (red) + .control-btn (hover red + scale)
// Black + #ff0033 red everywhere interactive. Simple code (no shadcn) = loads reliably.
// Keyboard, progress/seek, channel switch (random video per channel), fullscreen.

export default function TVPage() {
  const [currentChannelId, setCurrentChannelId] = useState<string>('news');
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentChannel = channels.find(c => c.id === currentChannelId)!;

  // Load initial / switch video
  const loadVideo = (video: Video, autoPlay = true) => {
    setCurrentVideo(video);
    if (videoRef.current) {
      videoRef.current.src = video.url;
      videoRef.current.load();
      if (autoPlay) {
        videoRef.current.play().catch(() => {});
      }
    }
    setProgress(0);
    setCurrentTime(0);
  };

  // On channel change: pick random video from channel
  const switchChannel = (id: string) => {
    const ch = channels.find(c => c.id === id)!;
    setCurrentChannelId(id);
    const randomIndex = Math.floor(Math.random() * ch.videos.length);
    loadVideo(ch.videos[randomIndex]);
  };

  // Initial load
  useEffect(() => {
    const firstCh = channels[0];
    loadVideo(firstCh.videos[0]);
  }, []);

  // Video event listeners (progress, ended, duration)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) {
        const pct = (video.currentTime / video.duration) * 100;
        setProgress(pct);
        setCurrentTime(video.currentTime);
      }
    };

    const onLoadedMetadata = () => setDuration(video.duration || 0);

    const onEnded = () => {
      // Auto next random video in current channel (infinite feel)
      const nextIndex = Math.floor(Math.random() * currentChannel.videos.length);
      loadVideo(currentChannel.videos[nextIndex]);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [currentChannel]);

  // Play / pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  // Click progress bar to seek
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  // Fullscreen
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen().catch(() => {});
      }
    }
  };

  // Keyboard support (space, arrows, F)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        const idx = channels.findIndex(c => c.id === currentChannelId);
        const prev = channels[(idx - 1 + channels.length) % channels.length];
        switchChannel(prev.id);
      } else if (e.key === 'ArrowRight') {
        const idx = channels.findIndex(c => c.id === currentChannelId);
        const next = channels[(idx + 1) % channels.length];
        switchChannel(next.id);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        // Next random in current
        const nextIndex = Math.floor(Math.random() * currentChannel.videos.length);
        loadVideo(currentChannel.videos[nextIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentChannelId, currentChannel]);

  // Format time mm:ss
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-dvh tv-container flex flex-col bg-black text-white">
      {/* Header - reference placement */}
      <header className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-black/90">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-2xl tracking-[-1px] flex items-center gap-2">
            𝕏 TV <span className="text-[10px] uppercase tracking-[2px] bg-white/10 px-1.5 py-0.5 rounded">TV MODE</span>
          </Link>
        </div>
        <div className="text-xs tracking-[2px] text-white/60 hidden md:block">POWERED BY X • INFINITE PLAYBACK</div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-white/70 hover:text-white">← Home</Link>
          {/* Auth area - simple (integrate your existing session if needed) */}
          <button onClick={() => { /* signOut if you wire it */ }} className="text-sm text-red-400 hover:text-red-300">Sign out</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: CHANNELS sidebar with .channel-card (inspiration hover + red) */}
        <div className="w-full lg:w-72 border-r border-white/10 p-4 overflow-auto bg-black/60">
          <div className="uppercase text-xs tracking-[3px] text-white/60 mb-2">CHANNELS</div>
          <div className="space-y-2">
            {channels.map((ch) => (
              <div
                key={ch.id}
                onClick={() => switchChannel(ch.id)}
                className={`channel-card flex gap-3 p-3 rounded-2xl cursor-pointer border ${currentChannelId === ch.id ? 'active border-[#ff0033]' : 'border-white/10'}`}
              >
                <div className="text-3xl shrink-0 pt-0.5">{ch.icon}</div>
                <div className="min-w-0">
                  <div className="font-medium tracking-tight">{ch.name}</div>
                  <div className="text-xs text-white/50 line-clamp-2">{ch.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-white/40">Click to switch • Random video per channel</div>
        </div>

        {/* Center: Video with .video-container + .tv-glow + overlays */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="video-container tv-glow flex-1 relative bg-black" style={{ minHeight: '50vh' }}>
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              autoPlay
              playsInline
              muted={false}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Overlays (title, username, channel) */}
            {currentVideo && (
              <>
                <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-sm flex items-center gap-2">
                  <span>{currentChannel.icon}</span>
                  <span className="font-medium">{currentChannel.name}</span>
                </div>
                <div className="absolute bottom-4 left-4 max-w-[70%]">
                  <div className="text-lg font-semibold tracking-tight drop-shadow">{currentVideo.title}</div>
                  <div className="text-sm text-white/70">@{currentVideo.username}</div>
                </div>
              </>
            )}
          </div>

          {/* Bottom controls bar */}
          <div className="border-t border-white/10 bg-black/90 px-4 py-3 flex items-center gap-4 text-sm">
            <button onClick={togglePlay} className="control-btn flex items-center justify-center w-9 h-9">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Clickable progress */}
            <div className="flex-1 flex items-center gap-3">
              <div 
                onClick={seek} 
                className="flex-1 h-2 bg-white/20 rounded cursor-pointer relative overflow-hidden"
              >
                <div 
                  className="progress-bar absolute top-0 left-0 h-full" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <div className="tabular-nums text-xs text-white/70 w-24 text-right">
                {fmt(currentTime)} / {fmt(duration)}
              </div>
            </div>

            <button onClick={() => {
              const idx = currentChannel.videos.findIndex(v => v.id === currentVideo?.id);
              const next = currentChannel.videos[(idx + 1) % currentChannel.videos.length];
              loadVideo(next);
            }} className="control-btn flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/5">
              <SkipForward size={16} /> Next
            </button>

            <button onClick={toggleFullscreen} className="control-btn flex items-center gap-1.5 px-3 py-1 rounded hover:bg-white/5">
              <Maximize size={16} /> Full
            </button>

            <Link href="/" className="ml-auto text-xs text-white/50 hover:text-white">Exit TV</Link>
          </div>
        </div>
      </div>

      {/* Tiny tip */}
      <div className="text-[10px] text-white/30 px-4 py-1 border-t border-white/10 text-center">
        Keyboard: Space = play/pause • ← → = change channel • F = fullscreen • N = next random in channel
      </div>
    </div>
  );
}
