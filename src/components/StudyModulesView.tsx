import React, { useState } from 'react';
import { STUDY_TOPICS, StudyTopic } from '../data/historyData';
import { AsterixIllustration, AsterixIllustrationType } from './AsterixIllustration';
import { 
  CheckCircle, 
  Lightbulb, 
  HelpCircle, 
  Users, 
  Calendar, 
  Printer, 
  ArrowRight, 
  Sparkles,
  BookmarkCheck,
  Search,
  Map
} from 'lucide-react';

interface Props {
  onStartQuizTopic: (topicId: number) => void;
  onOpenFlashcardsTopic: (topicId: number) => void;
  onOpenMap?: () => void;
}

const TOPIC_ILLUSTRATIONS: Record<number, { type: AsterixIllustrationType; caption: string }> = {
  1: { type: 'romulus_remus', caption: 'Ròmul, Rem i la lloba Luperca al turó Palatí (753 aC)' },
  2: { type: 'senate_debate', caption: 'Tensió al Senat romà: el Tribú de la Plebs crida el famós "VETO!"' },
  3: { type: 'legion_march', caption: 'Legionaris disciplinats marxant amb scutum i pilum per la calçada' },
  4: { type: 'hannibal_elephant', caption: 'Anníbal Barca travessant els Alps glaçats amb elefants de combat (218 aC)' },
  5: { type: 'spartacus_revolt', caption: 'Espàrtac liderant la gran revolta d’esclaus i gladiadors (73-71 aC)' },
  6: { type: 'caesar_rubicon', caption: 'Juli Cèsar creuant el riu Rubicó: "Alea iacta est!" (49 aC)' },
  7: { type: 'augustus_pax', caption: 'Octavi August inaugurant la Pax Romana i transformant la ciutat en marbre' },
  8: { type: 'roman_economy', caption: 'L’economia romana: la trilogia mediterrània (blat, oliva, vinya), l’arada romana, el comerç i les calçades' },
  9: { type: 'empire_crisis', caption: 'La crisi de l’Imperi, les invasions germàniques, la divisió de Teodosi (395) i la caiguda el 476 dC' }
};

export const StudyModulesView: React.FC<Props> = ({ onStartQuizTopic, onOpenFlashcardsTopic, onOpenMap }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [completedTopics, setCompletedTopics] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('roma_completed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

  const activeTopic = STUDY_TOPICS.find((t) => t.id === selectedTopicId) || STUDY_TOPICS[0];

  const toggleTopicCompleted = (id: number) => {
    const updated = completedTopics.includes(id)
      ? completedTopics.filter((tId) => tId !== id)
      : [...completedTopics, id];
    setCompletedTopics(updated);
    try {
      localStorage.setItem('roma_completed_topics', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // Iframe print fallback
    }
  };

  // Quick filter for topics by text
  const filteredTopics = STUDY_TOPICS.filter((t) => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner / Intro */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#2c0b0e] to-[#4e1419] p-5 sm:p-6 rounded-xl border border-[#9b722b] text-white shadow-md">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#f0cb68] font-bold">
            Temari Oficial de 2n d'ESO · Ciències Socials
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide mt-1 text-white">
            La Roma Antiga pas a pas
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl">
            Explora els {STUDY_TOPICS.length} temes clau treballats a classe. Cada unitat conté resums visuals, dades per a l'examen, personatges i curiositats històriques.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-[#190507]/70 border border-[#835e23] px-3.5 py-2 rounded-lg text-right">
            <span className="text-[10px] text-amber-200/70 uppercase block">Progrés d'estudi</span>
            <span className="font-cinzel font-bold text-base text-[#f0cb68]">
              {completedTopics.length} de {STUDY_TOPICS.length} completats
            </span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-100 rounded-lg transition-colors print:hidden"
            title="Imprimir tema seleccionat per a estudiar en paper"
          >
            <Printer className="w-4 h-4 text-[#f0cb68]" />
            <span className="hidden sm:inline">Imprimir tema</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: 7 Topics Selector */}
        <div className="lg:col-span-4 space-y-3 print:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8d7c6b]" />
            <input
              type="text"
              placeholder="Cerca al temari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#d6cbba] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/40 text-[#241c19] placeholder:text-[#9e8f7f]"
            />
          </div>

          <div className="space-y-2">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              const isDone = completedTopics.includes(topic.id);

              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-[#7b1a20] shadow-md ring-2 ring-[#7b1a20]/30'
                      : 'bg-[#faf6ee] hover:bg-white border-[#dfd4c3] text-[#3d3029]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-cinzel font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#7b1a20] text-amber-100'
                        : 'bg-[#ece3d4] text-[#5e4b3e]'
                    }`}
                  >
                    {topic.romanNumeral}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono text-[#8a6850]">{topic.chronology}</span>
                      {isDone && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <h3 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-[#7b1a20]' : 'text-[#2a201c]'}`}>
                      {topic.title}
                    </h3>
                    <p className="text-[11px] text-[#736357] line-clamp-1 mt-0.5">
                      {topic.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick study shortcuts */}
          <div className="p-4 bg-[#f3ede1] rounded-xl border border-[#ded2be] space-y-2 mt-4">
            <h4 className="text-xs font-bold text-[#5c473b] uppercase tracking-wider">Accions ràpides</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onStartQuizTopic(selectedTopicId)}
                className="p-2.5 bg-[#7b1a20] hover:bg-[#621318] text-white text-xs font-semibold rounded-lg text-center transition-colors shadow-xs"
              >
                Test d'aquest tema
              </button>
              <button
                onClick={() => onOpenFlashcardsTopic(selectedTopicId)}
                className="p-2.5 bg-white hover:bg-amber-50 text-[#7b1a20] border border-[#d6cbba] text-xs font-semibold rounded-lg text-center transition-colors"
              >
                Targetes de memòria
              </button>
            </div>
            {onOpenMap && (
              <button
                onClick={onOpenMap}
                className="w-full flex items-center justify-center gap-1.5 p-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/35 text-[#523d1d] border border-[#d4af37]/50 text-xs font-bold rounded-lg transition-colors mt-1"
              >
                <Map className="w-3.5 h-3.5 text-[#8b1e24]" />
                <span>Explorar Mapa d'Expansió</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Content: Detailed Topic Study Sheet */}
        <div className="lg:col-span-8 bg-white border border-[#ded3c2] rounded-xl p-6 sm:p-8 shadow-sm space-y-8 text-[#29201b]">
          {/* Header of the topic */}
          <div className="border-b border-[#ebd7b8] pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-lg font-black text-[#7b1a20] px-2 py-0.5 bg-[#fbf5e8] border border-[#e8d5b5] rounded-md">
                  TEMA {activeTopic.romanNumeral}
                </span>
                <span className="text-xs font-medium text-[#7d6755] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#9e741c]" /> {activeTopic.chronology}
                </span>
                <span className="text-xs font-mono uppercase text-[#7d6755]">· {activeTopic.period}</span>
              </div>

              <button
                onClick={() => toggleTopicCompleted(activeTopic.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  completedTopics.includes(activeTopic.id)
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <BookmarkCheck className="w-4 h-4" />
                {completedTopics.includes(activeTopic.id) ? 'Marcar com a no completat' : 'Marcar com a estudiat'}
              </button>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-[#6d1419] tracking-tight">
              {activeTopic.title}
            </h1>
            <p className="text-sm sm:text-base text-[#6b584b] mt-1 font-medium italic">
              {activeTopic.subtitle}
            </p>

            {/* Asterix Style Comic Vignette for this topic */}
            {TOPIC_ILLUSTRATIONS[activeTopic.id] && (
              <div className="my-5">
                <AsterixIllustration
                  key={`topic-ill-${activeTopic.id}-${TOPIC_ILLUSTRATIONS[activeTopic.id].type}`}
                  type={TOPIC_ILLUSTRATIONS[activeTopic.id].type}
                  caption={TOPIC_ILLUSTRATIONS[activeTopic.id].caption}
                  className="max-w-md mx-auto aspect-16/10"
                />
              </div>
            )}

            <div className="mt-4 p-4 bg-[#fbf8f0] border-l-4 border-[#7b1a20] rounded-r-lg text-xs sm:text-sm text-[#44362f] leading-relaxed">
              <strong className="font-bold text-[#7b1a20] block mb-1">Resum general per a 2n d'ESO:</strong>
              {activeTopic.summary}
            </div>
          </div>

          {/* Key Syllabus Points */}
          <div className="space-y-6">
            <h3 className="font-cinzel text-lg font-bold text-[#7b1a20] border-b border-[#f0e3cc] pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#be8e27]" />
              Continguts Clau del Tema
            </h3>

            <div className="space-y-5">
              {activeTopic.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-[#faf7f0] border border-[#e8dece] rounded-xl p-5 space-y-2.5">
                  <h4 className="font-bold text-sm sm:text-base text-[#241c19] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#7b1a20] text-white text-[11px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {point.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#54443a] leading-relaxed">
                    {point.description}
                  </p>

                  {point.details && (
                    <ul className="space-y-2 mt-2 pt-2 border-t border-[#ede2d2]">
                      {point.details.map((det, dIdx) => (
                        <li key={dIdx} className="text-xs sm:text-sm text-[#3b2f28] flex items-start gap-2">
                          <span className="text-[#be8e27] font-bold mt-0.5">•</span>
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Comparison (if present) */}
          {activeTopic.interactiveComparison && (
            <div className="border border-[#dfd2be] rounded-xl overflow-hidden shadow-xs">
              <div className="bg-[#7b1a20] px-4 py-2.5 text-white font-cinzel font-bold text-sm tracking-wide">
                Esquema Comparatiu: {activeTopic.interactiveComparison.title}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#dfd2be] bg-[#fbf9f4]">
                <div className="p-4 sm:p-5">
                  <h5 className="font-bold text-xs sm:text-sm text-[#7b1a20] uppercase tracking-wider mb-2.5">
                    {activeTopic.interactiveComparison.leftTitle}
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#44362f]">
                    {activeTopic.interactiveComparison.leftItems.map((it, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#be8e27]">✔</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 sm:p-5">
                  <h5 className="font-bold text-xs sm:text-sm text-[#7b1a20] uppercase tracking-wider mb-2.5">
                    {activeTopic.interactiveComparison.rightTitle}
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#44362f]">
                    {activeTopic.interactiveComparison.rightItems.map((it, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#be8e27]">✔</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Exam Tips ("Dades clau per a l'examen") */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-[#8b5e1b]">
              <Lightbulb className="w-5 h-5" />
              <h4 className="font-cinzel font-bold text-sm sm:text-base text-[#6b4712]">
                Dades Clau per a l'Examen (Repàs en 60 segons)
              </h4>
            </div>
            <p className="text-xs text-[#7d561a]">
              Aquests són els conceptes que el professor/a de socials acostuma a preguntar a 2n d'ESO:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {activeTopic.examTips.map((tip, idx) => (
                <div key={idx} className="bg-white/80 border border-amber-200/80 p-3 rounded-lg text-xs text-[#4e3818] leading-relaxed">
                  <span className="font-bold text-[#8b5e1b] mr-1">📌</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Key Figures */}
          <div>
            <h4 className="font-cinzel text-base font-bold text-[#7b1a20] mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#be8e27]" />
              Personatges Històrics Destacats
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeTopic.keyFigures.map((fig) => (
                <div key={fig.name} className="p-3.5 bg-[#fbf9f4] border border-[#e2d6c3] rounded-lg">
                  <div className="font-bold text-xs sm:text-sm text-[#2b201c]">{fig.name}</div>
                  <div className="text-[11px] font-semibold text-[#8b1e24] mb-1">{fig.role}</div>
                  <div className="text-xs text-[#524339] leading-relaxed">{fig.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Did You Know? Trivia Box */}
          <div className="bg-[#f0f4f9] border border-[#c9d7e8] rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
            <HelpCircle className="w-5 h-5 text-[#2c5282] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1e3a61]">El Sabies Que? (Curiositat romana)</h4>
              <p className="text-xs sm:text-sm text-[#2d4a73] mt-1 leading-relaxed">
                {activeTopic.didYouKnow}
              </p>
            </div>
          </div>

          {/* Bottom Navigation for Next/Prev Topic */}
          <div className="pt-4 border-t border-[#ebd9c1] flex items-center justify-between">
            {selectedTopicId > 1 ? (
              <button
                onClick={() => setSelectedTopicId(selectedTopicId - 1)}
                className="px-3.5 py-2 text-xs font-semibold text-[#7b1a20] hover:bg-stone-100 rounded-lg border border-stone-300 transition-colors"
              >
                ← Tema {selectedTopicId - 1}
              </button>
            ) : <div />}

            <button
              onClick={() => onStartQuizTopic(selectedTopicId)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#7b1a20] hover:bg-[#621318] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors"
            >
              <span>Fes el test del Tema {activeTopic.romanNumeral}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {selectedTopicId < 7 ? (
              <button
                onClick={() => setSelectedTopicId(selectedTopicId + 1)}
                className="px-3.5 py-2 text-xs font-semibold text-[#7b1a20] hover:bg-stone-100 rounded-lg border border-stone-300 transition-colors"
              >
                Tema {selectedTopicId + 1} →
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};
