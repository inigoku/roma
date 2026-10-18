import React, { useState } from 'react';
import { FLASHCARDS_DATA, Flashcard } from '../data/flashcardsData';
import { STUDY_TOPICS } from '../data/historyData';
import { AsterixIllustration, AsterixIllustrationType } from './AsterixIllustration';
import { 
  Rotate3D, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { playSuccessSound } from '../utils/audio';

const FLASHCARD_ILLUSTRATIONS: Record<number, AsterixIllustrationType> = {
  1: 'romulus_remus',
  2: 'senate_debate',
  3: 'legion_march',
  4: 'hannibal_elephant',
  5: 'spartacus_revolt',
  6: 'caesar_rubicon',
  7: 'augustus_pax',
  8: 'roman_economy',
  9: 'empire_crisis'
};

interface Props {
  initialTopicId?: number;
  soundEnabled: boolean;
  onEarnXp: (amount: number) => void;
}

export const FlashcardsView: React.FC<Props> = ({ initialTopicId, soundEnabled, onEarnXp }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>(initialTopicId || 'all');
  const [deck, setDeck] = useState<Flashcard[]>(() => {
    if (initialTopicId) {
      return FLASHCARDS_DATA.filter((fc) => fc.topicId === initialTopicId);
    }
    return FLASHCARDS_DATA;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);
  const [reviewCards, setReviewCards] = useState<string[]>([]);

  const handleFilterChange = (topicId: number | 'all') => {
    setSelectedTopicId(topicId);
    let newDeck = FLASHCARDS_DATA;
    if (topicId !== 'all') {
      newDeck = FLASHCARDS_DATA.filter((fc) => fc.topicId === topicId);
    }
    setDeck(newDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  };

  const currentCard = deck[currentIndex];

  const handleNext = () => {
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handleMarkMastered = () => {
    if (!currentCard) return;
    if (!masteredCards.includes(currentCard.id)) {
      setMasteredCards((prev) => [...prev, currentCard.id]);
      setReviewCards((prev) => prev.filter((id) => id !== currentCard.id));
      onEarnXp(10);
      playSuccessSound(soundEnabled);
    }
    handleNext();
  };

  const handleMarkReview = () => {
    if (!currentCard) return;
    if (!reviewCards.includes(currentCard.id)) {
      setReviewCards((prev) => [...prev, currentCard.id]);
      setMasteredCards((prev) => prev.filter((id) => id !== currentCard.id));
    }
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#dfd4c1] shadow-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#8b1e24]" />
          <div>
            <h2 className="font-cinzel text-base font-bold text-[#241c19]">Targetes de Memòria (Flashcards)</h2>
            <p className="text-xs text-[#736357]">Repàs actiu per memoritzar conceptes clau</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedTopicId}
            onChange={(e) => {
              const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
              handleFilterChange(val);
            }}
            className="text-xs bg-[#fbf9f4] border border-[#cfc1ad] rounded-lg px-3 py-1.5 text-[#241c19] focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/40"
          >
            <option value="all">Totes les 27 targetes (Tots els temes)</option>
            {STUDY_TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                Tema {t.romanNumeral}: {t.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            className="p-1.5 text-xs text-[#5f4e42] hover:text-[#241c19] bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-300 transition-colors flex items-center gap-1"
            title="Barrejar targetes"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Barrejar</span>
          </button>
        </div>
      </div>

      {/* Progress metrics */}
      <div className="flex items-center justify-between text-xs text-[#6e5d51] px-1">
        <span>Targeta {deck.length > 0 ? currentIndex + 1 : 0} de {deck.length}</span>
        <div className="flex items-center gap-4">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {masteredCards.length} dominades
          </span>
          <span className="text-amber-800 font-semibold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> {reviewCards.length} per repassar
          </span>
        </div>
      </div>

      {/* Main Flashcard Container */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer group relative min-h-[300px] sm:min-h-[340px] w-full rounded-2xl p-8 sm:p-12 transition-all duration-300 shadow-md border-2 border-[#b88c32] flex flex-col justify-between select-none"
            style={{
              backgroundColor: isFlipped ? '#fcfbf7' : '#2b0c0f',
              color: isFlipped ? '#241c19' : '#fff'
            }}
          >
            {/* Card top banner */}
            <div className="flex items-center justify-between text-xs pb-4 border-b border-white/10">
              <span className={`font-mono uppercase font-bold tracking-wider ${isFlipped ? 'text-[#8b1e24]' : 'text-amber-300'}`}>
                {currentCard.topicTitle}
              </span>
              <span className={`flex items-center gap-1 text-[11px] ${isFlipped ? 'text-stone-500' : 'text-stone-300/80'}`}>
                <Rotate3D className="w-3.5 h-3.5" />
                Clica per girar
              </span>
            </div>

            {/* Card Content (Question vs Answer) */}
            <div className="py-4 flex flex-col justify-center items-center text-center">
              {/* Comic thumbnail on the card */}
              {FLASHCARD_ILLUSTRATIONS[currentCard.topicId] && (
                <div className="w-24 sm:w-28 mb-3 opacity-90 transition-transform group-hover:scale-105 pointer-events-none">
                  <AsterixIllustration
                    type={FLASHCARD_ILLUSTRATIONS[currentCard.topicId]}
                    className="aspect-16/10"
                  />
                </div>
              )}

              {!isFlipped ? (
                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-300/80 block">
                    PREGUNTA / CONCEPTE:
                  </span>
                  <h3 className="font-lora text-lg sm:text-xl font-bold leading-relaxed text-amber-50 max-w-lg">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#8b1e24] font-bold block">
                    RESPOSTA / EXPLICACIÓ:
                  </span>
                  <p className="font-lora text-sm sm:text-base text-[#2e231e] leading-relaxed max-w-lg">
                    {currentCard.back}
                  </p>
                </div>
              )}
            </div>

            {/* Hint Box (if available and front) */}
            {!isFlipped && currentCard.hint && (
              <div className="pt-2 text-center" onClick={(e) => e.stopPropagation()}>
                {showHint ? (
                  <div className="text-xs text-amber-200/90 bg-black/30 border border-amber-500/30 px-3 py-1.5 rounded-lg inline-block">
                    💡 Pista: {currentCard.hint}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-xs text-amber-300/70 hover:text-amber-200 inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Veure pista
                  </button>
                )}
              </div>
            )}

            {/* Card bottom footer */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[11px] opacity-75">
              <span>{isFlipped ? 'Cara B: Resposta' : 'Cara A: Pregunta'}</span>
              <span>Barra d'espai o clic per girar</span>
            </div>
          </div>

          {/* Action rating buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 text-xs font-semibold bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-[#3b2f28] disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex + 1 >= deck.length}
                className="px-3.5 py-2 text-xs font-semibold bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-[#3b2f28] disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <span>Següent</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Self evaluation buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleMarkReview}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold bg-[#fbf0ee] hover:bg-[#f7dfdb] border border-rose-300 text-rose-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Cal repassar</span>
              </button>

              <button
                onClick={handleMarkMastered}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold bg-[#edf7ee] hover:bg-[#d9eedb] border border-emerald-300 text-emerald-900 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Me la sé! (+10 XP)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
          Cap targeta disponible per al filtre seleccionat.
        </div>
      )}
    </div>
  );
};
