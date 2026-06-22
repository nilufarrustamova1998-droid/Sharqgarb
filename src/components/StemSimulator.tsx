/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Sprout, Sun, Droplets, Trophy, Info, FileText, Check, Plus, Trash2, Milestone } from 'lucide-react';

interface ExperimentResult {
  id: string;
  water: string;
  sunlight: string;
  soil: string;
  height: number; // cm
  color: string;
  status: string;
  hypothesisMatches: boolean;
}

export default function StemSimulator({ onUnlockBadge }: { onUnlockBadge: (badgeId: string) => void }) {
  // Tanlovlar
  const [water, setWater] = useState<'kam' | 'meyor' | 'kop'>('meyor');
  const [sunlight, setSunlight] = useState<'soya' | 'yarim_sayoz' | 'quyosh'>('quyosh');
  const [soil, setSoil] = useState<'qum' | 'bog' | 'chirindi'>('bog');
  
  // Taxmin (Hypothesis)
  const [hypothesis, setHypothesis] = useState<string>('');
  
  // Eksperiment jarayoni
  const [isCycled, setIsCycled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [activeHeight, setActiveHeight] = useState(0);
  const [plantCondition, setPlantCondition] = useState<'none' | 'amazing' | 'good' | 'average' | 'dry' | 'drowned'>('none');
  
  // Laboratory Journal lists
  const [journal, setJournal] = useState<ExperimentResult[]>([
    {
      id: 'prev_1',
      water: 'Meyyor',
      sunlight: 'O\'rtacha (Yarim soya)',
      soil: 'Qum (Kam mineralli)',
      height: 35,
      color: 'text-amber-600',
      status: 'O\'rtacha o\'sish, sarg\'aygan poya',
      hypothesisMatches: true,
    }
  ]);

  const handleRunExperiment = () => {
    setSimulationState('running');
    setProgress(0);
    setActiveHeight(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Yakuniy hisoblashlarni qilamiz
          calculateResult();
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  const calculateResult = () => {
    // Balandlik koeffitsientlari
    let height = 15; // Boshlang'ich minimal balandlik (bo'sh tuproq)

    let waterText = 'Meyyor';
    let sunText = 'Quyoshli';
    let soilText = 'Oddiy tuproq';

    // Suv
    if (water === 'kam') {
      height += 10;
      waterText = 'Kam (Suvsiz)';
    } else if (water === 'meyor') {
      height += 35;
      waterText = 'Me\'yor (Zaruriy)';
    } else {
      height += 5;
      waterText = 'Ko\'p (Suv bosgan)';
    }

    // Quyosh
    if (sunlight === 'soya') {
      height += 5;
      sunText = 'Soya (Qorong\'u)';
    } else if (sunlight === 'yarim_sayoz') {
      height += 20;
      sunText = 'Yarim soya';
    } else {
      height += 35;
      sunText = 'Yorug\' Quyosh';
    }

    // Tuproq
    if (soil === 'qum') {
      height += 5;
      soilText = 'Qumloq';
    } else if (soil === 'bog') {
      height += 15;
      soilText = 'Bog\' tuprog\'i';
    } else {
      height += 30;
      soilText = 'Chirindi boyitilgan';
    }

    // Holat xulosalari
    let condition: 'amazing' | 'good' | 'average' | 'dry' | 'drowned' = 'average';
    let statusText = 'O\'rtacha o\'sish, quyosh yetarli emas';
    let colorHex = 'text-yellow-500';

    if (water === 'meyor' && sunlight === 'quyosh' && soil === 'chirindi') {
      condition = 'amazing';
      statusText = 'Super o\'sish! Go\'zal gul ochildi 🌸';
      colorHex = 'text-emerald-500 font-extrabold';
    } else if (water === 'meyor' && (sunlight === 'quyosh' || sunlight === 'yarim_sayoz') && soil !== 'qum') {
      condition = 'good';
      statusText = 'Sog\'lom va salobatli novda 🌿';
      colorHex = 'text-emerald-500';
    } else if (water === 'kam') {
      condition = 'dry';
      statusText = 'Suvsizlikdan qurigan barglar 🍂';
      colorHex = 'text-amber-700';
    } else if (water === 'kop') {
      condition = 'drowned';
      statusText = 'Ildizlarda chirish, chirigan kurtaklar 🪵';
      colorHex = 'text-indigo-800';
    } else {
      condition = 'average';
      statusText = 'Kam oziqli yoki nur yetishmayotgan novda';
      colorHex = 'text-amber-500';
    }

    setActiveHeight(height);
    setPlantCondition(condition);
    setSimulationState('completed');

    // Yangi natijani kundalikka qo'shish
    const newRecord: ExperimentResult = {
      id: `res_${Date.now()}`,
      water: waterText,
      sunlight: sunText,
      soil: soilText,
      height: height,
      color: colorHex,
      status: statusText,
      hypothesisMatches: hypothesis.trim().length > 0, // hypothesis test
    };

    setJournal(prev => [newRecord, ...prev]);

    // Agar eng zo'r kombinatsiyani qilsa - badge beriladi
    if (condition === 'amazing') {
      onUnlockBadge('young_scientist');
    }
  };

  const clearJournal = () => {
    setJournal([]);
  };

  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-50/50 p-6 md:p-8" id="stem-simulator-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-md shadow-blue-600/20">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Kashfiyotchi STEM Laboratoriyasi</h2>
            <p className="text-xs text-blue-600 font-medium">G'arbning tajribaviy va tahliliy (Scientific Method) ta'lim yondashuvi</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-semibold bg-blue-50/50 border border-blue-100 px-3 py-1.5 rounded-2xl flex items-center gap-1">
          <Milestone className="w-4 h-4 text-blue-500" />
          Fikrlash &rarr; Taxmin &rarr; Tajriba &rarr; Tahlil
        </div>
      </div>

      {/* Intro box */}
      <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed mb-6 flex gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-200/50 flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <span className="font-bold text-blue-800 block mb-1">G'arbona yondashuv:</span>
          Boshlang'ich maktablarda darsliklarni yodlashdan ko'ra, har bir jarayonni aniq tajribalar qilib, <b>fizik</b> va <b>biologik</b> qonuniyatlarni his qilish muhimdir. Sprout (nihol) tajribasi orqali mukammal elementlar muvozanatini his qiling!
        </div>
      </div>

      {/* Main Column layout: Controls on Left, Botanical Stage on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* STEP 1: Observation/Hypothesis */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 flex items-center gap-1 mb-2">
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">1</span>
              Gipoteza (Ilmiy taxmin) yozing
            </span>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              Sizningcha, nihol qaysi sharoitda eng baland o'sadi?
            </label>
            <input
              type="text"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="Masalan: Chirindi tuproqda, quyoshli joyda va me'yorida suv bilan eng zo'r o'sadi..."
              className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
            />
          </div>

          {/* STEP 2: Setting Variables */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 flex items-center gap-1 mb-1">
              <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">2</span>
              Tajriba omillarini o'zgartiring
            </span>

            {/* Factor 1: Water */}
            <div>
              <span className="text-xs font-bold font-mono text-slate-700 flex items-center gap-1 mb-2">
                <Droplets className="w-4 h-4 text-blue-500" /> Suv miqdori:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'kam', label: 'Kam (Suvsiz)', desc: 'Cho\'l muhiti' },
                  { id: 'meyor', label: 'Me\'yor (Zaruriy)', desc: 'Rangdor namlik' },
                  { id: 'kop', label: 'Ko\'p (Suv to\'la)', desc: 'Botqoqlik' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWater(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      water === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-xs">{item.label}</span>
                    <span className={`block text-[8px] mt-0.5 ${water === item.id ? 'text-blue-100' : 'text-slate-400'}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Factor 2: Sunlight */}
            <div>
              <span className="text-xs font-bold font-mono text-slate-700 flex items-center gap-1 mb-2">
                <Sun className="w-4 h-4 text-amber-500" /> Quyosh nuri:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'soya', label: 'Zulmat / Soya', desc: 'Binafsha / sovuq' },
                  { id: 'yarim_sayoz', label: 'Yarim soya', desc: 'O\'rtacha darcha' },
                  { id: 'quyosh', label: 'Nurli Quyosh', desc: 'Sog\'lom quyosh' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSunlight(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      sunlight === item.id
                        ? 'bg-amber-500 text-white border-amber-505 shadow-md shadow-amber-500/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-xs">{item.label}</span>
                    <span className={`block text-[8px] mt-0.5 ${sunlight === item.id ? 'text-amber-100' : 'text-slate-400'}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Factor 3: Soil Nutrition */}
            <div>
              <span className="text-xs font-bold font-mono text-slate-700 flex items-center gap-1 mb-2">
                <Sprout className="w-4 h-4 text-emerald-500" /> Energetik Tuproq tarkibi:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'qum', label: 'Oq qum', desc: 'Kambag\'al mineral' },
                  { id: 'bog', label: 'Oddiy tuproq', desc: 'Bog\'dorchilik' },
                  { id: 'chirindi', label: 'Chirindi tuproq', desc: 'Mikroelementlar' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSoil(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      soil === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-xs">{item.label}</span>
                    <span className={`block text-[8px] mt-0.5 ${soil === item.id ? 'text-emerald-100' : 'text-slate-400'}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={handleRunExperiment}
            disabled={simulationState === 'running'}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-md cursor-pointer ${
              simulationState === 'running'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-850 text-white hover:shadow-lg shadow-blue-600/10'
            }`}
          >
            <FlaskConical className={`w-5 h-5 ${simulationState === 'running' ? 'animate-spin' : ''}`} />
            {simulationState === 'running' ? 'Tajriba bajarilmoqda...' : 'Tajribani faollashtirish!'}
          </button>
        </div>

        {/* Botanical Visual Stage Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-slate-900 rounded-3xl p-5 border-4 border-slate-800 shadow-xl relative overflow-hidden min-h-[360px] flex flex-col justify-between text-white">
            {/* Ambient Background Glow based on Sunlight setting */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${
              sunlight === 'soya' ? 'bg-indigo-950/20' : sunlight === 'yarim_sayoz' ? 'bg-amber-900/10' : 'bg-amber-400/5'
            }`}></div>

            {/* Simulation overlay or label */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                Jonli laboratoriya monitori
              </span>
              {simulationState === 'completed' && (
                <span className="text-[10px] font-mono bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-2.5 py-0.5 rounded-md">
                  Tayyor: {activeHeight} cm
                </span>
              )}
            </div>

            {/* Simulated Sun or Clouds */}
            <div className="absolute top-8 right-8 z-10 flex flex-col items-center">
              {sunlight === 'quyosh' ? (
                <Sun className="w-12 h-12 text-amber-400 animate-spin-slow drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
              ) : sunlight === 'yarim_sayoz' ? (
                <div className="relative">
                  <Sun className="w-8 h-8 text-amber-500 opacity-60" />
                  <div className="absolute inset-0 bg-slate-800/80 w-10 h-6 -top-1 -right-2 rounded-full border border-slate-700"></div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                  Soya
                </div>
              )}
            </div>

            {/* Center Stage: The Plant Sprouting Animation */}
            <div className="relative flex-1 flex flex-col justify-end items-center my-6 min-h-[180px]">
              {/* Rain Drops falling animation during simulation if water is high */}
              {simulationState === 'running' && water === 'kop' && (
                <div className="absolute inset-x-0 top-0 bottom-12 overflow-hidden pointer-events-none opacity-60">
                  <div className="w-0.5 h-4 bg-blue-400 absolute left-1/4 animate-rain-1"></div>
                  <div className="w-0.5 h-4 bg-blue-300 absolute left-2/4 animate-rain-2"></div>
                  <div className="w-0.5 h-4 bg-blue-400 absolute left-3/4 animate-rain-3"></div>
                </div>
              )}

              {/* Sprout Stem */}
              <AnimatePresence>
                {simulationState !== 'idle' && (
                  <div className="flex flex-col items-center">
                    {/* If completed, we show flower if condition is amazing */}
                    {simulationState === 'completed' && plantCondition === 'amazing' && (
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-10 h-10 rounded-full bg-pink-500 border-2 border-white shadow-lg flex items-center justify-center font-bold text-pink-100 text-sm z-30 -mb-2"
                      >
                        🌸
                      </motion.div>
                    )}

                    {/* Stem Growth */}
                    <motion.div
                      initial={{ height: 4 }}
                      animate={{
                        height: simulationState === 'running'
                          ? (progress / 100) * 120 + 4
                          : activeHeight * 1.5 // Multiplay for rendering scale
                      }}
                      transition={{ type: 'spring', damping: 25 }}
                      className={`w-2.5 rounded-t-full relative ${
                        plantCondition === 'amazing' ? 'bg-gradient-to-t from-emerald-800 to-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]' :
                        plantCondition === 'good' ? 'bg-gradient-to-t from-emerald-700 to-emerald-500' :
                        plantCondition === 'dry' ? 'bg-gradient-to-t from-amber-800 to-amber-600' :
                        plantCondition === 'drowned' ? 'bg-gradient-to-t from-slate-700 to-indigo-900 border-teal-900' :
                        'bg-gradient-to-t from-yellow-700 to-emerald-500'
                      }`}
                    >
                      {/* Leaf Left */}
                      {(progress > 40 || simulationState === 'completed') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute left-[-16px] top-1/3 w-5 h-2.5 rounded-br-full rounded-tl-full origin-right -rotate-30 ${
                            plantCondition === 'dry' ? 'bg-amber-700' : 'bg-emerald-400'
                          }`}
                        ></motion.div>
                      )}

                      {/* Leaf Right */}
                      {(progress > 70 || simulationState === 'completed') && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute right-[-16px] top-2/3 w-5 h-2.5 rounded-bl-full rounded-tr-full origin-left rotate-30 ${
                            plantCondition === 'dry' ? 'bg-amber-600' : 'bg-emerald-400'
                          }`}
                        ></motion.div>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Ground & Pot */}
              <div className="relative w-36 h-12 flex flex-col items-center">
                {/* Seed Tray / Ground Soil Layer */}
                <div className={`w-36 h-4 rounded-full relative z-20 ${
                  soil === 'qum' ? 'bg-yellow-400 border border-yellow-500' :
                  soil === 'chirindi' ? 'bg-amber-970 border border-amber-900' :
                  'bg-amber-900'
                }`}>
                  {/* Water indicator overlay */}
                  {water === 'kop' && <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>}
                </div>

                {/* Pot body */}
                <div className="w-28 h-10 bg-gradient-to-b from-blue-900 to-indigo-950 border-x-4 border-b-4 border-indigo-900 rounded-b-xl shadow-lg relative z-10 flex flex-col justify-center items-center">
                  <span className="text-[8px] font-mono tracking-widest text-slate-400 font-extrabold flex items-center gap-1 uppercase">
                    <FlaskConical className="w-2 mr-0.5" />
                    {soil === 'qum' ? 'Sand Medium' : soil === 'chirindi' ? 'Humus Rich' : 'Plain Soil'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom State Bar */}
            <div className="bg-slate-950/60 p-2.5 rounded-xl text-center border border-slate-800/60 relative z-10 min-h-[44px] flex items-center justify-center">
              {simulationState === 'idle' && (
                <span className="text-xs text-slate-400 font-medium">Elementlarni tanlang va tajribani boshlang!</span>
              )}
              {simulationState === 'running' && (
                <div className="w-full">
                  <div className="flex justify-between items-center text-[9px] text-blue-400 mb-1 font-mono font-bold">
                    <span>O'sish sharoitlari tahlili...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
              {simulationState === 'completed' && (
                <div className="animate-fade-in text-[11px] font-bold">
                  Holat: <span className={`${plantCondition === 'amazing' ? 'text-emerald-400 font-extrabold' : plantCondition === 'good' ? 'text-emerald-400' : 'text-amber-500'}`}>{plantCondition === 'amazing' ? 'Super O\'sish! 🌺' : plantCondition === 'dry' ? 'Meryorsiz suvsizlik!' : 'Me\'yoriy o\'simlik'}</span> ({activeHeight} sm)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Laboratory Journal - STEP 3 */}
      <div className="mt-8 border-t border-blue-50 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Laboratoriya ilmiy jurnali (Natijalar kundaligi)
          </h3>
          {journal.length > 0 && (
            <button
              onClick={clearJournal}
              className="text-[10px] text-slate-400 hover:text-red-500 font-bold flex items-center gap-1.5"
            >
              <Trash2 className="w-3 h-3" /> Tozalash
            </button>
          )}
        </div>

        {journal.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-100">
            <FileText className="w-8 h-8 text-slate-350 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-semibold">Tugallangan tajribalar bu yerda saqlanadi. Birinchi tajribani amalga oshiring!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-2.5 px-3">Tajriba #</th>
                  <th className="py-2.5 px-3">Suv tartibi</th>
                  <th className="py-2.5 px-3">Nur (Quyosh)</th>
                  <th className="py-2.5 px-3">Tuproq quvvati</th>
                  <th className="py-2.5 px-3">Nihol bo'yi</th>
                  <th className="py-2.5 px-3">Olingan Xulosa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {journal.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 text-slate-400 text-[10px] font-bold">#{journal.length - index}</td>
                    <td className="py-3 px-3">{item.water}</td>
                    <td className="py-3 px-3">{item.sunlight}</td>
                    <td className="py-3 px-3">{item.soil}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-600">{item.height} sm</td>
                    <td className={`py-3 px-3 text-[10px] ${item.color}`}>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
