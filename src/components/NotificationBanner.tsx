import React, { useEffect } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { Bell, Radio, Info, X } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const { activeBanner, dismissBanner } = useSanctuary();

  useEffect(() => {
    if (!activeBanner) return;
    const timer = setTimeout(() => {
      dismissBanner();
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeBanner, dismissBanner]);

  if (!activeBanner) return null;

  const isBroadcast = activeBanner.type === 'broadcast';
  const isReminder = activeBanner.type === 'reminder';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
          isBroadcast
            ? 'bg-amber-500/15 border-amber-500/40 text-amber-950 dark:text-amber-100 bg-white/95 dark:bg-stone-900/95'
            : isReminder
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-950 dark:text-emerald-100 bg-white/95 dark:bg-stone-900/95'
            : 'bg-indigo-500/15 border-indigo-500/40 text-indigo-950 dark:text-indigo-100 bg-white/95 dark:bg-stone-900/95'
        }`}
      >
        <div
          className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
            isBroadcast
              ? 'bg-amber-600 text-white'
              : isReminder
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 text-white'
          }`}
        >
          {isBroadcast ? (
            <Radio className="w-5 h-5 animate-pulse" />
          ) : isReminder ? (
            <Bell className="w-5 h-5" />
          ) : (
            <Info className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold tracking-tight">{activeBanner.title}</h4>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 opacity-80">
              {activeBanner.type}
            </span>
          </div>
          <p className="text-xs mt-1 line-clamp-2 leading-relaxed opacity-90">{activeBanner.message}</p>
        </div>

        <button
          onClick={dismissBanner}
          className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition text-current opacity-70 hover:opacity-100"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
