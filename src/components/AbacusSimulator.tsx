/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, RefreshCw, Check, AlertCircle, HelpCircle } from 'lucide-react';

interface RodState {
  upperActive: boolean; // true bo'lsa pastga siljiydi (qiymat: 5)
  lowerCount: number;  // 0 dan 4 gacha faol marjonlar (tepaga siljiydi, qiymat: 1 dan 4 gacha)
}

interface AbacusSimulatorProps {
  onCalculate: (val: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

const CHALENGES = [7, 12, 25, 50, 89, 104, 315, 521, 1998, 5002];

export default function AbacusSimulator({ onCalculate, onUnlockBadge }: AbacusSimulatorProps) {
  // 5 ta razryad: 1000s, 100s, 10s, 1s
  const rodMultipliers = [1000, 100, 10, 1];
  const rodNames = ['Minglar', 'Yuzlar', 'Onliklar', 'Birlar'];

  const [rods, setRods] = useState<RodState[]>([
    { upperActive: false, lowerCount: 0 },
    { upperActive: false, lowerCount: 0 },
    { upperActive: false, lowerCount: 0 },
    { upperActive: false, lowerCount: 0 },
  ]);

  const [currentValue, setCurrentValue] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [showWonMessage, setShowWonMessage] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [showHowTo, setShowHowTo] = useState(false);

  // Qiymatni hisoblash
  useEffect(() => {
    let total = 0;
    rods.forEach((rod, idx) => {
      const mult = rodMultipliers[idx];
      const upperVal = rod.upperActive ? 5 : 0;
      const lowerVal = rod.lowerCount;
      total += (upperVal + lowerVal) * mult;
    });
    setCurrentValue(total);
    onCalculate(total);

    // To'g'ri topshiriq bajarildimi tekshiramiz
    const target = CHALENGES[challengeIndex];
    if (total === target && !showWonMessage && !completedChallenges.includes(target)) {
      setShowWonMessage(true);
      setCompletedChallenges((prev) => [...prev, target]);
      // Agar 3 ta challenge muvaffaqiyatli bo'lsa, 'soroban_master' badgeni oladi
      if (completedChallenges.length + 1 >= 3) {
        onUnlockBadge('soroban_master');
      }
    }
  }, [rods, challengeIndex]);

  const toggleUpper = (rodIdx: number) => {
    setRods((prev) => {
      const next = [...prev];
      next[rodIdx] = {
        ...next[rodIdx],
        upperActive: !next[rodIdx].upperActive,
      };
      return next;
    });
  };

  const setLower = (rodIdx: number, count: number) => {
    setRods((prev) => {
      const next = [...prev];
      // Agar avvalgi count bosilsa unga qadar kamaytiradi yoki qayta o'rnatadi
      const newCount = next[rodIdx].lowerCount === count ? count - 1 : count;
      next[rodIdx] = {
        ...next[rodIdx],
        lowerCount: Math.max(0, Math.min(4, newCount)),
      };
      return next;
    });
  };

  const resetAbacus = () => {
    setRods([
      { upperActive: false, lowerCount: 0 },
      { upperActive: false, lowerCount: 0 },
      { upperActive: false, lowerCount: 0 },
      { upperActive: false, lowerCount: 0 },
    ]);
  };

  const nextChallenge = () => {
    setShowWonMessage(false);
    setChallengeIndex((prev) => (prev + 1) % CHALENGES.length);
    resetAbacus();
  };

  const skipChallenge = () => {
    setShowWonMessage(false);
    setChallengeIndex((prev) => (prev + 1) % CHALENGES.length);
    resetAbacus();
  };

  const currentTarget = CHALENGES[challengeIndex];

  return (
    <div className="bg-white rounded-3xl border border-amber-100 shadow-xl shadow-amber-50/50 p-6 md:p-8" id="abacus-simulator-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-md shadow-amber-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">An'anaviy Sharq Abakusi (Soroban)</h2>
            <p className="text-xs text-amber-600 font-medium">Boshlang'ich raqamli mantiq va diqqatni shakllantiruvchi mo'jizaviy darslik</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-700 font-medium rounded-xl transition-all border border-slate-100"
            id="abacus-help-btn"
          >
            <HelpCircle className="w-4 h-4" />
            {showHowTo ? "Qoidani yopish" : "Qanday ishlaydi?"}
          </button>
          <button
            onClick={resetAbacus}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 hover:bg-slate-50 text-slate-500 font-medium rounded-xl transition-all border border-slate-200"
            id="abacus-reset-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Nollashtirish
          </button>
        </div>
      </div>

      {showHowTo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50/70 border border-amber-100 p-4 rounded-2xl mb-6 text-sm text-slate-700 leading-relaxed"
          id="abacus-tutorial-panel"
        >
          <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Soroban qoidalari:
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Har bir ustun o'z xonalariga ega: O'ngdan birinchisi <b>Birlar</b> (1-9), keyingisi <b>O'nliklar</b> (10-90), keyin <b>Yuzlar</b> va <b>Minglar</b>.</li>
            <li>O'rtadagi to'siq ajratuvchi hisoblanadi. Ustki qismdagi yolg'iz marjon tushirilsa, qiymatga <b>5</b> qo'shiladi.</li>
            <li>Pastki qismdagi to'rtta marjondan har biri tepaga surilsa, qiymatga <b>1</b> qo'shiladi.</li>
            <li>Siz marjonlarni bosish orqali ularni harakatlantirishingiz mumkin. Faol marjonlar ajralib turadi.</li>
          </ul>
        </motion.div>
      )}

      {/* Challenge Card */}
      <div className="bg-slate-50 rounded-2xl p-4 md:p-5 border border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
            Miya mashqi
          </span>
          <h3 className="text-base font-bold text-slate-800 mt-1 flex items-center gap-1.5">
            Ushbu sonni abakusda ko'rsatib bering:
            <span className="text-2xl font-black text-amber-600 ml-1 tracking-tight bg-amber-50 border border-amber-100 px-3 py-0.5 rounded-xl">
              {currentTarget}
            </span>
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={skipChallenge}
            className="text-xs px-3 py-1.5 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all shadow-sm"
          >
            Boshqasi
          </button>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1">
            Muvaffaqiyatlar: {completedChallenges.length} / 3
          </span>
        </div>
      </div>

      {/* Main Interactive Abacus frame */}
      <div className="bg-amber-950 p-6 rounded-3xl border-8 border-amber-900 shadow-inner relative max-w-lg mx-auto overflow-hidden">
        {/* Wood Texture Accent */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br from-amber-700/20 via-orange-850/50 to-transparent"></div>

        {/* Value Screen Display */}
        <div className="flex justify-between items-center bg-amber-950/80 border border-amber-800/60 p-3 rounded-xl mb-6 relative z-10">
          <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Hozirgi hisob-kitobingiz:</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-mono font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
              {currentValue}
            </span>
            <span className="text-[10px] text-amber-500/70 font-mono">soni</span>
          </div>
        </div>

        {/* Abacus Board */}
        <div className="relative border-4 border-amber-900 bg-amber-900/40 rounded-xl p-2 md:p-4 min-h-[300px]">
          {/* Main dividing separator beam */}
          <div className="absolute left-0 right-0 top-[88px] h-4 bg-amber-800 border-y-2 border-amber-950 shadow-md z-15 flex items-center justify-around">
            {/* Dots signifying alignment indicators usually present on Soroban */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-200 opacity-60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-200 opacity-60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-200 opacity-60"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-200 opacity-60"></div>
          </div>

          <div className="grid grid-cols-4 gap-4 relative z-10" h-full="true">
            {rods.map((rod, rodIdx) => {
              const multiplier = rodMultipliers[rodIdx];
              return (
                <div key={rodIdx} className="flex flex-col items-center relative min-h-[250px] pb-2">
                  {/* Rod guide wire */}
                  <div className="absolute top-0 bottom-0 w-1.5 bg-amber-950/40 rounded-full pointer-events-none left-1/2 -ml-0.75 shadow-inner"></div>

                  {/* Upper portion: Upper bead (worth 5) */}
                  <div className="h-[75px] w-full relative flex items-start justify-center">
                    <motion.button
                      onClick={() => toggleUpper(rodIdx)}
                      animate={{
                        y: rod.upperActive ? 42 : 2, // If active, slide down to target beam
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-14 h-6 rounded-full relative cursor-pointer border-2 shadow-md flex items-center justify-center transition-colors ${
                        rod.upperActive
                          ? 'bg-gradient-to-b from-amber-400 to-amber-600 border-amber-300 ring-2 ring-amber-500/30'
                          : 'bg-gradient-to-b from-slate-200 to-slate-400 border-slate-300 hover:from-slate-100 hover:to-slate-300'
                      }`}
                      style={{ originY: 0.5 }}
                      whileTap={{ scale: 0.95 }}
                      title={`${rodNames[rodIdx]}: 5 (${rod.upperActive ? "Faol" : "Nofaol"})`}
                    >
                      {/* Bead grooved core */}
                      <div className="w-full h-1 bg-amber-950/20 rounded"></div>
                    </motion.button>
                  </div>

                  {/* Empty gap for middle separator beam (88px spacing) */}
                  <div className="h-[24px]"></div>

                  {/* Lower portion: 4 lower beads (each worth 1) */}
                  <div className="h-[140px] w-full flex flex-col justify-end gap-1 relative pt-2">
                    {[1, 2, 3, 4].map((beadVal) => {
                      // Determines if bead has been slid UP
                      // On an abacus, if count is k, the top k beads are slid UP.
                      // That means beads 1..k are slid UP, and beads k+1..4 remain down.
                      const isSlidUp = beadVal <= rod.lowerCount;

                      return (
                        <motion.button
                          key={beadVal}
                          onClick={() => setLower(rodIdx, beadVal)}
                          animate={{
                            y: isSlidUp ? -24 : 0, // Slide up towards standard beam
                          }}
                          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                          className={`w-14 h-6 rounded-full flex items-center justify-center cursor-pointer border-2 shadow-sm transition-colors ${
                            isSlidUp
                              ? 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-400 ring-1 ring-amber-500/20'
                              : 'bg-gradient-to-b from-slate-300 to-slate-500 border-slate-400 hover:from-slate-200 hover:to-slate-400'
                          }`}
                          whileTap={{ scale: 0.95 }}
                          title={`${rodNames[rodIdx]}: +1 (Bead #${beadVal})`}
                        >
                          {/* Bead groove */}
                          <div className="w-full h-1 bg-amber-950/20 rounded"></div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Digit column label */}
                  <div className="mt-4 text-[10px] font-mono font-bold text-amber-500/80 bg-amber-950/60 shadow px-1.5 py-0.5 rounded border border-amber-900/50">
                    x{multiplier}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verification / Victory State Banner */}
      <AnimatePresence>
        {showWonMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Check className="w-5 h-5 font-bold" />
              </div>
              <div>
                <h4 className="font-extrabold text-emerald-800 text-sm">Barakalla, To'g'ri Topildi! 🤩</h4>
                <p className="text-xs text-emerald-600 mt-0.5">
                  Abakusda mukammal tarzda <span className="font-mono font-bold">{currentTarget}</span> sonini hosil qila oldingiz!
                </p>
              </div>
            </div>
            <button
              onClick={nextChallenge}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              Keyingi son &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
