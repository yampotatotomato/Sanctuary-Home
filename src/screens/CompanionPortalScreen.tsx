import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { STAFF_ACCOUNTS } from '../data/seedData';
import { StaffAccount, AnnouncementEntity } from '../types';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Send,
  Radio,
  Pin,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Plus,
  BookOpen,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export const CompanionPortalScreen: React.FC = () => {
  const {
    loggedInStaff,
    loginStaff,
    logoutStaff,
    announcements,
    addAnnouncement,
    broadcastAnnouncement,
    deleteAnnouncement,
  } = useSanctuary();

  // Login form state
  const [selectedStaffName, setSelectedStaffName] = useState<string>(STAFF_ACCOUNTS[0].name);
  const [passcode, setPasscode] = useState<string>(STAFF_ACCOUNTS[0].presetPasscode);
  const [loginError, setLoginError] = useState<string>('');

  // Announcement composer state
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<'General' | 'Worship' | 'Outreach' | 'Youth' | 'Community'>('Worship');
  const [scriptureRef, setScriptureRef] = useState<string>('Romans 12:1-2');
  const [ctaLabel, setCtaLabel] = useState<string>('View Details');
  const [ctaLink, setCtaLink] = useState<string>('');
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [autoBroadcast, setAutoBroadcast] = useState<boolean>(true);

  const categories: Array<'General' | 'Worship' | 'Outreach' | 'Youth' | 'Community'> = [
    'General',
    'Worship',
    'Outreach',
    'Youth',
    'Community',
  ];

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginStaff(passcode.trim());
    if (!success) {
      setLoginError('Invalid passcode. Please use the 4-digit code listed next to your name.');
    } else {
      setPasscode('');
    }
  };

  // Quick 1-tap login helper for testing
  const handleQuickLogin = (account: StaffAccount) => {
    loginStaff(account.presetPasscode);
  };

  // Handle publish
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !loggedInStaff) return;

    addAnnouncement({
      title: title.trim(),
      content: content.trim(),
      authorName: loggedInStaff.name,
      category,
      scriptureRef: scriptureRef.trim() || undefined,
      ctaLabel: ctaLabel.trim() || undefined,
      ctaLink: ctaLink.trim() || undefined,
      isPinned,
      isScheduled,
      scheduledAt: isScheduled ? new Date(scheduledDate).toISOString() : undefined,
    });

    // Reset fields
    setTitle('');
    setContent('');
    setIsPinned(false);
    setIsScheduled(false);
  };

  // IF NOT LOGGED IN: Show Staff Authentication Screen
  if (!loggedInStaff) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2 pb-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 dark:bg-stone-800 text-amber-400 mx-auto flex items-center justify-center shadow-lg border border-stone-800">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Companion Staff Portal
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
            Authorized pastoral leadership portal for authoring congregation announcements, scheduling broadcasts, and emergency pastoral alerts.
          </p>
        </div>

        {/* 4 Preset Accounts Selector */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Select Preset Staff Account</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STAFF_ACCOUNTS.map((staff) => (
              <button
                key={staff.name}
                type="button"
                onClick={() => {
                  setSelectedStaffName(staff.name);
                  setPasscode(staff.presetPasscode);
                }}
                className={`p-3 rounded-2xl text-left border transition ${
                  selectedStaffName === staff.name
                    ? 'border-amber-600 bg-amber-500/10 dark:bg-amber-950/40'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    {staff.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-600/10 text-amber-700 dark:text-amber-400 font-bold">
                    PIN: {staff.presetPasscode}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  {staff.role}
                </p>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Enter 4-Digit Passcode
              </label>
              <input
                type="password"
                required
                maxLength={4}
                placeholder="4-digit PIN (e.g. 1001)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 text-center tracking-widest text-lg font-mono font-bold bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              Authenticate & Enter Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // IF LOGGED IN: Full Portal
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-300">
      {/* Active Staff Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-stone-900 text-stone-100 shadow-xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-md">
            {loggedInStaff.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-white">
                {loggedInStaff.name}
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Staff Verified
              </span>
            </div>
            <p className="text-xs text-stone-400">
              {loggedInStaff.role} • {loggedInStaff.email}
            </p>
          </div>
        </div>

        <button
          onClick={logoutStaff}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition border border-stone-700"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Authoring Composer */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Author Congregation Announcement
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Posts appear immediately on the Home screen feed and sync to member devices.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-500/10">
            Author: {loggedInStaff.name}
          </span>
        </div>

        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sunday Celebration & Communion Service"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Ministry Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
              Scripture Reference (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Philippians 4:6-7 or Psalms 100"
              value={scriptureRef}
              onChange={(e) => setScriptureRef(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
              Body Message & Pastoral Instructions
            </label>
            <textarea
              required
              rows={4}
              placeholder="Share details of the upcoming service, prayer focus, or meeting times..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-serif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Call-to-Action Label
              </label>
              <input
                type="text"
                placeholder="e.g. Join Service, RSVP, or Learn More"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Action Link or Screen Target
              </label>
              <input
                type="text"
                placeholder="e.g. #sanctuary or external URL"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Toggles: Pin to top, Scheduling, Auto-Broadcast */}
          <div className="pt-2 p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800 dark:text-stone-200">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5 text-amber-600" />
                  Pin to Top of Congregation Feed
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800 dark:text-stone-200">
                <input
                  type="checkbox"
                  checked={autoBroadcast}
                  onChange={(e) => setAutoBroadcast(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-indigo-600" />
                  Broadcast Push Notification Immediately
                </span>
              </label>
            </div>

            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-750 flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800 dark:text-stone-200">
                <input
                  type="checkbox"
                  checked={isScheduled}
                  onChange={(e) => setIsScheduled(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  Schedule Publication for Later Date/Time
                </span>
              </label>

              {isScheduled && (
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100"
                />
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>{isScheduled ? 'Schedule Announcement' : 'Publish to Feed'}</span>
            </button>
          </div>
        </form>
      </section>

      {/* Manage Published & Scheduled Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
              Published & Scheduled Archive ({announcements.length})
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Monitor, broadcast, or withdraw past announcements.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {item.category}
                  </span>
                  {item.isPinned && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-600 text-white flex items-center gap-1">
                      <Pin className="w-3 h-3" /> Pinned
                    </span>
                  )}
                  {item.isScheduled ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      Scheduled for {new Date(item.scheduledAt || '').toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      Published Live
                    </span>
                  )}
                  {item.isBroadcastSent && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                      <Radio className="w-3 h-3" /> Broadcast Sent
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                  {item.title}
                </h4>

                <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                  {item.content}
                </p>

                <p className="text-[11px] text-stone-400">
                  By {item.authorName} • {new Date(item.publishedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => broadcastAnnouncement(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow transition"
                  title="Broadcast notification to congregation"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Broadcast Now</span>
                </button>

                <button
                  onClick={() => deleteAnnouncement(item.id)}
                  className="p-2 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
