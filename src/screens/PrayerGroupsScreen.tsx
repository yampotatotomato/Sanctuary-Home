import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { JoinedGroupEntity } from '../types';
import {
  Users,
  Calendar,
  Clock,
  Bell,
  BellOff,
  Check,
  Plus,
  Filter,
  Sparkles,
} from 'lucide-react';

export const PrayerGroupsScreen: React.FC = () => {
  const { prayerGroups, toggleGroupRsvp, toggleGroupReminder } = useSanctuary();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', "Men's", "Women's", 'Youth', 'Outreach', 'Worship'];

  const filteredGroups = prayerGroups.filter((g) => {
    return filterCategory === 'ALL' || g.category === filterCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Users className="w-4 h-4" />
            <span>Christian Fellowship</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Prayer Circles & Small Groups
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Connect in authentic biblical community, intercessory prayer, and local mission.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filterCategory === c
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.map((group) => {
          const isAttending = group.rsvpStatus === 'attending';
          const isInterested = group.rsvpStatus === 'interested';

          return (
            <div
              key={group.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-900 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    {group.category} Circle
                  </span>

                  <button
                    onClick={() => toggleGroupReminder(group.id)}
                    className={`p-1.5 rounded-xl border transition ${
                      group.reminderEnabled
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                        : 'border-stone-200 dark:border-stone-700 text-stone-400 hover:text-stone-700'
                    }`}
                    title={group.reminderEnabled ? 'Reminder Active' : 'Enable Reminder'}
                  >
                    {group.reminderEnabled ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  {group.groupName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{group.meetingTime}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Joined {new Date(group.joinedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* RSVP Actions Strip */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleGroupRsvp(group.id, isAttending ? 'none' : 'attending')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isAttending
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200'
                    }`}
                  >
                    {isAttending && <Check className="w-3.5 h-3.5" />}
                    <span>{isAttending ? 'Attending' : 'Attend'}</span>
                  </button>

                  <button
                    onClick={() => toggleGroupRsvp(group.id, isInterested ? 'none' : 'interested')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isInterested
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200'
                    }`}
                  >
                    <span>{isInterested ? 'Interested ✓' : 'Interested'}</span>
                  </button>
                </div>

                {group.reminderEnabled && (
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Bell className="w-3 h-3" /> Reminder On
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
