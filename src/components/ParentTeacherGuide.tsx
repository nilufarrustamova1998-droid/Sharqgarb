/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Heart, Users, Calendar, HelpCircle, Check, FileText, Sparkles, Star } from 'lucide-react';

interface RoutineItem {
  time: string;
  title: string;
  source: 'Sharq' | 'G\'arb' | 'Uyg\'unlik';
  desc: string;
  skills: string;
}

const SAMPLE_ROUTINE: RoutineItem[] = [
  {
    time: "08:00 - 08:30",
    title: "Salomlashish va Axloqiy intizom daqiqasi",
    source: "Sharq",
    desc: "Kattalarni hurmat qilish, do'stlari bilan iliq so'rashish va bugungi kunga diqqatni jamlash (mushoxada).",
    skills: "Sadoqat, hurmat va his-tuyg'ularni boshqarish"
  },
  {
    time: "09:00 - 10:30",
    title: "Miya gimnastikasi va Mental arifmetika",
    source: "Sharq",
    desc: "Soroban abakusi yordamida tezkor hisob-kitoblar. Ko'rish va tasavvur xotirasini charxlash darsi.",
    skills: "Vizualizatsiya, yuqori diqqat va matematika asoslari"
  },
  {
    time: "11:00 - 12:30",
    title: "Kashfiyotchi STEM laboratoriyasi",
    source: "G\'arb",
    desc: "O'simliklar o'sishi, yorug'lik tajribalari va oddiy mexanika orqali fizika qonunlarini amalda o'rganish.",
    skills: "Tanqidiy fikrlash, gipoteza tuzish va tahlil qilish"
  },
  {
    time: "14:00 - 15:30",
    title: "Erkin Ijodiy yozish va Jamoada loyihalash",
    source: "G\'arb",
    desc: "Bolalar jamoalarga bo'linib o'zlarining ertak qahramonlarini o'ylab topadilar yoki kelajak shahri maketini yasaydilar.",
    skills: "Kollaboratsiya, kommunikatsiya va lidership"
  },
  {
    time: "17:00 - 18:00",
    title: "Sintezlangan Hikmatlar soati (Ertak terapiya)",
    source: "Uyg\'unlik",
    desc: "Nasreddin Afandining kulgili hikmatlari va Ezopning hayvonot masallarini birgalikda sahnalashtirish va solishtirish.",
    skills: "Axloq, adabiyot va empatiya (mehribonlik)"
  }
];

export default function ParentTeacherGuide() {
  const [activeTab, setActiveTab] = useState<'parent' | 'teacher'>('parent');

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-50/50 p-6 md:p-8" id="pt-guide-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-md shadow-rose-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Ota-onalar va O'qituvchilar uchun portal</h2>
            <p className="text-xs text-rose-600 font-medium">Boshlang'ich sinfdagi bolalarga ilmiy va axloqiy muvozanatni o'rgating</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6 max-w-sm">
        <button
          onClick={() => setActiveTab('parent')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'parent' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Ota-onalar uchun (Uyda)
        </button>
        <button
          onClick={() => setActiveTab('teacher')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'teacher' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          O'qituvchilar uchun (Maktabda)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Advice column based on selections */}
        <div className="lg:col-span-6 space-y-6">
          {activeTab === 'parent' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Heart className="w-5 h-5 text-rose-500" /> Uyda uyg'unlik muhiti yaratish
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bolangiz har kuni maktabdan qaytgach uy vazifalaridan tolqganda, ularda darsga bo'lgan g'ayratni qanday uyg'otish mumkin? <b>Sharqona intizom</b> va G'arbiy **erkin kashfiyotlar**ni uy sharoitida qo'llash sirlari:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Zehniyat va Intizom (Sharqona yondashuv)",
                    desc: "Har kuni uy vazifalarini boshlashdan oldin xonani toza saqlash, stol ustining tartibliligi va ota-onaga yoki ustozga chuqur minnatdorchilik bildirishni an'anaga aylantiring. Bu diqqatni 10 barobargacha oshiradi."
                  },
                  {
                    title: "Kashfiyotlar va Savollar (G'arbona yondashuv)",
                    desc: "Bolangiz sizga 'Nega osmon ko'k?' yoki 'Choynak nega qaynab sayraydi?' deb savol bersa, darhol javob bermang. 'Keling birga tajriba qilib ko'ramiz' deb, uning o'zini gipoteza tuzishga chorlang."
                  },
                  {
                    title: "Kechki hikoya va muloqot muvozanati",
                    desc: "Kechqurun uxlashdan oldin ertaklar o'qiganda ham ezgu sharqona ota-ona hikmatlarini (ibrat va hurmat), ham g'arbiy qahramonlik va jasorat sarguzashtlarini (mustaqil kurashish) qo'shib gapiring."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 mb-11">
                      <Star className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Compass className="w-5 h-5 text-rose-500" /> Zamonaviy Yoshlar uchun Sinrxon metodika
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Darslaringiz qiziqarsiz va faqat konspekt yozishdan iborat bo'lib qolmasligi uchun dars xonangizda guruhbop kashfiyotlar zolinasini tashkil qiling:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Tarixiy va Matematik sintez",
                    desc: "Matematika darsida faqat formulani ko'rsatmang, balki Fibonachchi va Al-Xorazmiy o'rtasidagi ipak yo'lidagi muloqot darsligini o'ting. Bolalarga Soroban abakus asbobini tarqatib, o'yin tarzida hisoblating."
                  },
                  {
                    title: "Loyiha darslari (Project-Based Learning)",
                    desc: "Har shanba kunini 'Kashfiyot kuni' deb nomlang. G'arb maktablaridagi kabi bolalarga 'Chiqindilarni saralash robotini qog'ozdan yasash' kabi vazifalar berib, jamoada ishlash madaniyatini singdiring."
                  },
                  {
                    title: "Xulq-atvor va jamoat ishlari",
                    desc: "Dars so'ngida Yaponiya maktablaridagi an'anani joriy qiling — barcha o'quvchilar birgalikda sinf xonasini sadoqat bilan tozalaydilar. Bu bolada mehnat hurmati va g'urur tushunchasini mustahkamlaydi."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 mb-1.5">
                      <Star className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Schedule timeline column */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 border-b border-rose-50 pb-2 mb-4">
            <Calendar className="w-4 h-4 text-rose-500" />
            Namuna: 1 kunlik muvozanatli 'Sintez' dars jadvali
          </h3>

          <div className="space-y-4 relative pl-3 border-l-2 border-rose-100">
            {SAMPLE_ROUTINE.map((item, index) => {
              const isEast = item.source === 'Sharq';
              const isWest = item.source === 'G\'arb';

              return (
                <div key={index} className="relative group pl-5">
                  {/* Timeline dot */}
                  <div className={`absolute left-[-21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white transition-transform group-hover:scale-125 ${
                    isEast ? 'bg-amber-500 ring-4 ring-amber-100' :
                    isWest ? 'bg-blue-600 ring-4 ring-blue-100' :
                    'bg-rose-500 ring-4 ring-rose-100'
                  }`}></div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{item.time}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <h4 className="text-xs font-extrabold text-slate-800">{item.title}</h4>
                      <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded ${
                        isEast ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        isWest ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}>
                        {item.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="text-[9px] font-mono font-bold text-rose-500 mt-1">
                      Shakllantiriladigan ko'nikma: {item.skills}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
