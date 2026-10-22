import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import { AsterixIllustration } from './AsterixIllustration';
import { playSuccessSound, playWrongSound, playTriumphFanfare } from '../utils/audio';
import { Shield, Check, X, RotateCcw, Award, Flame, ArrowRight, Zap, Target } from 'lucide-react';
import { STUDY_TOPICS } from '../data/historyData';

interface Props {
  initialTopicId?: number;
  soundEnabled: boolean;
  onEarnXp: (amount: number) => void;
}

export const QuizGameView: React.FC<Props> = ({ initialTopicId, soundEnabled, onEarnXp }) => {
  const [selectedFilter, setSelectedFilter] = useState<number | 'all'>(initialTopicId || 'all');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [earnedXpSession, setEarnedXpSession] = useState(0);

  // Initialize or reset quiz based on filter
  useEffect(() => {
    startNewQuiz(selectedFilter);
  }, [selectedFilter]);

  // Helper to randomize options for each question so correct answers are evenly distributed across A, B, C, D
  const shuffleQuestionOptions = (q: QuizQuestion): QuizQuestion => {
    const pairs = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.correctIndex
    }));
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    const newCorrectIndex = pairs.findIndex((p) => p.isCorrect);
    return {
      ...q,
      options: pairs.map((p) => p.text),
      correctIndex: newCorrectIndex
    };
  };

  const startNewQuiz = (filter: number | 'all') => {
    let pool = QUIZ_QUESTIONS;
    if (filter !== 'all') {
      pool = QUIZ_QUESTIONS.filter((q) => q.topicId === filter);
    }
    // Shuffle questions order
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    // If 'all', take 10 random questions for a dynamic exam feel
    const selected = (filter === 'all' ? shuffled.slice(0, 10) : shuffled).map(shuffleQuestionOptions);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsQuizFinished(false);
    setEarnedXpSession(0);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = activeQuestions[currentIndex];
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      playSuccessSound(soundEnabled);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + 1);

      // XP calculation: 25 base + 5 streak bonus
      const xpWon = 25 + Math.min(newStreak * 5, 25);
      setEarnedXpSession((prev) => prev + xpWon);
      onEarnXp(xpWon);
    } else {
      playWrongSound(soundEnabled);
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished
      setIsQuizFinished(true);
      playTriumphFanfare(soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const currentQ = activeQuestions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {/* Filter and Mode Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#ded3be] shadow-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#8b1e24]" />
          <h2 className="font-cinzel text-base font-bold text-[#241c19]">Repte de Preguntes Romanes</h2>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="topic-select" className="text-xs text-[#6b584a] font-medium hidden sm:inline">
            Selecciona el tema:
          </label>
          <select
            id="topic-select"
            value={selectedFilter}
            onChange={(e) => {
              const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
              setSelectedFilter(val);
            }}
            className="text-xs bg-[#fbf9f4] border border-[#cfc1ad] rounded-lg px-3 py-1.5 text-[#241c19] focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/40"
          >
            <option value="all">Tots els {STUDY_TOPICS.length} temes (Test Mixt de 10 preguntes)</option>
            {STUDY_TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                Tema {t.romanNumeral}: {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isQuizFinished && currentQ ? (
        <div className="bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress & stats header */}
          <div className="flex items-center justify-between border-b border-[#eee3d2] pb-4">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold text-[#8b1e24] px-2.5 py-1 bg-[#fbf5e8] border border-[#ebd8b7] rounded-md">
                Pregunta {currentIndex + 1} de {activeQuestions.length}
              </span>
              <span className="text-xs text-[#7d695b] hidden sm:inline">
                · {currentQ.topicTitle}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ratxa x{streak}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>{score} encerts</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#f1ebe1] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#8b1e24] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div>
            <h3 className="font-lora text-lg sm:text-xl font-bold text-[#1f1614] leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const optionLetters = ['A', 'B', 'C', 'D'];
              let btnStyle = 'bg-[#fcfaf5] border-[#d8ccba] hover:bg-[#f6eee2] text-[#2c221e]';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/40';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/30';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-black/5 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      {optionLetters[idx]}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <X className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answered */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-2">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Molt bé! Resposta correcta (+25 XP)</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-rose-700" />
                    <span>Fixa't bé en la resposta correcta:</span>
                  </>
                )}
              </div>
              <p className="mt-1">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#8b1e24] hover:bg-[#6f1419] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95"
              >
                <span>{currentIndex + 1 === activeQuestions.length ? 'Veure resultats' : 'Següent pregunta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished View */
        <div className="bg-white border-2 border-[#b88c32] rounded-2xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="max-w-[220px] mx-auto">
            <AsterixIllustration
              type="centurion_trophy"
              caption="Per Tutatis! Has lluitat com un veritable centurió de Juli Cèsar!"
              className="aspect-3/2"
            />
          </div>

          <div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-[#7b1a20]">
              Repte Romà Completat!
            </h3>
            <p className="text-sm text-[#665447] mt-1">
              Has demostrat els teus coneixements de la història de la Roma Antiga per a 2n d'ESO.
            </p>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto py-2">
            <div className="p-3 bg-[#faf6ee] rounded-xl border border-[#e5d9c7]">
              <span className="text-[11px] text-[#736357] block">Encerts</span>
              <span className="font-mono text-xl font-bold text-emerald-700">
                {score} / {activeQuestions.length}
              </span>
            </div>

            <div className="p-3 bg-[#faf6ee] rounded-xl border border-[#e5d9c7]">
              <span className="text-[11px] text-[#736357] block">Puntuació</span>
              <span className="font-mono text-xl font-bold text-[#8b1e24]">
                {Math.round((score / Math.max(1, activeQuestions.length)) * 100)}%
              </span>
            </div>

            <div className="p-3 bg-[#faf6ee] rounded-xl border border-[#e5d9c7]">
              <span className="text-[11px] text-[#736357] block">Millor Ratxa</span>
              <span className="font-mono text-xl font-bold text-amber-700">
                x{maxStreak}
              </span>
            </div>

            <div className="p-3 bg-[#faf6ee] rounded-xl border border-[#e5d9c7]">
              <span className="text-[11px] text-[#736357] block">XP Guanyat</span>
              <span className="font-mono text-xl font-bold text-[#8b1e24]">
                +{earnedXpSession} XP
              </span>
            </div>
          </div>

          {/* Teacher review feedback based on score */}
          <div className="max-w-md mx-auto p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-[#4e3818]">
            {score >= activeQuestions.length * 0.9 ? (
              <p>
                🌟 <strong>Excel·lent!</strong> Tens un domini espectacular dels continguts de Roma. Estàs més que preparat/da per a l'examen!
              </p>
            ) : score >= activeQuestions.length * 0.7 ? (
              <p>
                👍 <strong>Notable!</strong> Molt bon nivell. Revisa només algun detall o data clau per assolir l'excel·lència.
              </p>
            ) : (
              <p>
                📖 <strong>Ànims, legionari!</strong> Val la pena tornar a llegir els punts clau del temari o repassar amb les flashcards abans del proper intent.
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => startNewQuiz(selectedFilter)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#8b1e24] hover:bg-[#6c1419] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tornar a jugar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
