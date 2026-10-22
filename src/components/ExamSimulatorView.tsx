import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AsterixIllustration } from './AsterixIllustration';
import { 
  FileCheck, 
  Printer, 
  RotateCcw, 
  Award, 
  AlertCircle, 
  Check, 
  X, 
  HelpCircle,
  Clock,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { playSuccessSound, playTriumphFanfare } from '../utils/audio';

interface MatchItem {
  id: string;
  figure: string;
  description: string;
}

const MATCHING_DATA: MatchItem[] = [
  { id: 'm1', figure: 'Anníbal Barca', description: 'General cartaginès que va travessar els Alps amb elefants el 218 aC.' },
  { id: 'm2', figure: 'Juli Cèsar', description: 'Va conquerir la Gàl·lia, va creuar el Rubicó i va morir als Idus de Març.' },
  { id: 'm3', figure: 'Octavi August', description: 'Primer emperador de Roma i creador de la Pax Romana.' },
  { id: 'm4', figure: 'Espàrtac', description: 'Gladiador que va liderar la gran revolta d’esclaus (73-71 aC).' },
  { id: 'm5', figure: 'Tiberi Grac', description: 'Tribú de la plebs que va impulsar la reforma agrària i fou assassinat.' },
  { id: 'm6', figure: 'Teodosi I el Gran', description: 'Emperador que va declarar el cristianisme religió oficial (380 dC) i va dividir l’Imperi (395 dC).' }
];

interface ChronoItem {
  id: string;
  title: string;
  yearOrder: number;
}

const CHRONO_ITEMS: ChronoItem[] = [
  { id: 'c1', title: 'Fundació de Roma per Ròmul al turó Palatí (753 aC)', yearOrder: 1 },
  { id: 'c2', title: 'Expulsió de Tarquini el Superb i inici de la República (509 aC)', yearOrder: 2 },
  { id: 'c3', title: 'Batalla de Zama i victòria sobre Cartago (202 aC)', yearOrder: 3 },
  { id: 'c4', title: 'Idus de Març: assassinat de Juli Cèsar (44 aC)', yearOrder: 4 },
  { id: 'c5', title: 'Inici de l’Imperi Romà amb Octavi August (27 aC)', yearOrder: 5 },
  { id: 'c6', title: 'Caiguda de l’Imperi d’Occident: Odoacre deposa Ròmul Augústul (476 dC)', yearOrder: 6 }
];

interface TestExamQuestion {
  question: string;
  options: string[];
  correct: number;
}

const EXAM_TEST_QUESTIONS: TestExamQuestion[] = [
  {
    question: '1. Quina d’aquestes característiques definia les magistratures de la República romana?',
    options: [
      'Eren hereditàries de pares a fills per tota la vida.',
      'Eren anuals i col·legiades (mínim 2 membres amb dret a veto).',
      'Eren escollides exclusivament pels emperadors.',
      'Només podien ser exercides per ciutadans estrangers.'
    ],
    correct: 1
  },
  {
    question: '2. Quin motiu va provocar l’arribada dels romans a Empúries l’any 218 aC?',
    options: [
      'Volien fer turisme per la Costa Brava.',
      'Tallar els subministraments i el pas de l’exèrcit d’Anníbal en la Segona Guerra Púnica.',
      'Fugir de la invasió dels gots.',
      'Cercar la tomba d’Alexandre el Gran.'
    ],
    correct: 1
  },
  {
    question: '3. Què significa "Alea iacta est" i quan es va pronunciar?',
    options: [
      '"Els ciutadans han parlat", durant l’aprovació de la Llei de les XII Taules.',
      '"Cartago ha de ser destruïda", en acabar la primera guerra púnica.',
      '"La sort està tirada", quan Cèsar va creuar el Rubicó el 49 aC.',
      '"Pau a tot l’imperi", proclamat per Octavi August.'
    ],
    correct: 2
  },
  {
    question: '4. Quin d’aquests elements NO forma part de la Romanització?',
    options: [
      'L’adopció de la llengua llatina.',
      'La creació de calçades i xarxes urbanes amb fòrum i termes.',
      'La prohibició absoluta de menjar pa i vi.',
      'L’aplicació del Dret Romà i les seves lleis escrites.'
    ],
    correct: 2
  },
  {
    question: '5. Quins són els tres conreus fonamentals de la Trilogia Mediterrània romana?',
    options: [
      'Patata, tomàquet i blat de moro.',
      'Blat (farina/pa), Oliva (oli) i Vinya (vi).',
      'Arròs, soja i te.',
      'Cafè, cotó i tabac.'
    ],
    correct: 1
  },
  {
    question: '6. Què simbolitza històricament l’any 476 dC amb la deposició de Ròmul Augústul?',
    options: [
      'L’inici de la conquesta d’Hispània.',
      'La fundació de la ciutat de Constantinoble.',
      'La fi de l’Imperi Romà d’Occident, tancant l’Edat Antiga i iniciant l’Edat Mitjana.',
      'La signatura de la Pax Romana.'
    ],
    correct: 2
  }
];

// Shuffle test questions options so answers A, B, C, D are randomized every attempt
const shuffleExamQuestions = (questions: TestExamQuestion[]): TestExamQuestion[] => {
  return questions.map((q) => {
    const pairs = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.correct
    }));
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    const newCorrect = pairs.findIndex((p) => p.isCorrect);
    return {
      ...q,
      options: pairs.map((p) => p.text),
      correct: newCorrect
    };
  });
};

interface Props {
  soundEnabled: boolean;
  onEarnXp: (amount: number) => void;
  onOpenAdvancedExamPdf?: () => void;
}

export const ExamSimulatorView: React.FC<Props> = ({ soundEnabled, onEarnXp, onOpenAdvancedExamPdf }) => {
  // Shuffled test questions
  const [testQuestions, setTestQuestions] = useState<TestExamQuestion[]>(() => shuffleExamQuestions(EXAM_TEST_QUESTIONS));

  // Part 1: Test answers
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});

  // Part 2: Matching
  const [matches, setMatches] = useState<Record<string, string>>({});

  // Part 3: Chrono ordering (array of IDs)
  const [chronoOrder, setChronoOrder] = useState<string[]>(() => {
    // start slightly shuffled
    return ['c3', 'c6', 'c1', 'c5', 'c2', 'c4'];
  });

  // Part 4: Open question text
  const [openAnswer, setOpenAnswer] = useState('');
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [openQuestionScore, setOpenQuestionScore] = useState<number | null>(null);

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const moveChronoItem = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    const newOrder = [...chronoOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    setChronoOrder(newOrder);
  };

  const handleSubmitExam = () => {
    let points = 0;

    // Part 1: 4 points max
    let testCorrect = 0;
    testQuestions.forEach((q, idx) => {
      if (testAnswers[idx] === q.correct) {
        testCorrect += 1;
      }
    });
    points += (testCorrect / testQuestions.length) * 4;

    // Part 2: 3 points max
    let matchCorrect = 0;
    MATCHING_DATA.forEach((item) => {
      if (matches[item.id] === item.figure) {
        matchCorrect += 1;
      }
    });
    points += (matchCorrect / MATCHING_DATA.length) * 3;

    // Part 3: 1.5 points max
    let correctPositions = 0;
    chronoOrder.forEach((id, idx) => {
      const item = CHRONO_ITEMS.find((c) => c.id === id);
      if (item && item.yearOrder === idx + 1) {
        correctPositions += 1;
      }
    });
    points += (correctPositions / CHRONO_ITEMS.length) * 1.5;

    // Part 4: 1.5 points max (from self-check or default 1 point if answered decently)
    const openPoints = openQuestionScore !== null ? openQuestionScore : (openAnswer.trim().length > 30 ? 1.0 : 0.5);
    points += openPoints;

    const finalGrade = Math.min(10, Math.round(points * 10) / 10);
    setTotalScore(finalGrade);
    setIsSubmitted(true);

    if (finalGrade >= 5) {
      playSuccessSound(soundEnabled);
      onEarnXp(Math.round(finalGrade * 20));
      if (finalGrade >= 8.5) {
        playTriumphFanfare(soundEnabled);
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleReset = () => {
    setTestQuestions(shuffleExamQuestions(EXAM_TEST_QUESTIONS));
    setTestAnswers({});
    setMatches({});
    setChronoOrder(['c3', 'c1', 'c5', 'c2', 'c4']);
    setOpenAnswer('');
    setShowSelfCheck(false);
    setOpenQuestionScore(null);
    setIsSubmitted(false);
    setTotalScore(0);
  };

  const getGradeText = (score: number) => {
    if (score >= 9) return { label: 'Excel·lent (E)', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (score >= 7) return { label: 'Notable (N)', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (score >= 6) return { label: 'Bé (B)', color: 'text-amber-800 bg-amber-50 border-amber-300' };
    if (score >= 5) return { label: 'Suficient (S)', color: 'text-amber-900 bg-amber-100 border-amber-400' };
    return { label: 'Insuficient (I)', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* High-Level Exam PDF Callout Banner */}
      <div className="bg-gradient-to-r from-[#240a0c] via-[#421316] to-[#240a0c] text-white p-4 sm:p-5 rounded-2xl border-2 border-[#d4af37] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-[#8b1e24] border border-amber-400/50 rounded-xl text-[#f7d984] shrink-0 shadow-inner">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                Examen Avançat en PDF (Nivell 10 / Excel·lència)
              </h3>
              <span className="text-[10px] font-mono bg-amber-500 text-neutral-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Els 9 Temes
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1 max-w-xl">
              Vols imprimir un examen complet en paper o desar-lo en PDF? Pots triar entre el <strong>Nivell 2n d’ESO</strong> (preguntes clares i adaptades) o el <strong>Nivell Ampliació</strong>, tots dos amb solucionari docent complet per als 9 temes.
            </p>
          </div>
        </div>

        {onOpenAdvancedExamPdf && (
          <button
            onClick={onOpenAdvancedExamPdf}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3cf65] hover:from-[#c29e2f] hover:to-[#dfbb52] text-neutral-950 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer self-stretch md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Obrir / Descarregar PDF</span>
          </button>
        )}
      </div>

      {/* Exam Header */}
      <div className="bg-[#240a0c] text-white p-6 rounded-2xl border-2 border-[#b88c32] shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#f0cb68]">
              Institut d'Educació Secundària · 2n d'ESO
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide mt-0.5">
              Simulacre d'Examen: La Història de Roma
            </h2>
            <p className="text-xs text-amber-200/80 mt-1">
              Avalua't com en una prova real de classe (Puntuació màxima: 10 punts)
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto print:hidden">
            {onOpenAdvancedExamPdf && (
              <button
                onClick={onOpenAdvancedExamPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                title="Obrir l'examen oficial complet en format PDF / Imprimible per a 2n d'ESO"
              >
                <Printer className="w-4 h-4" />
                <span>Examen Imprimible / PDF (Oficial)</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Banner if submitted */}
        {isSubmitted && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-black font-mono text-[#f0cb68]">
                  {totalScore} / 10
                </div>
                <div className={`px-3 py-1 rounded-lg border text-xs font-bold ${getGradeText(totalScore).color}`}>
                  {getGradeText(totalScore).label}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#8b1e24] hover:bg-[#a6252c] text-white rounded-lg text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar Examen</span>
              </button>
            </div>

            {totalScore >= 8 && onOpenAdvancedExamPdf && (
              <div className="bg-amber-400/15 border border-amber-400/40 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#f0cb68] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#f0cb68]">
                      {totalScore === 10 ? "PUNTUACIÓ PERFECTA (10/10)! Has dominat el nivell bàsic!" : "Puntuació d'excel·lència!"}
                    </p>
                    <p className="text-[11px] text-amber-100/80">
                      Posa a prova la teva capacitat d'anàlisi amb l'Examen Avançat en PDF sobre tots els 9 temes.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenAdvancedExamPdf}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#f3cf65] hover:from-[#c29e2f] hover:to-[#dfbb52] text-neutral-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Obrir Examen Avançat PDF →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Exam Sheet */}
      <div className="bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 shadow-xs space-y-8 text-[#241c19]">
        {/* PART 1: TEST */}
        <section className="space-y-4">
          <div className="border-b border-[#ebd7b8] pb-2 flex items-center justify-between">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#7b1a20]">
              Part 1: Preguntes d'Opció Múltiple (4 punts)
            </h3>
            <span className="text-xs font-mono text-[#8a7667]">1 punt per resposta</span>
          </div>

          <div className="space-y-6">
            {testQuestions.map((q, qIdx) => (
              <div key={qIdx} className="space-y-2">
                <p className="text-xs sm:text-sm font-bold text-[#2d221e]">{q.question}</p>
                <div className="space-y-1.5 pl-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = testAnswers[qIdx] === optIdx;
                    let labelClass = 'bg-[#fbf9f4] border-[#dfd4c1] hover:bg-[#f6efe2]';

                    if (isSubmitted) {
                      if (optIdx === q.correct) {
                        labelClass = 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950';
                      } else if (isSelected) {
                        labelClass = 'bg-rose-50 border-rose-400 text-rose-950';
                      }
                    } else if (isSelected) {
                      labelClass = 'bg-amber-100/70 border-[#7b1a20] font-semibold text-[#7b1a20]';
                    }

                    return (
                      <label
                        key={optIdx}
                        className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${labelClass}`}
                      >
                        <input
                          type="radio"
                          name={`exam-q-${qIdx}`}
                          disabled={isSubmitted}
                          checked={isSelected}
                          onChange={() => setTestAnswers({ ...testAnswers, [qIdx]: optIdx })}
                          className="accent-[#7b1a20]"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PART 2: MATCHING */}
        <section className="space-y-4">
          <div className="border-b border-[#ebd7b8] pb-2 flex items-center justify-between">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#7b1a20]">
              Part 2: Relaciona cada Personatge amb el seu fet històric (3 punts)
            </h3>
            <span className="text-xs font-mono text-[#8a7667]">0.6 punts cadascun</span>
          </div>

          <div className="space-y-3">
            {MATCHING_DATA.map((item) => {
              const currentChoice = matches[item.id] || '';
              const isCorrect = currentChoice === item.figure;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-rose-50 border-rose-300'
                      : 'bg-[#faf7f0] border-[#ded2bd]'
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-[#3b2d26]">{item.description}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <select
                      disabled={isSubmitted}
                      value={currentChoice}
                      onChange={(e) => setMatches({ ...matches, [item.id]: e.target.value })}
                      className="text-xs bg-white border border-[#cfc1ad] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/30"
                    >
                      <option value="">Selecciona el personatge...</option>
                      {MATCHING_DATA.map((m) => (
                        <option key={m.figure} value={m.figure}>
                          {m.figure}
                        </option>
                      ))}
                    </select>

                    {isSubmitted && (
                      isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="flex items-center gap-1 text-[11px] text-rose-700 font-bold">
                          <X className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>({item.figure})</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PART 3: CHRONOLOGY ORDERING */}
        <section className="space-y-4">
          <div className="border-b border-[#ebd7b8] pb-2 flex items-center justify-between">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#7b1a20]">
              Part 3: Ordena Cronològicament (Del més antic al més modern) (1.5 punts)
            </h3>
            <span className="text-xs font-mono text-[#8a7667]">Fes servir les fletxes</span>
          </div>

          <p className="text-xs text-[#6e5b4e]">
            Col·loca els fets de dalt (el primer que va succeir) a baix (el darrer):
          </p>

          <div className="space-y-2">
            {chronoOrder.map((id, idx) => {
              const item = CHRONO_ITEMS.find((c) => c.id === id);
              if (!item) return null;
              const isCorrectPosition = isSubmitted && item.yearOrder === idx + 1;

              return (
                <div
                  key={id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm ${
                    isSubmitted
                      ? isCorrectPosition
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-rose-50 border-rose-300'
                      : 'bg-[#faf7f0] border-[#ded2bd]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-[#7b1a20] text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-[#2d221e]">{item.title}</span>
                  </div>

                  {!isSubmitted ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveChronoItem(idx, 'up')}
                        disabled={idx === 0}
                        className="px-2 py-1 bg-white hover:bg-stone-100 disabled:opacity-30 border rounded text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveChronoItem(idx, 'down')}
                        disabled={idx === chronoOrder.length - 1}
                        className="px-2 py-1 bg-white hover:bg-stone-100 disabled:opacity-30 border rounded text-xs"
                      >
                        ▼
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-bold">
                      {isCorrectPosition ? '✓ Correcte' : `(Hauria de ser posició ${item.yearOrder})`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PART 4: OPEN QUESTION */}
        <section className="space-y-4">
          <div className="border-b border-[#ebd7b8] pb-2 flex items-center justify-between">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#7b1a20]">
              Part 4: Pregunta Curta de Desenvolupament (1.5 punts)
            </h3>
            <span className="text-xs font-mono text-[#8a7667]">Redacció personal</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-[#241c19]">
              Defineix amb les teves paraules què va ser la <strong>Romanització</strong> i anomena almenys tres elements mitjançant els quals es va difondre als territoris conquerits:
            </p>

            <textarea
              rows={4}
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="Escriu la teva resposta aquí..."
              className="w-full p-3 text-xs sm:text-sm bg-[#fbf9f4] border border-[#d6cbba] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/30 text-[#241c19]"
            />

            {isSubmitted && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs sm:text-sm text-[#4e3818]">
                <strong className="block text-[#7b1a20]">Criteri de correcció i resposta model:</strong>
                <p>
                  "La Romanització és el procés d'assimilació de la cultura, la llengua i la forma de vida romana pels pobles conquerits. Es va difondre a través de: 1) La llengua llatina; 2) El dret romà; 3) Les ciutats amb calçades, fòrums, termes i aqüeductes; 4) L'exèrcit i el comerç."
                </p>
                <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
                  <span>Autoavalua la teva resposta escrita:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOpenQuestionScore(1.5)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        openQuestionScore === 1.5 ? 'bg-[#7b1a20] text-white' : 'bg-white border'
                      }`}
                    >
                      Completa (1.5 p)
                    </button>
                    <button
                      onClick={() => setOpenQuestionScore(0.8)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        openQuestionScore === 0.8 ? 'bg-[#7b1a20] text-white' : 'bg-white border'
                      }`}
                    >
                      Parcial (0.8 p)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Submit button */}
        {!isSubmitted ? (
          <div className="pt-4 border-t border-[#ebd8ba] flex justify-end">
            <button
              onClick={handleSubmitExam}
              className="flex items-center gap-2 px-8 py-3 bg-[#7b1a20] hover:bg-[#641318] text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <FileCheck className="w-5 h-5" />
              <span>Lliurar i Corregir Examen</span>
            </button>
          </div>
        ) : (
          <div className="pt-4 border-t border-[#ebd8ba] flex justify-between items-center">
            <span className="text-xs text-[#6e5d50]">Examen completat i corregit.</span>
            <button
              onClick={handleReset}
              className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-[#3b2c25] font-semibold text-xs rounded-lg transition-colors"
            >
              Tornar a provar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
