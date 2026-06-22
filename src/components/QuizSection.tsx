/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_LEVELS, BADGES } from '../data';
import { QuizLevel, QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, ArrowRight, RefreshCw, Eye, Sparkles, HelpCircle, Trophy } from 'lucide-react';

interface QuizSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onQuizCompleted: (levelId: string) => void;
  completedQuizzes: string[];
  onAddPoints: (points: number) => void;
}

export default function QuizSection({
  onUnlockBadge,
  onQuizCompleted,
  completedQuizzes,
  onAddPoints,
}: QuizSectionProps) {
  const [selectedLevel, setSelectedLevel] = useState<QuizLevel | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Tanlangan levelni boshlash
  const startQuiz = (level: QuizLevel) => {
    setSelectedLevel(level);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  const currentQuestion: QuizQuestion | undefined = selectedLevel?.questions[currentQuestionIndex];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (!selectedLevel) return;

    // To'g'riligini tekshirib ball qo'shamiz
    if (selectedOption === currentQuestion?.correctIndex) {
      setScore((prev) => prev + 1);
      onAddPoints(20); // Har bir to'g'ri savolga 20 ball
    }

    if (currentQuestionIndex < selectedLevel.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Test yakunlandi
      setShowResult(true);
      const finalScore = score + (selectedOption === currentQuestion?.correctIndex ? 1 : 0);
      
      // Agar testni muvaffaqiyatli tamomlasa (masalan kamida 2 ta to'g'ri topsa), badgeni beramiz
      if (finalScore >= 2) {
        onUnlockBadge(selectedLevel.badgeAwarded);
        onQuizCompleted(selectedLevel.id);
      }
    }
  };

  const handleRetry = () => {
    if (selectedLevel) {
      startQuiz(selectedLevel);
    }
  };

  const handleExit = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-violet-100 shadow-xl shadow-violet-50/50 p-6 md:p-8" id="quiz-section-container">
      {!selectedLevel ? (
        // Level choosing view
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-violet-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-600 rounded-2xl text-white shadow-md shadow-violet-600/20">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Kashfiyotlar va Zakovat Testlari</h2>
                <p className="text-xs text-violet-600 font-medium">O'z bilimingizni topshiriqlar bilan sinab, maxsus nishonlarni to'plang</p>
              </div>
            </div>
            <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1.5 rounded-xl border border-violet-100 shrink-0">
              Yechilgan bosqichlar: {completedQuizzes.length} / {QUIZ_LEVELS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUIZ_LEVELS.map((level) => {
              const isCompleted = completedQuizzes.includes(level.id);
              const badge = BADGES.find((b) => b.id === level.badgeAwarded);

              return (
                <div
                  key={level.id}
                  className="bg-slate-50 border border-slate-100 hover:border-violet-250 p-5 rounded-2xl flex flex-col justify-between transition-all hover:shadow-lg relative overflow-hidden group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] uppercase font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                        {level.questions.length} ta savol
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold px-2.5 py-0.5 rounded-full">
                          Muvaffaqiyatli ✓
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                      {level.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {level.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-3">
                    {badge && (
                      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-150">
                        <span className="text-base">🏆</span>
                        <div>
                          <p className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Yutuq nishoni:</p>
                          <p className="text-[10px] font-bold text-slate-700">{badge.title}</p>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => startQuiz(level)}
                      className="w-full text-center text-xs py-2.5 font-bold rounded-xl cursor-pointer bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/10 transition-all"
                    >
                      Bosqichni boshlash &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : showResult ? (
        // Results View
        <div className="max-w-md mx-auto text-center py-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-3xl bg-violet-500 text-white flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg shadow-violet-500/20"
          >
            🎉
          </motion.div>
          <h3 className="text-xl font-extrabold text-slate-800">
            Tajriba Yakunlandi!
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-[260px] mx-auto">
            Siz barcha mantiqiy savollarga javob berib, darsni tamomladingiz.
          </p>

          <div className="my-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
              Sizning ko'rsatkichingiz:
            </span>
            <div className="text-3xl font-mono font-black text-violet-600">
              {score} / {selectedLevel.questions.length}
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {score >= 2
                ? 'Tabriklaymiz! Siz ushbu darajaning yutuq nishonini muvaffaqiyatli qo\'lga kiritdingiz.'
                : 'Yaxshi urinish! Ammo nishonni olish uchun kamida 2 ta savolga to\'g\'ri javob berishingiz kerak.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExit}
              className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-xl cursor-pointer transition-all"
            >
              Bosqichlar ro'yxati
            </button>
            <button
              onClick={handleRetry}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-all"
            >
              Yana urinib ko'rish
            </button>
          </div>
        </div>
      ) : (
        // Active Question View
        <div>
          {/* Active Quiz Header toolbar */}
          <div className="flex justify-between items-center border-b border-violet-100 pb-4 mb-6">
            <button
              onClick={handleExit}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-slate-500"
            >
              &larr; Orqaga qaytish
            </button>
            <span className="text-xs font-bold text-slate-500 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
              Chet ellar va O'zbek mutafakkirlari bo'limi
            </span>
            <span className="text-xs font-mono font-bold text-violet-600">
              Savol: {currentQuestionIndex + 1} / {selectedLevel.questions.length}
            </span>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Category signet and actual question */}
            <div className="mb-6">
              <span className={`text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md border inline-block mb-3 ${
                currentQuestion?.category === 'Sharq'
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : currentQuestion?.category === 'G\'arb'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-violet-50 border-violet-200 text-violet-700'
              }`}>
                {currentQuestion?.category} Fikriyligi
              </span>
              <h3 className="text-base md:text-lg font-black text-slate-800 leading-snug">
                {currentQuestion?.question}
              </h3>
            </div>

            {/* Answer select list */}
            <div className="space-y-3">
              {currentQuestion?.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;

                let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                if (isSelected) {
                  btnStyle = 'border-violet-600 bg-violet-50/50 text-violet-800 ring-2 ring-violet-500/20';
                }
                if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left text-xs p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-5.5 h-5.5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Submitting indicator */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
              {!isSubmitted ? (
                <button
                  onClick={() => setIsSubmitted(true)}
                  disabled={selectedOption === null}
                  className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white cursor-pointer shadow-md transition-all ${
                    selectedOption === null
                      ? 'bg-slate-300 shadow-none cursor-not-allowed'
                      : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/10'
                  }`}
                >
                  Javobni tasdiqlash
                </button>
              ) : (
                <div className="w-full">
                  {/* Dynamic Explanation text box */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed mb-4 ${
                      selectedOption === currentQuestion?.correctIndex
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        : 'bg-rose-50 border-rose-100 text-rose-800'
                    }`}
                  >
                    <span className="font-extrabold block mb-1">
                      {selectedOption === currentQuestion?.correctIndex ? 'To\'g\'ri! 🌟' : 'Xato! Keling o\'rganamiz:'}
                    </span>
                    {currentQuestion?.explanation}
                  </motion.div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="w-full md:w-auto px-6 py-2.5 bg-violet-600 hover:bg-violet-700 font-bold text-xs text-white rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {currentQuestionIndex < selectedLevel.questions.length - 1 ? (
                        <>Keyingi savol <ArrowRight className="w-4 h-4" /></>
                      ) : (
                        'Natijani ko\'rish'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
