import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { SAMPLE_SERMONS } from '../data/seedData';
import { Sermon } from '../types';
import {
  Headphones,
  MessageCircle,
  Play,
  Send,
  User,
  Shield,
  Clock,
  BookOpen,
  Filter,
  Sparkles,
} from 'lucide-react';

export const PastorsScreen: React.FC = () => {
  const {
    playAudio,
    chatMessages,
    sendPastorMessage,
    jumpToScripture,
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
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Section Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Headphones className="w-4 h-4" />
            <span>Pastoral Ministry</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Teachings & Pastoral Care
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Expository sermon library and direct, confidential pastoral messenger.
          </p>
        </div>

        {/* Tab Pills: Sermons vs Counseling */}
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('sermons')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'sermons'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Sermon Archive</span>
          </button>
          <button
            onClick={() => setActiveTab('counseling')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'counseling'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pastoral Chat</span>
          </button>
        </div>
      </div>

      {/* 1. SERMONS ARCHIVE VIEW */}
      {activeTab === 'sermons' && (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sermons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSermons.map((sermon) => {
              const minutes = Math.floor(sermon.durationSec / 60);

              return (
                <div
                  key={sermon.id}
                  className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 shadow-sm flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-900 transition group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        {sermon.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>{minutes} min</span>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition">
                      {sermon.title}
                    </h4>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {sermon.speaker} • <span className="italic">{sermon.series}</span>
                    </p>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2 pt-1">
                      {sermon.description}
                    </p>

                    <div className="pt-1">
                      <button
                        onClick={() => handleScriptureRef(sermon.scriptureRef)}
                        className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Passage: {sermon.scriptureRef}</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
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
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold shadow transition"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Sermon</span>
                    </button>
                    <span className="text-[10px] text-stone-400 font-mono">CC0 Audio Track</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PASTORAL COUNSELING CHAT VIEW */}
      {activeTab === 'counseling' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col h-[600px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-serif font-bold flex items-center justify-center shadow-sm">
                TW
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Rev. Dr. Thomas Wright
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Senior Pastor • Confidential Pastoral Counseling</span>
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              Offline Cache
            </span>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.isFromUser ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {!msg.isFromUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-serif font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                    TW
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.isFromUser
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-bl-none border border-stone-200/50 dark:border-stone-700'
                  }`}
                >
                  <p>{msg.content}</p>
                  <span
                    className={`block text-[10px] mt-1.5 font-mono ${
                      msg.isFromUser ? 'text-amber-200 text-right' : 'text-stone-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-stone-50 dark:bg-stone-850 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Share a confidential question, prayer request, or note..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white transition active:scale-95 shadow"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
