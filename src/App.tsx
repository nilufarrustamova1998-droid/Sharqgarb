/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BADGES, DID_YOU_KNOW_FACTS } from './data';
import { UserStats, Badge } from './types';
import { 
  GraduationCap, 
  Globe2, 
  Calculator, 
  FlaskConical, 
  BookOpen, 
  Trophy, 
  Users, 
  Award, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Heart,
  FileText,
  Lightbulb,
  Check,
  Instagram,
  Compass,
  Zap,
  Star
} from 'lucide-react';

import AbacusSimulator from './components/AbacusSimulator';
import StemSimulator from './components/StemSimulator';
import StoryTime from './components/StoryTime';
import QuizSection from './components/QuizSection';
import ParentTeacherGuide from './components/ParentTeacherGuide';

export default function App() {
  // Tanlangan faol darcha (tab)
  const [activeTab, setActiveTab] = useState<'home' | 'abacus' | 'stem' | 'stories' | 'quizzes' | 'guide'>('home');

  // Foydalanuvchi statistikalari (State)
  const [stats, setStats] = useState<UserStats>({
    points: 100, // Boshlang'ich ball
    completedQuizzes: [],
    completedStories: [],
    unlockedBadges: ['first_step'], // 'first_step' nishoni boshlanishiga ochilgan
    abacusCalculations: 0,
    stemExperiments: 0
  });

  // Fact (Bilasizmi?) burchagi uchun faol fakt indeksi
  const [activeFactIdx, setActiveFactIdx] = useState(0);

  // Tabriklash so'zi (Agar yangi badge ochilsa qalqib chiquvchi oyna)
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    // Agar localStorageda saqlangan stats bo'lsa tiklash yuklanadi (Netlifyda saqlash barqarorligi uchun)
    const stored = localStorage.getItem('sharq_garb_stats');
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch (e) {
        console.error("Local storage stats parsing error", e);
      }
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setStats(newStats);
    localStorage.setItem('sharq_garb_stats', JSON.stringify(newStats));
  };

  // Ball qo'shish
  const handleAddPoints = (amount: number) => {
    const next = { ...stats, points: stats.points + amount };
    saveStats(next);
  };

  // Yangi nishon ochish
  const handleUnlockBadge = (badgeId: string) => {
    if (stats.unlockedBadges.includes(badgeId)) return;

    const badge = BADGES.find(b => b.id === badgeId);
    if (badge) {
      const next = {
        ...stats,
        unlockedBadges: [...stats.unlockedBadges, badgeId],
        points: stats.points + 100 // Nishon uchun bonus 100 ball
      };
      saveStats(next);
      setNewlyUnlockedBadge(badge);

      // 5 soniyadan keyin tabriklar panelini o'chiramiz
      setTimeout(() => {
        setNewlyUnlockedBadge(null);
      }, 5000);
    }
  };

  // Hikoya tugallanganda
  const handleStoryCompleted = (storyId: string) => {
    if (stats.completedStories.includes(storyId)) return;
    const next = {
      ...stats,
      completedStories: [...stats.completedStories, storyId],
      points: stats.points + 50
    };
    saveStats(next);
  };

  // Quiz darajasi o'tilganda
  const handleQuizCompleted = (levelId: string) => {
    if (stats.completedQuizzes.includes(levelId)) return;
    const next = {
      ...stats,
      completedQuizzes: [...stats.completedQuizzes, levelId],
      points: stats.points + 80
    };
    saveStats(next);
  };

  const nextFact = () => {
    setActiveFactIdx((prev) => (prev + 1) % DID_YOU_KNOW_FACTS.length);
  };

  const prevFact = () => {
    setActiveFactIdx((prev) => (prev - 1 + DID_YOU_KNOW_FACTS.length) % DID_YOU_KNOW_FACTS.length);
  };

  const currentFact = DID_YOU_KNOW_FACTS[activeFactIdx];

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-slate-800 font-sans flex flex-col relative" id="app-wrapper">
      
      {/* Dynamic Notification on Badge Unlock */}
      <AnimatePresence>
        {newlyUnlockedBadge && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white rounded-2xl p-5 shadow-2xl border-2 border-amber-300 w-11/12 max-w-md text-center"
            id="badge-unlock-notification"
          >
            <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 bg-white rounded-full p-2 border-2 border-amber-400 text-lg">
              🏆
            </div>
            <h4 className="font-black text-base mt-2">Yangi Nishon Ochildi! 🎉</h4>
            <div className="font-extrabold text-lg my-1.5 uppercase hover:scale-110 transition-transform">
              "{newlyUnlockedBadge.title}"
            </div>
            <p className="text-xs text-amber-50 leading-relaxed font-semibold">
              {newlyUnlockedBadge.description}
            </p>
            <div className="mt-3 bg-white/20 text-[10px] font-mono py-1 rounded-lg">
              Yangi Bonus: +100 Ilm ballari qo'shildi!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header / Navigation bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4" id="main-header">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="p-2.5 bg-gradient-to-br from-amber-500 via-rose-500 to-blue-600 rounded-2xl text-white shadow-md shadow-amber-500/10 hover:rotate-6 transition-transform">
            <Globe2 className="w-7 h-7 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-1">
              Sharq & G'arb <span className="text-amber-500">ta'limi</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-extrabold tracking-widest uppercase">
              Innovatsion ta'lim sintezi
            </p>
          </div>
        </div>

        {/* Global Stats tracker */}
        <div className="flex items-center gap-4 bg-slate-100/70 border border-slate-200 px-4 py-2 rounded-2xl max-w-sm w-full sm:w-auto justify-around">
          <div className="text-center sm:text-left">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">To'plangan ballar:</span>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="text-sm font-black font-mono text-slate-800">{stats.points} Ball</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="text-center sm:text-left">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider leading-none">Ochilgan Yutuqlar:</span>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <Award className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-bold text-slate-700">{stats.unlockedBadges.length} / {BADGES.length} nishon</span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Access Top Sub-tabs Menu bar */}
      <div className="bg-white border-b border-slate-150 px-4 py-2.5 overflow-x-auto flex gap-1.5 md:justify-center no-scrollbar" id="nav-tabs-wrapper">
        {[
          { id: 'home', label: 'Bosh sahifa', icon: Globe2, color: 'text-rose-500 bg-rose-50' },
          { id: 'abacus', label: 'Soroban Abakus (Sharq)', icon: Calculator, color: 'text-amber-600 bg-amber-50' },
          { id: 'stem', label: 'STEM Laboratoriya (G\'arb)', icon: FlaskConical, color: 'text-blue-600 bg-blue-50' },
          { id: 'stories', label: 'Ertak va Donolik', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
          { id: 'quizzes', label: 'Zakovat Testlari', icon: Trophy, color: 'text-violet-600 bg-violet-50' },
          { id: 'guide', label: 'Ota-ona & Ustozlar', icon: Users, color: 'text-rose-600 bg-rose-50' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm scale-102'
                  : 'text-slate-600 hover:text-slate-900 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color.split(' ')[0]}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Page Layout Content wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
              id="home-view"
            >
              {/* Dynamic Hero Banner */}
              <div className="bg-gradient-to-br from-amber-600/90 via-rose-600/95 to-indigo-700/95 rounded-3xl p-6 md:p-12 text-white relative overflow-hidden shadow-xl shadow-stone-200/50">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
                  <Globe2 className="w-full h-full text-white animate-spin-slow rotate-12" />
                </div>
                <div className="max-w-2xl relative z-10 space-y-4">
                  <span className="text-[10px] uppercase font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30 tracking-widest inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    Boshlang'ich maktab uchun innovatsion portal
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                    Sharqning Sabr-Intizomi va G'arbning Erkin Kreativligi!
                  </h2>
                  <p className="text-sm md:text-base text-amber-50 leading-relaxed font-medium">
                    "Sharq va G'arb ta'limi" bu o'quvchilarga dunyoqarashini kengaytirish imkonini beruvchi ilk ko'prikdir. Bir vaqtning o'zida ham qadimgi osiyo hisob-kitob asboblarini boshqaring, ham g'arbiy ilmiy usullarni simulyatsiyadan o'tkazing!
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => setActiveTab('abacus')}
                      className="px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      Sharq Abakusini o'rganish &rarr;
                    </button>
                    <button
                      onClick={() => setActiveTab('stem')}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-md border border-blue-500/35"
                    >
                      STEM Labni yoqish 🧪
                    </button>
                  </div>
                </div>
              </div>

              {/* Bento grid panels section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Fact Counter (Qiziqarli faktlar bo'limi "Bilasizmi?") */}
                <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-lg shadow-amber-50/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-amber-50 pb-4 mb-4">
                      <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Bilasizmi? (Kashfiyotlar tarixi)
                      </h3>
                      <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded ${
                        currentFact.badge === 'Sharq' ? 'bg-amber-100 text-amber-800' :
                        currentFact.badge === 'G\'arb' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {currentFact.badge} kashfiyoti
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-slate-800">{currentFact.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{currentFact.description}</p>
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/80 text-[11px] text-slate-600 leading-relaxed font-serif">
                        {currentFact.detail}
                      </div>
                    </div>
                  </div>

                  {/* Fact Carousel buttons */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                    <div className="text-[10px] text-slate-400 font-bold">
                      Fakt {activeFactIdx + 1} / {DID_YOU_KNOW_FACTS.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={prevFact}
                        className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextFact}
                        className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Achievements Shelf (Nishonlar xonasi) */}
                <div className="md:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-md flex flex-col justify-between" id="achievements-card">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-4 mb-4">
                      <Award className="w-4 h-4 text-violet-500" /> Sizning nishonlaringiz
                    </h3>

                    {/* Badge icons list */}
                    <div className="grid grid-cols-4 gap-3">
                      {BADGES.map((badge) => {
                        const isUnlocked = stats.unlockedBadges.includes(badge.id);

                        return (
                          <div
                            key={badge.id}
                            className={`flex flex-col items-center p-2 rounded-xl text-center relative group ${
                              isUnlocked ? 'bg-slate-50 border border-slate-150' : 'bg-slate-100/30 opacity-40 select-none'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${isUnlocked ? badge.color : 'from-slate-200 to-slate-350'} text-white flex items-center justify-center text-md shadow-sm`}>
                              {badge.id === 'soroban_master' ? '🧮' :
                               badge.id === 'young_scientist' ? '🧪' :
                               badge.id === 'philosopher_kid' ? '📖' :
                               badge.id === 'east_west_ambassador' ? '🌍' : '🎖️'}
                            </div>
                            <span className="text-[8px] font-bold text-slate-700 mt-1.5 line-clamp-1 leading-tight">
                              {badge.title}
                            </span>

                            {/* Hover tooltip for badge description if unlocked */}
                            {isUnlocked && (
                              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white p-2 rounded-lg text-[9px] w-28 hidden group-hover:block border border-slate-805 leading-snug">
                                {badge.description}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Motivational footer banner */}
                  <div className="bg-violet-50/50 border border-violet-100/60 p-3 rounded-2xl text-[10px] text-violet-700 leading-normal font-semibold mt-4">
                    📌 Maslahat: Ko'proq mantiqiy savollarga javob berish va tajriba o'tkazish orqali barcha nishonlarni to'plang!
                  </div>
                </div>

              </div>

              {/* Methodology Sinopsis (Sharq vs G'arb dualism) */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-1.50 shadow-md">
                <div className="text-center max-w-lg mx-auto mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Qaysi sohada kim birinchi?</h3>
                  <p className="text-xs text-slate-500 mt-1">Har ikki yondashuvning bolalarni daho qilib shakllantirishidagi ajoyib o'rni:</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100/80">
                  {/* Eastern methodology column */}
                  <div className="space-y-4 pb-6 md:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
                        ☀️
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800">Sharq donolik ta'limi</h4>
                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wide">Intizom, Xotira va Ezgulik</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 pl-3">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><b>Mental arifmetika:</b> Xotira, tasavvur va o'z diqqatini cheksiz chalg'ishlardan hisoblash.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><b>Axloqiy qadriyatlar:</b> Ustozlar va kattalarga yuqori sadoqat va do'stona hurmat.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span><b>Klassik fables therapy:</b> Ibratli ertaklar orqali falsafiy qarorlar mustahkamligi.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Western methodology column */}
                  <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                        🌙
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800">G'arb ilmiy ta'limi</h4>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Tajriba, STEM va Savollar</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 pl-3">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span><b>STEM darsliklari:</b> Har bir darsni quruq yodlash emas, biologik/fizik laboratoriyada his qilish.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span><b>Sog'lom munozara:</b> O'quvchining 'Nega?' degan savoliga keng sharoit yaratib berish.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span><b>Loyiha va Jamoada ishlash:</b> Muammoni birgalikda yechish, lidership muhiti.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'abacus' && (
            <motion.div
              key="abacus"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <AbacusSimulator
                onCalculate={handleAddPoints}
                onUnlockBadge={handleUnlockBadge}
              />
            </motion.div>
          )}

          {activeTab === 'stem' && (
            <motion.div
              key="stem"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <StemSimulator onUnlockBadge={handleUnlockBadge} />
            </motion.div>
          )}

          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <StoryTime
                completedStories={stats.completedStories}
                onStoryCompleted={handleStoryCompleted}
                onUnlockBadge={handleUnlockBadge}
              />
            </motion.div>
          )}

          {activeTab === 'quizzes' && (
            <motion.div
              key="quizzes"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <QuizSection
                completedQuizzes={stats.completedQuizzes}
                onQuizCompleted={handleQuizCompleted}
                onUnlockBadge={handleUnlockBadge}
                onAddPoints={handleAddPoints}
              />
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <ParentTeacherGuide />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-12 py-10 px-4 md:px-8 border-t border-slate-800" id="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-base font-black">Sharq va G'arb ta'limi</h4>
            <p className="text-xs text-slate-400 mt-1">Boshlang'ich sinf bolalari uchun integratsiyalashgan innovatsion platforma</p>
          </div>
          <div className="text-xs text-slate-500 font-mono text-center md:text-right space-y-1">
            <p>© 2026 Sharq va G'arb ta'limi. Barcha huquqlar himoyalangan.</p>
            <p className="text-[10px]">Netlify moslashuvchan - Static React SPA platformasi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
