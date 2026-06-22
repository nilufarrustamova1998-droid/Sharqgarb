/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Sharq' | 'G\'arb' | 'Sintez';
}

export interface QuizLevel {
  id: string;
  name: string; // Masalan: "Boshlang'ich (Oson)", "O'rta (Bilimdon)", "Mukammal (Daho)"
  description: string;
  questions: QuizQuestion[];
  badgeAwarded: string;
}

export interface Story {
  id: string;
  title: string;
  origin: 'Sharq' | 'G\'arb';
  hero: string;
  moral: string;
  summary: string;
  content: string[]; // Bo'limlar bo'yicha hikoya matni
  illustration: string; // Rasm tavsifi yoki kalit so'zi
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DidYouKnowFact {
  id: string;
  title: string;
  badge: 'Sharq' | 'G\'arb' | 'Kashfiyot';
  description: string;
  detail: string;
  iconName: string; // Lucide icon name
  eastInsight?: string; // Sharqona yondashuv tavsifi
  westInsight?: string; // G'arbona yondashuv tavsifi
}

export interface UserStats {
  points: number;
  completedQuizzes: string[];
  completedStories: string[];
  unlockedBadges: string[];
  abacusCalculations: number;
  stemExperiments: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'math' | 'wisdom' | 'explorer' | 'all';
  color: string;
}
