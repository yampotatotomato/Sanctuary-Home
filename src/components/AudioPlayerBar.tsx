import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Play, Pause, RotateCcw, RotateCw, X, ChevronUp, ChevronDown, Volume2, Sparkles } from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const {
    audioTrack,
    isPlaying,
    audioTime,
    audioDuration,
    playbackSpeed,
    togglePlayPause,
    seekAudio,
    setSpeed,
    closeAudio,
  } = useSanctuary();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!audioTrack) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = audioDuration > 0 ? (audioTime / audioDuration) * 100 : 0;
  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-64 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-2xl transition-all duration-300">
      {/* Progress Track (Draggable / Clickable) */}
      <div
        className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 cursor-pointer relative group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          seekAudio(ratio * audioDuration);
        }}
      >
        <div
          className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-600 dark:bg-amber-400 opacity-0 group-hover:opacity-100 transition shadow-sm pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 6px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Track Details */}
        <div className="flex items-center gap-3 min-w-0 max-w-[40%]">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
                {audioTrack.type}
              </span>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                {audioTrack.title}
              </p>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{audioTrack.subtitle}</p>
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => seekAudio(Math.max(0, audioTime - 15))}
            className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white flex items-center justify-center shadow-md transition"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={() => seekAudio(Math.min(audioDuration, audioTime + 15))}
            className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition"
            title="Forward 15 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center text-xs font-mono text-stone-500 dark:text-stone-400 pl-2">
            <span>{formatTime(audioTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatTime(audioDuration)}</span>
          </div>
        </div>

        {/* Right Tools: Speed, Details Toggle, Close */}
        <div className="flex items-center gap-2">
          {/* Speed selector */}
          <div className="relative">
            <select
              value={playbackSpeed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="text-xs font-semibold px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 focus:outline-none cursor-pointer"
            >
              {speeds.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={closeAudio}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
            title="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
