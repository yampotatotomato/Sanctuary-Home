import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import {
  BookOpen,
  Sun,
  Headphones,
  Users,
  Feather,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from 'lucide-react';

interface Step {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  highlight: string;
}

export const OnboardingModal: React.FC = () => {
  const { onboardingCompleted, completeOnboarding } = useSanctuary();
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (onboardingCompleted) return null;

  const steps: Step[] = [
    {
      title: 'Welcome to Church Sanctuary',
      subtitle: 'Your Sacred Offline-First Spiritual Companion',
      description:
        'A distraction-free, cross-platform space engineered to nourish your daily walk with Christ—whether you are in church, traveling off-grid, or in quiet devotion.',
      icon: <Sparkles className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
      tag: 'Sanctuary Vision',
      highlight: 'Zero subscription fees, zero advertising, 100% focused on Scripture and fellowship.',
    },
    {
      title: '100% Offline Public-Domain Scripture',
      subtitle: 'King James, World English, ASV & BBE',
      description:
        'Access the complete Old & New Testaments completely offline. We adhere strictly to open-license and public-domain translations (KJV, WEB, ASV, BBE) with zero commercial restrictions.',
      icon: <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      tag: 'Pure Scripture',
      highlight: 'Switch translations instantly, search without internet, bookmark sacred verses.',
    },
    {
      title: 'Morning & Evening Guided Devotionals',
      subtitle: 'Scripture Meditation with Narration',
      description:
        'Begin each dawn and conclude each dusk with structured pastoral reflections, introspective questions, closing prayers, and soothing narration playback.',
      icon: <Sun className="w-10 h-10 text-amber-500 dark:text-amber-300" />,
      tag: 'Spiritual Rhythms',
      highlight: 'Tappable scripture citations jump straight to the exact verse in your Bible reader.',
    },
    {
      title: 'Sermon Archive & Pastoral Counseling',
      subtitle: 'Audio Teachings & Confidential Messenger',
      description:
        'Listen to expository sermon archives with speed control, seek, and background mini-player. Need counsel? Message Pastor Thomas Wright directly in the private pastoral chat.',
      icon: <Headphones className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      tag: 'Pastoral Care',
      highlight: 'All messages and sermon playback progress are cached locally on your device.',
    },
    {
      title: 'Prayer Groups & Personal Journal',
      subtitle: 'Worship Circles & Gratitude Reflections',
      description:
        'Connect with Men\'s, Women\'s, Youth, and Outreach groups with 1-tap RSVP and meeting reminders. Deepen gratitude with personal dated journal entries and scripture tags.',
      icon: <Users className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />,
      tag: 'Community Life',
      highlight: 'Never miss a fellowship meeting with offline calendar synchronization.',
    },
    {
      title: 'Staff Companion Portal',
      subtitle: 'Author Announcements & Broadcast Live',
      description:
        'Authorized church pastors and ministry leaders can sign in with preset staff codes to draft announcements, schedule publication dates, and broadcast urgent notices.',
      icon: <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
      tag: 'Ministry Leadership',
      highlight: '4 preset accounts for Rev. Wright, Pastor Jenkins, David Miller, and Hannah Kim.',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden flex flex-col">
        {/* Top Header with step indicator & Skip button */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'w-7 bg-amber-600 dark:bg-amber-400'
                    : i < currentStep
                    ? 'w-3 bg-amber-600/40 dark:bg-amber-400/40'
                    : 'w-2 bg-stone-200 dark:bg-stone-700'
                }`}
              />
            ))}
            <span className="text-xs font-semibold text-stone-400 ml-2">
              {currentStep + 1} of {steps.length}
            </span>
          </div>

          <button
            onClick={completeOnboarding}
            className="text-xs font-medium text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 px-3 py-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            Skip Intro
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-stone-800 border border-amber-200/60 dark:border-stone-700 flex items-center justify-center shadow-inner mb-5">
            {step.icon}
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 mb-2">
            {step.tag}
          </span>

          <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {step.title}
          </h3>

          <p className="text-sm font-medium text-amber-900/80 dark:text-amber-200/80 mt-1 mb-4">
            {step.subtitle}
          </p>

          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-md">
            {step.description}
          </p>

          <div className="mt-5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300 font-medium max-w-md">
            <span className="font-bold text-stone-900 dark:text-stone-100">Key Feature: </span>
            {step.highlight}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-sm font-semibold px-4 py-2.5 rounded-xl border transition ${
              currentStep === 0
                ? 'opacity-0 pointer-events-none'
                : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white shadow-md transition"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Check className="w-4 h-4" /> Enter Sanctuary
              </>
            ) : (
              <>
                Next <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
