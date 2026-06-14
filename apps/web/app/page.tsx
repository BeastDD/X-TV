'use client';

import { SignInButton } from '@/components/auth/sign-in-button';
import { channels } from '@/lib/tv-data';
import { 
  Home as HomeIcon, Music, EyeOff, PawPrint, Smile, Sparkles, Flame, 
  Play, RotateCcw, Volume2, Settings 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  // Map channel ids to lucide icons for premium sidebar look
  const getIcon = (ch: { id: string }) => {
    const map: Record<string, React.ElementType> = {
      news: HomeIcon,
      music: Music,
      'adult-x': EyeOff,
      animals: PawPrint,
      cartoon: Smile,
      anime: Sparkles,
      trending: Flame,
    };
    const IconComp = map[ch.id] || HomeIcon;
    return <IconComp className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 overflow-hidden">
      {/* Centered Glass + Rainbow Border Panel - ELEVATED to more closely match Image 1 reference */}
      <motion.div 
        className="rainbow-glass w-full max-w-[1120px] h-[640px] flex overflow-hidden shadow-2xl"
        initial={{ opacity: 0.96, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Left Sidebar - refined sleek list treatment */}
        <div className="channel-sidebar w-[238px] flex-shrink-0 p-6 flex flex-col text-sm border-r border-white/5">
          <div className="flex items-center gap-2.5 mb-7 pl-0.5">
            <div className="w-[22px] h-[22px] rounded-md bg-white text-black flex items-center justify-center font-bold text-[17px] leading-none pt-[1px]">𝕏</div>
            <span className="font-semibold tracking-[-0.2px] text-[15px]">Channer</span>
          </div>

          <div className="space-y-px -mx-1">
            {channels.map((ch) => (
              <div key={ch.id} className="channel-item">
                {getIcon(ch)}
                <span className="truncate">{ch.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 text-[10px] text-white/35 pl-0.5 tracking-[0.2px]">
            X-ONLY • INFINITE TV MODE
          </div>
        </div>

        {/* Main Preview Area - elevated blurred video wall + floating glass overlay */}
        <div className="flex-1 relative bg-[#07070a] overflow-hidden flex flex-col">
          {/* Improved cinematic blurred mosaic (evokes the video thumbnail wall in Image 1) */}
          <div className="thumbnail-mosaic absolute inset-3 z-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  background: `linear-gradient(145deg, hsl(${195 + (i%7)*11}, 68%, 22%), hsl(${265 + (i%5)*9}, 55%, 12%))` 
                }} 
              />
            ))}
          </div>

          {/* Content simulation layer */}
          <div className="relative z-10 flex-1 p-9 flex items-center justify-center">
            <div className="text-center max-w-[380px]">
              <div className="text-[58px] font-semibold tracking-[-2.2px] mb-1.5">X TV</div>
              <p className="text-white/55 text-[17px] leading-tight mb-9 tracking-[-0.1px]">
                The best of X.<br />Playing like television.
              </p>
              
              <div className="flex justify-center">
                <SignInButton size="lg" className="px-11 py-3 text-[15px] font-medium shadow-2xl tracking-[-0.1px]" />
              </div>
              <p className="mt-3.5 text-[11px] text-white/35 tracking-[0.3px]">SIGN IN WITH X TO UNLOCK THE 7 CHANNELS</p>
            </div>
          </div>

          {/* Floating Glass Controls Overlay — positioned and styled closer to the central card in Image 1 */}
          <div className="glass-controls absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-5 py-[13px] flex items-center gap-4 text-white/85">
            <button className="hover:text-white transition-colors p-0.5"><Play className="w-[17px] h-[17px]" /></button>
            <button className="hover:text-white transition-colors p-0.5"><RotateCcw className="w-3.5 h-3.5" /></button>
            <button className="hover:text-white transition-colors p-0.5"><Volume2 className="w-[17px] h-[17px]" /></button>
            <button className="hover:text-white transition-colors p-0.5"><Settings className="w-3.5 h-3.5" /></button>
          </div>

          {/* Bottom Gradient Progress Bar — tuned closer to Image 1 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[86%] z-20">
            <div className="h-[2.5px] bg-white/8 rounded-full overflow-hidden">
              <div className="h-[2.5px] w-3/5 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-cyan-400 rounded-full relative">
                <div className="absolute right-0 top-1/2 -mt-1 w-[9px] h-[9px] rounded-full bg-white ring-[1.5px] ring-offset-2 ring-offset-[#0a0a0f] ring-cyan-400/70" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

