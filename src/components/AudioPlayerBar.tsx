import React from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Play, Pause, RotateCcw, RotateCw, X, Volume2 } from 'lucide-react';

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

  if (!audioTrack) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const progressPercent = audioDuration > 0 ? (audioTime / audioDuration) * 100 : 0;
  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="fixed bottom-16 md:bottom-3 left-0 right-0 md:left-64 z-40 px-3 pointer-events-none select-none">
      <div className="max-w-2xl mx-auto ios-glass rounded-[18px] shadow-lg border border-black/10 dark:border-white/10 pointer-events-auto overflow-hidden">
        {/* Progress Bar (Apple Music Scrubber) */}
        <div
          className="w-full h-1 bg-black/10 dark:bg-white/10 cursor-pointer relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = Math.max(0, Math.min(1, clickX / rect.width));
            seekAudio(ratio * audioDuration);
          }}
        >
          <div
            className="h-full bg-amber-500 transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="px-3.5 py-2.5 flex items-center justify-between gap-3">
          {/* Track Details with Squircle Artwork */}
          <div className="flex items-center gap-3 min-w-0 max-w-[45%]">
            <div className="w-10 h-10 rounded-[10px] bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Volume2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#1C1C1E] dark:text-white truncate">
                {audioTrack.title}
              </p>
              <p className="text-[11px] text-[#8E8E93] truncate">
                {audioTrack.subtitle}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => seekAudio(Math.max(0, audioTime - 15))}
              className="w-7 h-7 rounded-full text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white flex items-center justify-center transition active:scale-90"
              title="Rewind 15s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-8 h-8 rounded-full bg-[#1C1C1E] dark:bg-white text-white dark:text-[#1C1C1E] flex items-center justify-center shadow-xs transition active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={() => seekAudio(Math.min(audioDuration, audioTime + 15))}
              className="w-7 h-7 rounded-full text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white flex items-center justify-center transition active:scale-90"
              title="Forward 15s"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <div className="hidden sm:flex items-center text-[11px] font-mono text-[#8E8E93] pl-1">
              <span>{formatTime(audioTime)}</span>
            </div>
          </div>

          {/* Right Tools: Speed & Close */}
          <div className="flex items-center gap-1.5">
            <select
              value={playbackSpeed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white focus:outline-none cursor-pointer"
            >
              {speeds.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>

            <button
              onClick={closeAudio}
              className="w-6 h-6 rounded-full text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white flex items-center justify-center transition active:scale-90"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
