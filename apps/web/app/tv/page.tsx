'use client';

import { useState, useRef, useEffect } from 'react';
import { channels, getChannelById, type Channel, type Video } from '@/lib/tv-data';
import { 
  SkipBack, Rewind, Play, Pause, SkipForward, Volume2, VolumeX 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TVPage() {
  const [currentChannelId, setCurrentChannelId] = useState<Channel['id']>('news');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const currentChannel = getChannelById(currentChannelId);
  const currentVideo: Video = (currentChannel.videos[currentVideoIndex] || currentChannel.videos[0] || { id: 'fallback', url: '', title: '', username: '' }) as Video;

  // Load + play new video when channel or clip changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = currentVideo.url;
    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    // Reset progress
    setProgress(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChannelId, currentVideoIndex]);

  // Progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      // Auto next clip in channel (infinite feel)
      nextClip();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex, currentChannelId]);

  function selectChannel(id: Channel['id']) {
    if (id === currentChannelId) return;
    setCurrentChannelId(id);
    setCurrentVideoIndex(0);
    setIsPlaying(true);
  }

  function nextClip() {
    const next = (currentVideoIndex + 1) % currentChannel.videos.length;
    setCurrentVideoIndex(next);
  }

  function prevClip() {
    const prev = (currentVideoIndex - 1 + currentChannel.videos.length) % currentChannel.videos.length;
    setCurrentVideoIndex(prev);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    video.currentTime = percent * video.duration;
  }

  // Keyboard support (nice TV remote feel)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === 'm') toggleMute();
      if (e.key === 'ArrowRight') {
        const v = videoRef.current;
        if (v) v.currentTime = Math.min(v.duration || 999, v.currentTime + 10);
      }
      if (e.key === 'ArrowLeft') {
        const v = videoRef.current;
        if (v) v.currentTime = Math.max(0, v.currentTime - 10);
      }
      if (e.key.toLowerCase() === 'n') nextClip();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const progressPercent = progress;

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* TV with dramatically elevated rainbow neon glow frame - much closer to the photo in Image 2 */}
      <div className="tv-frame w-full max-w-[1320px] aspect-[16/9] relative">
        
        {/* Video area with better screen presentation */}
        <div className="relative w-full h-full bg-black rounded-[10px] overflow-hidden ring-1 ring-black/60">
          <video
            ref={videoRef}
            className="tv-video"
            autoPlay
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Top Channel Pill - tuned closer to the ref */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
            <div className="channel-pill px-6 py-[3px] text-[10px] tracking-[1.2px] flex items-center gap-1.5 shadow-sm">
              {currentChannel.name.toUpperCase()}
            </div>
          </div>

          {/* Large decorative number - styled like the prominent "33" in the reference */}
          <div className="big-number absolute top-[28%] right-9 z-10 select-none hidden xl:block font-mono tracking-[-4px]">
            {String(currentVideoIndex + 1).padStart(2, '0')}
          </div>

          {/* Thin left edge channel strip - minimal and photo-inspired */}
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-[1px] bg-black/55 backdrop-blur-md rounded px-0.5 py-1 border border-white/5">
            {channels.slice(0, 7).map((ch) => (
              <button
                key={ch.id}
                onClick={() => selectChannel(ch.id)}
                className={`w-6 h-6 text-[10px] flex items-center justify-center rounded transition-all active:scale-95 ${ch.id === currentChannelId ? 'bg-white/15' : 'hover:bg-white/5'}`}
                title={ch.name}
              >
                {ch.icon}
              </button>
            ))}
            <div className="h-px w-4 bg-white/15 mx-auto my-[1px]" />
            <button onClick={prevClip} className="w-6 h-4 text-[9px] opacity-50 hover:opacity-90 active:opacity-70">↑</button>
            <button onClick={nextClip} className="w-6 h-4 text-[9px] opacity-50 hover:opacity-90 active:opacity-70">↓</button>
          </div>

          {/* Custom bottom player controls bar - significantly elevated to match the photo's tactility, shapes, and gradients */}
          <div className="player-controls absolute bottom-0 left-0 right-0 z-40 px-6 pb-[13px] pt-2.5">
            {/* Progress */}
            <div 
              className="progress-bar mx-auto w-[93%] mb-2" 
              onClick={seek}
            >
              <div 
                className="progress" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Transport controls row - closer arrangement and styling to Image 2 */}
            <div className="flex items-center justify-center gap-1.5">
              <button 
                onClick={prevClip} 
                className="control-pill px-2.5 py-[5px]"
                aria-label="Previous clip"
              >
                <SkipBack className="w-[15px] h-[15px]" />
              </button>

              <button 
                onClick={() => {
                  const v = videoRef.current;
                  if (v) v.currentTime = Math.max(0, v.currentTime - 10);
                }} 
                className="control-pill px-2.5 py-[5px]"
                aria-label="Rewind 10s"
              >
                <Rewind className="w-[15px] h-[15px]" />
              </button>

              <motion.button 
                whileTap={{ scale: 0.92 }}
                onClick={togglePlay} 
                className="control-pill play px-4 py-1.5 mx-0.5"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-[19px] h-[19px]" /> : <Play className="w-[19px] h-[19px]" />}
              </motion.button>

              <button 
                onClick={() => {
                  const v = videoRef.current;
                  if (v) v.currentTime = Math.min(v.duration || 999, v.currentTime + 10);
                }} 
                className="control-pill px-2.5 py-[5px]"
                aria-label="Forward 10s"
              >
                <SkipForward className="w-[15px] h-[15px]" />
              </button>

              <button 
                onClick={toggleMute} 
                className="control-pill px-2.5 py-[5px]"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-[15px] h-[15px]" /> : <Volume2 className="w-[15px] h-[15px]" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
