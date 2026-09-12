import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSanctuary } from '../context/SanctuaryContext';
import { STAFF_ACCOUNTS } from '../data/seedData';
import { StaffAccount, AnnouncementEntity, SermonEntity, PastorEntity } from '../types';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Send,
  Radio,
  Pin,
  Calendar,
  Trash2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Edit3,
  CheckCircle2,
  FileText,
  Plus,
  Eye,
  PenLine,
  UserPlus,
  Volume2,
  X,
  ExternalLink,
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
    pastors,
    sermons,
    addPastor,
    addSermon,
    updateSermon,
    deleteSermon,
    navigateTo,
  } = useSanctuary();

  // Active Portal Sub-Tab
  const [activeTab, setActiveTab] = useState<'sermons' | 'announcements'>('sermons');

  // Login Form State
  const [selectedStaffName, setSelectedStaffName] = useState<string>(STAFF_ACCOUNTS[0].name);
  const [passcode, setPasscode] = useState<string>(STAFF_ACCOUNTS[0].presetPasscode);
  const [loginError, setLoginError] = useState<string>('');

  // -------------------------------------------------------------
  // SERMON COMPOSER STATE
  // -------------------------------------------------------------
  const [editingSermonId, setEditingSermonId] = useState<string | null>(null);
  const [sermonTitle, setSermonTitle] = useState<string>('');
  const [sermonPastorId, setSermonPastorId] = useState<string>(pastors[0]?.id || 'pastor-wright');
  const [sermonTheme, setSermonTheme] = useState<string>('Grace');
  const [customThemeInput, setCustomThemeInput] = useState<string>('');
  const [isAddingNewTheme, setIsAddingNewTheme] = useState<boolean>(false);
  const [sermonDate, setSermonDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [sermonAudioUrl, setSermonAudioUrl] = useState<string>('track-sermon-live');
  const [sermonDurationMin, setSermonDurationMin] = useState<number>(32);
  const [sermonScriptureRefs, setSermonScriptureRefs] = useState<string>('Romans 8:28-39');
  const [sermonMarkdown, setSermonMarkdown] = useState<string>(
    `## Expository Notes & Scripture Focus\n\n> "And we know that all things work together for good to them that love God." — Romans 8:28\n\n### 1. The Anchor of Divine Purpose\nTrue peace does not come from the absence of storms, but from the unyielding presence of Christ amidst the waves.\n\n* **Comprehensive Sovereignty:** Nothing escapes God's care.\n* **Eternal Security:** Conformed to the image of His Son.\n\n### Application for Believers\n1. Meditate on God's covenant faithfulness.\n2. Encourage someone in your prayer fellowship.`
  );
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const [sermonIsPublished, setSermonIsPublished] = useState<boolean>(true);

  // New Pastor Modal / Inline State
  const [showAddPastorModal, setShowAddPastorModal] = useState<boolean>(false);
  const [newPastorName, setNewPastorName] = useState<string>('');
  const [newPastorRole, setNewPastorRole] = useState<string>('Teaching Pastor');
  const [newPastorBio, setNewPastorBio] = useState<string>('');

  // -------------------------------------------------------------
  // ANNOUNCEMENT COMPOSER STATE
  // -------------------------------------------------------------
  const [announcementTitle, setAnnouncementTitle] = useState<string>('');
  const [announcementContent, setAnnouncementContent] = useState<string>('');
  const [announcementCategory, setAnnouncementCategory] = useState<
    'General' | 'Worship' | 'Outreach' | 'Youth' | 'Community'
  >('Worship');
  const [announcementScriptureRef, setAnnouncementScriptureRef] = useState<string>('Romans 12:1-2');
  const [announcementIsPinned, setAnnouncementIsPinned] = useState<boolean>(false);
  const [announcementIsScheduled, setAnnouncementIsScheduled] = useState<boolean>(false);
  const [announcementScheduledDate, setAnnouncementScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );

  const announcementCategories: Array<'General' | 'Worship' | 'Outreach' | 'Youth' | 'Community'> = [
    'General',
    'Worship',
    'Outreach',
    'Youth',
    'Community',
  ];

  // Preset themes
  const baseThemes = ['Grace', 'Faith', 'Family', 'Worship', 'Youth', 'Prayer', 'Hope', 'Discipleship'];

  // All themes currently in use or preset
  const allAvailableThemes = Array.from(
    new Set([...baseThemes, ...sermons.map((s) => s.theme).filter(Boolean)])
  ).sort();

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginStaff(passcode.trim());
    if (!success) {
      setLoginError('Invalid passcode. Please enter the 4-digit code shown.');
    } else {
      setPasscode('');
    }
  };

  // Add new Pastor
  const handleSaveNewPastor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPastorName.trim()) return;

    const created = addPastor({
      name: newPastorName.trim(),
      roleTitle: newPastorRole.trim() || 'Guest Preacher',
      bio: newPastorBio.trim(),
    });

    setSermonPastorId(created.id);
    setNewPastorName('');
    setNewPastorRole('Teaching Pastor');
    setNewPastorBio('');
    setShowAddPastorModal(false);
  };

  // Save / Publish Sermon Handler
  const handleSaveSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sermonTitle.trim() || !sermonMarkdown.trim()) return;

    const finalTheme = isAddingNewTheme && customThemeInput.trim()
      ? customThemeInput.trim()
      : sermonTheme;

    const refs = sermonScriptureRefs
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const durationSec = (sermonDurationMin || 30) * 60;

    if (editingSermonId) {
      // Update existing
      updateSermon(editingSermonId, {
        title: sermonTitle.trim(),
        pastorId: sermonPastorId,
        theme: finalTheme,
        sermonDate,
        markdownContent: sermonMarkdown,
        audioUrl: sermonAudioUrl.trim() || undefined,
        durationSec,
        scriptureRefs: refs.length > 0 ? refs : undefined,
        isPublished: sermonIsPublished,
      });
      setEditingSermonId(null);
    } else {
      // Create new
      addSermon({
        title: sermonTitle.trim(),
        pastorId: sermonPastorId,
        theme: finalTheme,
        sermonDate,
        markdownContent: sermonMarkdown,
        audioUrl: sermonAudioUrl.trim() || undefined,
        durationSec,
        scriptureRefs: refs.length > 0 ? refs : undefined,
        isPublished: sermonIsPublished,
      });
    }

    // Reset Form
    setSermonTitle('');
    setCustomThemeInput('');
    setIsAddingNewTheme(false);
    setSermonMarkdown('');
    setSermonScriptureRefs('');
    setEditorMode('write');
    setSermonIsPublished(true);
  };

  // Populate form to edit existing sermon
  const handleStartEditSermon = (sermon: SermonEntity) => {
    setEditingSermonId(sermon.id);
    setSermonTitle(sermon.title);
    setSermonPastorId(sermon.pastorId);
    setSermonTheme(sermon.theme);
    setIsAddingNewTheme(false);
    setSermonDate(sermon.sermonDate);
    setSermonAudioUrl(sermon.audioUrl || '');
    setSermonDurationMin(sermon.durationSec ? Math.round(sermon.durationSec / 60) : 30);
    setSermonScriptureRefs(sermon.scriptureRefs ? sermon.scriptureRefs.join(', ') : '');
    setSermonMarkdown(sermon.markdownContent);
    setSermonIsPublished(sermon.isPublished);
    setEditorMode('write');

    // Smooth scroll to composer
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingSermonId(null);
    setSermonTitle('');
    setSermonMarkdown('');
    setSermonScriptureRefs('');
    setEditorMode('write');
  };

  // Announcement submit handler
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim() || !loggedInStaff) return;

    addAnnouncement({
      title: announcementTitle.trim(),
      content: announcementContent.trim(),
      authorName: loggedInStaff.name,
      category: announcementCategory,
      scriptureRef: announcementScriptureRef.trim() || undefined,
      isPinned: announcementIsPinned,
      isScheduled: announcementIsScheduled,
      scheduledAt: announcementIsScheduled ? new Date(announcementScheduledDate).toISOString() : undefined,
    });

    setAnnouncementTitle('');
    setAnnouncementContent('');
    setAnnouncementIsPinned(false);
    setAnnouncementIsScheduled(false);
  };

  // -------------------------------------------------------------
  // IF NOT LOGGED IN: Apple Security Access Screen
  // -------------------------------------------------------------
  if (!loggedInStaff) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
        <div className="text-center space-y-1.5">
          <div className="w-14 h-14 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1C1C1E] dark:text-white">
            Staff Companion Portal
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Pastoral leadership authentication for managing the sermon library and publishing congregation notices.
          </p>
        </div>

        <div className="ios-card p-6 space-y-5 border border-black/[0.04] dark:border-white/[0.06]">
          {/* Quick Staff Selection Chips */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider block">
              Select Staff Account
            </label>
            <div className="space-y-2">
              {STAFF_ACCOUNTS.map((staff) => (
                <button
                  key={staff.name}
                  type="button"
                  onClick={() => {
                    setSelectedStaffName(staff.name);
                    setPasscode(staff.presetPasscode);
                    setLoginError('');
                  }}
                  className={`w-full p-3 rounded-[12px] flex items-center justify-between text-left transition border ${
                    selectedStaffName === staff.name
                      ? 'border-indigo-500 bg-indigo-500/5'
                      : 'border-black/[0.06] dark:border-white/[0.08] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${staff.avatarColor} flex items-center justify-center text-[11px] font-bold`}>
                      {staff.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[#1C1C1E] dark:text-white leading-tight">
                        {staff.name}
                      </h4>
                      <span className="text-[11px] text-[#8E8E93]">{staff.role}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white">
                    PIN: {staff.presetPasscode}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider block mb-1.5">
                4-Digit Staff Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••"
                  className="w-full text-center tracking-[0.5em] text-[22px] font-mono font-bold py-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-[12px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              {loginError && (
                <p className="text-[12px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-semibold text-[14px] shadow-xs transition"
            >
              Authenticate Pastoral Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // IF LOGGED IN: Staff Management Panel
  // -------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Authenticated Staff Header Bar */}
      <div className="ios-card p-4 flex items-center justify-between border border-black/[0.04] dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-[13px] shadow-xs">
            {loggedInStaff.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
                {loggedInStaff.name}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-400">
                Staff Verified
              </span>
            </div>
            <p className="text-[12px] text-[#8E8E93]">
              {loggedInStaff.role}
            </p>
          </div>
        </div>

        <button
          onClick={logoutStaff}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[12px] font-medium text-[#1C1C1E] dark:text-white transition active:scale-95"
        >
          <LogOut className="w-3.5 h-3.5 text-[#8E8E93]" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Segmented Tab Switch: Sermon Library Composer vs Announcements */}
      <div className="ios-segmented flex p-1 rounded-[12px] bg-black/[0.05] dark:bg-white/[0.08]">
        <button
          onClick={() => setActiveTab('sermons')}
          className={`flex-1 py-2 rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === 'sermons'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Sermon Library Composer ({sermons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-2 rounded-[10px] text-[13px] font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === 'announcements'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
              : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Bulletins & Notices ({announcements.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SERMON LIBRARY COMPOSER & ARCHIVE                 */}
      {/* ========================================================= */}
      {activeTab === 'sermons' && (
        <div className="space-y-6">
          {/* Editing Mode Alert Banner */}
          {editingSermonId && (
            <div className="p-3.5 rounded-[14px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-[13px] font-medium text-amber-900 dark:text-amber-200">
                  Editing existing sermon: <strong>"{sermonTitle}"</strong>
                </span>
              </div>
              <button
                onClick={handleCancelEdit}
                className="text-[12px] font-semibold text-amber-700 dark:text-amber-300 hover:underline"
              >
                Cancel Edit
              </button>
            </div>
          )}

          {/* Sermon Composer Form Card */}
          <div className="ios-card p-6 space-y-5 border border-black/[0.04] dark:border-white/[0.06]">
            <div className="flex items-center justify-between pb-1 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <h3 className="text-[16px] font-semibold text-[#1C1C1E] dark:text-white">
                  {editingSermonId ? 'Update Sermon Message' : 'Author New Expository Sermon'}
                </h3>
              </div>
              <span className="text-[12px] font-medium text-[#8E8E93]">
                Offline Drift Storage
              </span>
            </div>

            <form onSubmit={handleSaveSermon} className="space-y-4">
              {/* 1. Title */}
              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Sermon Title *
                </label>
                <input
                  type="text"
                  required
                  value={sermonTitle}
                  onChange={(e) => setSermonTitle(e.target.value)}
                  placeholder="e.g. Anchored in Unshakable Grace"
                  className="w-full px-3.5 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* 2. Preacher Dropdown + Add New Pastor Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      Preacher / Pastor *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddPastorModal(true)}
                      className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>+ Add Pastor</span>
                    </button>
                  </div>
                  <select
                    value={sermonPastorId}
                    onChange={(e) => setSermonPastorId(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {pastors.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.roleTitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Theme Dropdown + Add New Tag */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                      Theme Tag *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAddingNewTheme(!isAddingNewTheme)}
                      className="text-[11px] font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{isAddingNewTheme ? 'Select Existing' : '+ New Tag'}</span>
                    </button>
                  </div>

                  {isAddingNewTheme ? (
                    <input
                      type="text"
                      placeholder="e.g. Holiness, Covenant, Hope"
                      value={customThemeInput}
                      onChange={(e) => setCustomThemeInput(e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  ) : (
                    <select
                      value={sermonTheme}
                      onChange={(e) => setSermonTheme(e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {allAvailableThemes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* 4. Sermon Date, Duration & Audio URL */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Sermon Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={sermonDate}
                    onChange={(e) => setSermonDate(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={sermonDurationMin}
                    onChange={(e) => setSermonDurationMin(parseInt(e.target.value, 10) || 30)}
                    className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Audio Recording URL
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. audio-track-key"
                    value={sermonAudioUrl}
                    onChange={(e) => setSermonAudioUrl(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* 5. Scripture References Deep-link tag list */}
              <div>
                <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Scripture References (Comma separated, e.g. Romans 8:28-39, Psalms 23:1-4)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Romans 8:28-39, Psalms 23:1-4"
                  value={sermonScriptureRefs}
                  onChange={(e) => setSermonScriptureRefs(e.target.value)}
                  className="w-full px-3.5 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* 6. Markdown Editor with "Write" / "Preview" Tabs */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                    Expository Body (Markdown) *
                  </label>

                  {/* Write vs Preview Toggle Switch */}
                  <div className="flex rounded-[8px] bg-black/[0.06] dark:bg-white/[0.08] p-0.5 text-[12px]">
                    <button
                      type="button"
                      onClick={() => setEditorMode('write')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-[6px] font-medium transition ${
                        editorMode === 'write'
                          ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-2xs font-semibold'
                          : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <PenLine className="w-3.5 h-3.5" />
                      <span>Write</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode('preview')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-[6px] font-medium transition ${
                        editorMode === 'preview'
                          ? 'bg-white dark:bg-[#3A3A3C] text-[#1C1C1E] dark:text-white shadow-2xs font-semibold'
                          : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                {editorMode === 'write' ? (
                  <div>
                    <textarea
                      required
                      rows={9}
                      value={sermonMarkdown}
                      onChange={(e) => setSermonMarkdown(e.target.value)}
                      placeholder="Type sermon notes in Markdown: # Heading, > Scripture Blockquote, * Bullet list, **Bold truths**..."
                      className="w-full px-3.5 py-2.5 text-[14px] font-mono bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed resize-y"
                    />
                    <span className="text-[11px] text-[#8E8E93] block mt-1">
                      Supports Markdown headings, bullet points, blockquotes, bold/italics, and Bible verse tags.
                    </span>
                  </div>
                ) : (
                  <div className="p-4 rounded-[10px] bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] min-h-[220px]">
                    <div className="sermon-markdown font-reading text-[15px] text-[#1C1C1E] dark:text-[#EBEBF5]">
                      {sermonMarkdown.trim() ? (
                        <ReactMarkdown>{sermonMarkdown}</ReactMarkdown>
                      ) : (
                        <span className="text-[#8E8E93] italic">
                          No Markdown notes typed yet. Switch back to "Write" to add content.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 7. Draft vs Published Status Toggle */}
              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[14px] font-medium text-[#1C1C1E] dark:text-white block">
                    {sermonIsPublished ? 'Publish Live to Congregation' : 'Save as Internal Draft'}
                  </span>
                  <span className="text-[11px] text-[#8E8E93]">
                    {sermonIsPublished
                      ? 'Visible to all church members in Sermon Library'
                      : 'Saved in offline database for staff review before publication'}
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sermonIsPublished}
                    onChange={(e) => setSermonIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {editingSermonId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-full text-[13px] font-medium text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white transition"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[13px] font-semibold shadow-xs transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {editingSermonId
                      ? 'Save Sermon Updates'
                      : sermonIsPublished
                      ? 'Publish to Sermon Library'
                      : 'Save Local Draft'}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Existing Sermons to Edit / Delete */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Managed Sermons ({sermons.length})
              </span>
              <button
                onClick={() => navigateTo('sermons')}
                className="text-[12px] font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Open Library Screen</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {sermons.map((sermon) => {
                const pastor = pastors.find((p) => p.id === sermon.pastorId);
                return (
                  <div
                    key={sermon.id}
                    className="ios-card p-4 border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            sermon.isPublished
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                              : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {sermon.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white">
                          {sermon.theme}
                        </span>
                        <span className="text-[11px] text-[#8E8E93]">
                          {sermon.sermonDate}
                        </span>
                      </div>

                      <h4 className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white truncate">
                        {sermon.title}
                      </h4>
                      <p className="text-[12px] text-[#8E8E93] truncate">
                        {pastor?.name || 'Unknown Pastor'} • {Math.round((sermon.durationSec || 1800) / 60)} min
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleStartEditSermon(sermon)}
                        className="px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#1C1C1E] dark:text-white text-[12px] font-semibold transition active:scale-95 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${sermon.title}" from the library?`)) {
                            deleteSermon(sermon.id);
                          }
                        }}
                        className="w-8 h-8 rounded-full text-[#8E8E93] hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center active:scale-95 transition"
                        title="Delete Sermon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: BULLETINS & ANNOUNCEMENTS                         */}
      {/* ========================================================= */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider px-3">
              Publish Notice
            </span>
            <div className="ios-card p-5 space-y-4 border border-black/[0.04] dark:border-white/[0.06]">
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunday Communion Service"
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                      Ministry Category
                    </label>
                    <select
                      value={announcementCategory}
                      onChange={(e) => setAnnouncementCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      {announcementCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                      Scripture Tag (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Romans 12:1-2"
                      value={announcementScriptureRef}
                      onChange={(e) => setAnnouncementScriptureRef(e.target.value)}
                      className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                    Announcement Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide information for the congregation..."
                    value={announcementContent}
                    onChange={(e) => setAnnouncementContent(e.target.value)}
                    className="w-full px-3.5 py-2 text-[14px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-[12px] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[14px] font-medium text-[#1C1C1E] dark:text-white block">
                        Pin to Top of Feed
                      </span>
                      <span className="text-[11px] text-[#8E8E93]">Keep this notice at the very top of Today view</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={announcementIsPinned}
                        onChange={(e) => setAnnouncementIsPinned(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[14px] font-medium text-[#1C1C1E] dark:text-white block">
                        Schedule Publication
                      </span>
                      <span className="text-[11px] text-[#8E8E93]">Publish automatically at a future time</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={announcementIsScheduled}
                        onChange={(e) => setAnnouncementIsScheduled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#E5E5EA] dark:bg-[#39393D] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                    </label>
                  </div>

                  {announcementIsScheduled && (
                    <div className="pt-1">
                      <input
                        type="datetime-local"
                        value={announcementScheduledDate}
                        onChange={(e) => setAnnouncementScheduledDate(e.target.value)}
                        className="px-3 py-1.5 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[13px] font-semibold shadow-xs transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>{announcementIsScheduled ? 'Schedule Bulletin' : 'Publish Live'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Published Feed Archive */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-[12px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Active Bulletins ({announcements.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="ios-card p-4 space-y-2 border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[#1C1C1E] dark:text-white">
                        {item.category}
                      </span>
                      {item.isPinned && (
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                          <Pin className="w-3 h-3 fill-current" /> Pinned
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => broadcastAnnouncement(item.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 text-[11px] font-semibold active:scale-95 transition"
                      >
                        <Radio className="w-3 h-3" />
                        <span>Broadcast</span>
                      </button>

                      <button
                        onClick={() => deleteAnnouncement(item.id)}
                        className="w-7 h-7 rounded-full text-[#8E8E93] hover:text-red-500 flex items-center justify-center active:scale-95 transition"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-[15px] font-semibold text-[#1C1C1E] dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-[#3C3C43] dark:text-[#EBEBF5]/80 line-clamp-2 leading-relaxed">
                    {item.content}
                  </p>

                  <span className="text-[11px] text-[#8E8E93] block pt-1">
                    Author: {item.authorName} • {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW PASTOR                                    */}
      {/* ========================================================= */}
      {showAddPastorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="ios-card w-full max-w-md p-6 space-y-4 border border-black/[0.08] dark:border-white/[0.1] shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#1C1C1E] dark:text-white">
                Add Pastor / Preacher
              </h3>
              <button
                type="button"
                onClick={() => setShowAddPastorModal(false)}
                className="w-7 h-7 rounded-full text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPastor} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Full Name & Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pastor Marcus Vance"
                  value={newPastorName}
                  onChange={(e) => setNewPastorName(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Role / Ministry Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Guest Evangelist or Discipleship Pastor"
                  value={newPastorRole}
                  onChange={(e) => setNewPastorRole(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of calling and background..."
                  value={newPastorBio}
                  onChange={(e) => setNewPastorBio(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] bg-black/[0.04] dark:bg-white/[0.06] rounded-[10px] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPastorModal(false)}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[13px] shadow-xs active:scale-95 transition"
                >
                  Save to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
