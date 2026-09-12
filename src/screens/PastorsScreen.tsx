import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SAMPLE_SERMONS } from '../data/seedData';
import {
  Headphones,
  MessageCircle,
  Play,
  ArrowUp,
  Clock,
  BookOpen,
  Filter,
  Shield,
  Volume2,
  Library,
  ChevronRight,
} from 'lucide-react';

export const PastorsScreen: React.FC = () => {
  const {
    playAudio,
    chatMessages,
    sendPastorMessage,
    jumpToScripture,
    navigateTo,
  } = useSanctuary();

  const [activeTab, setActiveTab] = useState<'sermons' | 'counseling'>('sermons');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [inputMessage, setInputMessage] = useState<string>('');

  const categories = ['ALL', 'Grace', 'Faith', 'Family', 'Worship', 'Youth'];

  const filteredSermons = SAMPLE_SERMONS.filter((s) => {
    return selectedCategory === 'ALL' || s.category === selectedCategory;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendPastorMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleScriptureRef = (refStr: string) => {
    const parts = refStr.trim().split(' ');
    if (parts.length >= 2) {
      const book = parts.slice(0, -1).join(' ');
      const chVerse = parts[parts.length - 1].split(':');
      const chapter = parseInt(chVerse[0], 10) || 1;
      const verse = chVerse.length > 1 ? parseInt(chVerse[1], 10) : undefined;
      jumpToScripture(book, chapter, verse);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-5 animate-in fade-in duration-200">
      {/* Apple HIG Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2">
        <div>
          <span className="text-[13px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
            Ministry
          </span>
          <h1 className="text-[34px] font-bold tracking-tight text-[#1C1C1E] dark:text-white leading-tight">
            Pastoral Care
          </h1>
        </div>

        {/* iOS Segmented Bar for Sermons vs Counseling */}
        <div className="ios-segmented flex p-0.5 rounded-[9px] w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('sermons')}
            className={`flex-1 sm:flex-initial px-4 py-1 rounded-[7px] text-[12px] font-semibold transition ${
              activeTab === 'sermons'
                ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93]'
            }`}
          >
            Sermon Archive
          </button>
          <button
            onClick={() => setActiveTab('counseling')}
            className={`flex-1 sm:flex-initial px-4 py-1 rounded-[7px] text-[12px] font-semibold transition ${
              activeTab === 'counseling'
                ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93]'
            }`}
          >
            Pastoral Chat
          </button>
        </div>
      </div>

      {/* 1. SERMON ARCHIVE VIEW (Apple Podcasts Style) */}
      {activeTab === 'sermons' && (
        <div className="space-y-4">
          {/* Link to Full Sermon Library */}
          <button
            onClick={() => navigateTo('sermons')}
            className="w-full ios-card p-3.5 flex items-center justify-between border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition active:scale-99 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Library className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[14px] font-semibold text-[#1C1C1E] dark:text-white block leading-tight">
                  Open Expository Sermon Library
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  Browse markdown notes, filter by pastor, theme & date
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap transition active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-black/[0.04] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Podcasts Episode List */}
          <div className="space-y-3">
            {filteredSermons.map((sermon) => {
              const minutes = Math.floor(sermon.durationSec / 60);

              return (
                <div
                  key={sermon.id}
                  className="ios-card p-4 space-y-3 hover:border-black/15 dark:hover:border-white/20 transition"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Apple Podcasts Square Artwork */}
                    <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <Volume2 className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                          {sermon.category}
                        </span>
                        <span className="text-[11px] text-[#8E8E93]">
                          {minutes} mins
                        </span>
                      </div>

                      <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white mt-1 leading-snug">
                        {sermon.title}
                      </h3>

                      <p className="text-[12px] text-[#8E8E93] truncate mt-0.5">
                        {sermon.speaker} • {sermon.series}
                      </p>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#3C3C43] dark:text-[#EBEBF5]/80 line-clamp-2 leading-relaxed">
                    {sermon.description}
                  </p>

                  <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => handleScriptureRef(sermon.scriptureRef)}
                      className="text-[12px] font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{sermon.scriptureRef}</span>
                    </button>

                    <button
                      onClick={() =>
                        playAudio({
                          id: sermon.id,
                          title: sermon.title,
                          subtitle: `${sermon.speaker} • ${sermon.scriptureRef}`,
                          type: 'sermon',
                          durationSec: sermon.durationSec,
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[12px] font-semibold shadow-xs transition"
                    >
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                      <span>Play</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PASTORAL COUNSELING CHAT VIEW (Apple iMessage Style) */}
      {activeTab === 'counseling' && (
        <div className="ios-card overflow-hidden flex flex-col h-[580px] shadow-sm">
          {/* iMessage Header */}
          <div className="p-3.5 border-b border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-semibold flex items-center justify-center text-[13px] shadow-xs">
                TW
              </div>
              <div>
                <h4 className="font-semibold text-[14px] text-[#1C1C1E] dark:text-white leading-tight">
                  Rev. Dr. Thomas Wright
                </h4>
                <p className="text-[11px] text-[#8E8E93] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                  <span>Confidential Pastoral Care</span>
                </p>
              </div>
            </div>

            <span className="text-[11px] text-[#8E8E93] px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
              Encrypted
            </span>
          </div>

          {/* Messages Thread (Apple iMessage bubbles) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 select-text">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[80%] ${
                  msg.isFromUser ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-[18px] text-[14px] leading-relaxed shadow-2xs ${
                    msg.isFromUser
                      ? 'bg-amber-500 text-white rounded-br-[4px]'
                      : 'bg-[#E9E9EB] dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white rounded-bl-[4px]'
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
                <span className="text-[10px] text-[#8E8E93] mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>

          {/* iMessage Pill Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="iMessage confidential note or prayer..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2 text-[14px] bg-white dark:bg-[#2C2C2E] rounded-full border border-black/10 dark:border-white/10 text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-full bg-amber-500 disabled:opacity-30 text-white flex items-center justify-center transition active:scale-95 flex-shrink-0"
              aria-label="Send"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
