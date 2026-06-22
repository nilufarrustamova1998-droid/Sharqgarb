/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STORIES } from '../data';
import { Story } from '../types';
import { BookOpen, ChevronRight, ChevronLeft, Sparkles, Award, RefreshCw, HelpCircle, Check, X } from 'lucide-react';

interface StoryTimeProps {
  onUnlockBadge: (badgeId: string) => void;
  onStoryCompleted: (storyId: string) => void;
  completedStories: string[];
}

export default function StoryTime({ onUnlockBadge, onStoryCompleted, completedStories }: StoryTimeProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const startStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage(0);
    setSelectedOption(null);
    setIsQuizSubmitted(false);
    setIsAnswerCorrect(false);
  };

  const handleNextPage = () => {
    if (selectedStory && currentPage < selectedStory.content.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const submitQuiz = () => {
    if (!selectedStory || selectedOption === null) return;

    const isCorrect = selectedOption === selectedStory.quiz.correctIndex;
    setIsAnswerCorrect(isCorrect);
    setIsQuizSubmitted(true);

    if (isCorrect) {
      onStoryCompleted(selectedStory.id);
      // Agar ikkala hikoyani ham tamomlasa fanning "philosopher_kid" nishonini oladi
      const newCompleted = [...completedStories];
      if (!newCompleted.includes(selectedStory.id)) {
        newCompleted.push(selectedStory.id);
      }
      if (newCompleted.length >= 2) {
        onUnlockBadge('philosopher_kid');
      }
    }
  };

  const exitStory = () => {
    setSelectedStory(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-50/50 p-6 md:p-8" id="story-time-container">
      {!selectedStory ? (
        // Story List View
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-md shadow-emerald-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Donishmandlar va Ertaklar darchasi</h2>
                <p className="text-xs text-emerald-600 font-medium font-semibold">Ibratli Sharq hikmatlari & G'arbiy axloq darsliklari solishtirmasi</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
              O'qilgan darslar: {completedStories.length} / {STORIES.length}
            </span>
          </div>

          <div className="bg-emerald-50/40 p-4 border border-emerald-100 rounded-2xl text-xs text-slate-600 leading-relaxed mb-6">
            <span className="font-bold text-emerald-800 block mb-1">Ertaklarning ahamiyati:</span>
            Har bir xalqning boshlang'ich tarbiyasida dostonlar muhim rol o'ynaydi. 
            <b> Sharq ertaklari (masalan, Nasreddin Afandi latifalari)</b> aql, hozirjavoblik, hazil va o'zganing xatolaridan saboq olishga yo'naltirilgan bo'lsa; 
            <b> G'arb ertaklari (Ezop masallari kabi)</b> tinimsiz harakat, mehnatsevarlik va amaliy intizom qoidalariga asoslanadi.
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORIES.map((story) => {
              const isCompleted = completedStories.includes(story.id);
              const isEast = story.origin === 'Sharq';

              return (
                <div
                  key={story.id}
                  className={`group relative flex flex-col justify-between bg-white rounded-2xl border p-5 transition-all hover:shadow-lg ${
                    isEast
                      ? 'border-amber-100 hover:border-amber-300 shadow-sm shadow-amber-50/30'
                      : 'border-blue-100 hover:border-blue-300 shadow-sm shadow-blue-50/30'
                  }`}
                >
                  {/* Category badging */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[9px] uppercase font-serif tracking-wider px-2.5 py-1 rounded-md border font-black ${
                      isEast
                        ? 'bg-amber-50 border-amber-200 text-amber-700'
                        : 'bg-blue-50 border-blue-200 text-blue-700'
                    }`}>
                      {story.origin} Hikmati • {story.hero}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                        O'qib chiqildi ✓
                      </span>
                    )}
                  </div>

                  {/* Body info */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                      "{story.summary}"
                    </p>
                  </div>

                  {/* Moral insight preview */}
                  <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center bg-slate-50/60 -mx-5 -mb-5 p-5 rounded-b-2xl">
                    <div className="text-[10px] text-slate-500 max-w-[70%] font-medium">
                      <span className="font-bold text-slate-700 text-[11px] block mb-0.5">Asosiy saboq:</span>
                      {story.moral.substring(0, 95)}...
                    </div>
                    <button
                      onClick={() => startStory(story)}
                      className={`text-xs px-4 py-2 font-bold rounded-xl transition-all shadow-sm shrink-0 cursor-pointer ${
                        isEast
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                          : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'
                      }`}
                    >
                      Boshlash &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Active Story reading view
        <div className="max-w-3xl mx-auto">
          {/* Header toolbar */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={exitStory}
              className="text-xs px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-slate-500 flex items-center gap-1"
            >
              &larr; Chiqish
            </button>
            <div className="text-center">
              <span className="text-[10px] uppercase font-mono bg-slate-100 text-slate-500 px-3 py-1 rounded-full border border-slate-200 font-bold">
                {selectedStory.origin} Saboqatnoma
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono font-bold">
              Sahifa: {currentPage + 1} / {selectedStory.content.length}
            </div>
          </div>

          {/* Big custom illustration-like scene using dynamic visuals */}
          <div className={`rounded-2xl border p-4 mb-6 flex items-center gap-4 relative overflow-hidden ${
            selectedStory.origin === 'Sharq'
              ? 'bg-gradient-to-r from-amber-50/70 to-orange-50/50 border-amber-100'
              : 'bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border-blue-100'
          }`}>
            <div className="p-3 bg-white/80 rounded-xl shadow-sm shrink-0">
              <Sparkles className={`w-8 h-8 ${selectedStory.origin === 'Sharq' ? 'text-amber-500' : 'text-blue-500'}`} />
            </div>
            <div>
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Hozirgi Sahna</h4>
              <p className="text-sm font-black text-slate-800">{selectedStory.title}</p>
            </div>
          </div>

          {/* Active page story text panel */}
          <div className="min-h-[160px] bg-slate-50/70 rounded-3xl p-6 md:p-8 border border-slate-200/60 relative mb-6">
            <span className="absolute top-2.5 right-4 font-serif text-5xl text-slate-200 select-none">“</span>
            <motion.p
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-slate-700 text-base md:text-lg leading-relaxed text-center py-4"
            >
              {selectedStory.content[currentPage]}
            </motion.p>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center gap-4 mb-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-1 text-xs px-4 py-2.5 rounded-xl font-bold border ${
                currentPage === 0
                  ? 'bg-slate-50 text-slate-350 border-slate-100 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Ortga
            </button>

            {/* Pagination circles indicator */}
            <div className="flex gap-1.5">
              {selectedStory.content.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentPage
                      ? 'w-6 bg-emerald-500'
                      : 'w-2 bg-slate-200'
                  }`}
                ></div>
              ))}
            </div>

            {currentPage < selectedStory.content.length - 1 ? (
              <button
                onClick={handleNextPage}
                className="flex items-center gap-1 text-xs px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-white rounded-xl shadow-md transition-all cursor-pointer"
              >
                Oldinga <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl animate-pulse">
                Saboq yakunlandi! Quyidagi savolga o'ting 👇
              </span>
            )}
          </div>

          {/* Moral test quiz block (shown only at the end of story) */}
          <AnimatePresence>
            {currentPage === selectedStory.content.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-6 md:p-8"
              >
                <h3 className="text-base font-black text-emerald-800 flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5" /> Hikoyadan qanday xulosa chiqardingiz?
                </h3>

                <p className="text-xs font-bold text-slate-600 mb-4 bg-white/70 px-4 py-3 rounded-xl border border-emerald-100">
                  {selectedStory.quiz.question}
                </p>

                {/* Question Options */}
                <div className="space-y-3">
                  {selectedStory.quiz.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectOption = idx === selectedStory.quiz.correctIndex;

                    let btnClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                    if (isSelected) {
                      btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20';
                    }
                    if (isQuizSubmitted) {
                      if (isCorrectOption) {
                        btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/35';
                      } else if (isSelected && !isAnswerCorrect) {
                        btnClass = 'bg-rose-50 border-rose-300 text-rose-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isQuizSubmitted}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left text-xs p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submitting state controls */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {!isQuizSubmitted ? (
                    <button
                      onClick={submitQuiz}
                      disabled={selectedOption === null}
                      className={`w-full sm:w-auto px-6 py-3 font-extrabold text-xs text-white rounded-xl shadow-md transition-all cursor-pointer ${
                        selectedOption === null
                          ? 'bg-slate-300 shadow-none cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10'
                      }`}
                    >
                      Javobni topshirish
                    </button>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                      {isAnswerCorrect ? (
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                          <p className="text-xs font-bold text-emerald-800">
                            Barakalla! To'g'ri xulosa. Siz qimmatli bilim ballarini jalb qildingiz!
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <X className="w-5 h-5 text-rose-500 shrink-0" />
                          <p className="text-xs font-bold text-rose-700">
                            Noto'g'ri, yana bir bor diqqat qiling va hikoyani chuqurroq tushunishga harakat qiling.
                          </p>
                        </div>
                      )}

                      {!isAnswerCorrect ? (
                        <button
                          onClick={() => {
                            setIsQuizSubmitted(false);
                            setSelectedOption(null);
                          }}
                          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Qayta urinish
                        </button>
                      ) : (
                        <button
                          onClick={exitStory}
                          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/10"
                        >
                          Rahmat, tugatish!
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isQuizSubmitted && isAnswerCorrect && (
                  <div className="mt-4 text-[10px] font-semibold text-slate-500 bg-white/50 border border-emerald-100 p-3 rounded-xl">
                    <span className="font-bold text-slate-700 block mb-0.5">Donishmanddan sharh:</span>
                    {selectedStory.quiz.explanation}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
