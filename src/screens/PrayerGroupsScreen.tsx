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
  Filter,
} from 'lucide-react';

export const PrayerGroupsScreen: React.FC = () => {
  const { prayerGroups, toggleGroupRsvp, toggleGroupReminder } = useSanctuary();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', "Men's", "Women's", 'Youth', 'Outreach', 'Worship'];

  const filteredGroups = prayerGroups.filter((g) => {
    return filterCategory === 'ALL' || g.category === filterCategory;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-5 animate-in fade-in duration-200">
      {/* Apple HIG Header */}
      <div className="pb-1">
        <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
          Community
        </span>
        <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
          Fellowship
        </h1>
        <p className="text-[13px] text-[#8E8E93] mt-0.5">
          Prayer circles, small groups, and local ministry gatherings.
        </p>
      </div>

      {/* Apple Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap transition active:scale-95 ${
              filterCategory === c
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Groups List (iOS Cards) */}
      <div className="space-y-3">
        {filteredGroups.map((group) => {
          const isAttending = group.rsvpStatus === 'attending';
          const isInterested = group.rsvpStatus === 'interested';

          return (
            <div
              key={group.id}
              className="ios-card p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                  {group.category} Circle
                </span>

                <button
                  onClick={() => toggleGroupReminder(group.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition active:scale-90 ${
                    group.reminderEnabled
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                  }`}
                  title={group.reminderEnabled ? 'Reminder Active' : 'Enable Reminder'}
                >
                  {group.reminderEnabled ? (
                    <Bell className="w-3.5 h-3.5" />
                  ) : (
                    <BellOff className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-[#1C1C1E] dark:text-white leading-snug">
                  {group.groupName}
                </h3>
                <div className="flex items-center gap-1.5 text-[13px] text-[#8E8E93] mt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{group.meetingTime}</span>
                </div>
              </div>

              {/* Action Buttons (iOS Style) */}
              <div className="pt-2.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleGroupRsvp(group.id, isAttending ? 'none' : 'attending')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition active:scale-95 ${
                      isAttending
                        ? 'bg-[#34C759] text-white shadow-xs'
                        : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]'
                    }`}
                  >
                    {isAttending && <Check className="w-3.5 h-3.5" />}
                    <span>{isAttending ? 'Attending' : 'Attend'}</span>
                  </button>

                  <button
                    onClick={() => toggleGroupRsvp(group.id, isInterested ? 'none' : 'interested')}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition active:scale-95 ${
                      isInterested
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]'
                    }`}
                  >
                    <span>{isInterested ? 'Interested ✓' : 'Interested'}</span>
                  </button>
                </div>

                {group.reminderEnabled && (
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Bell className="w-3 h-3" /> Alert On
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
