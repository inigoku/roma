import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  MAP_REGIONS, 
  EXPANSION_PHASES, 
  MAP_QUIZ_QUESTIONS, 
  MapRegion, 
  ExpansionPhaseId, 
  MapQuizQuestion 
} from '../data/mapRegionsData';
import { playSuccessSound, playWrongSound } from '../utils/audio';
import { 
  MapPin, 
  Compass, 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Info, 
  HelpCircle, 
  Shield, 
  Layers, 
  Landmark, 
  ChevronRight, 
  Maximize2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface Props {
  onEarnXp?: (amount: number) => void;
  soundEnabled?: boolean;
}

export const ExpansionMapView: React.FC<Props> = ({ onEarnXp, soundEnabled = true }) => {
  // Mode: 'explore' (click regions) vs 'quiz' (map challenge)
  const [viewMode, setViewMode] = useState<'explore' | 'quiz'>('explore');
  
  // Selected expansion phase filter: null = all / maximum
  const [selectedPhase, setSelectedPhase] = useState<ExpansionPhaseId | 'all'>('all');
  
  // Selected region for modal/drawer detail
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(MAP_REGIONS.find(r => r.id === 'hispania') || null);
  
  // Hovered region for tooltip
  const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);

  // Map layers toggles
  const [showCities, setShowCities] = useState(true);
  const [showLimes, setShowLimes] = useState(true);
  const [showRomanizationBadge, setShowRomanizationBadge] = useState(true);

  // Auto-play timeline simulation
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timeline auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingTimeline) {
      interval = setInterval(() => {
        setSelectedPhase((current) => {
          if (current === 'all' || current === 'alt_imperi') {
            return 'monarquia';
          }
          const currentIndex = EXPANSION_PHASES.findIndex((p) => p.id === current);
          if (currentIndex < EXPANSION_PHASES.length - 1) {
            return EXPANSION_PHASES[currentIndex + 1].id;
          }
          return 'all';
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimeline]);

  // Determine if a region is active in the current phase filter
  const isRegionActiveInPhase = (region: MapRegion) => {
    if (selectedPhase === 'all') return true;
    const currentPhaseIndex = EXPANSION_PHASES.findIndex(p => p.id === selectedPhase);
    const regionPhaseIndex = EXPANSION_PHASES.findIndex(p => p.id === region.phaseId);
    return regionPhaseIndex <= currentPhaseIndex;
  };

  const handleRegionClick = (region: MapRegion) => {
    if (viewMode === 'explore') {
      setSelectedRegion(region);
    } else {
      // Quiz mode answer check
      handleQuizAnswer(region.id);
    }
  };

  const handleQuizAnswer = (clickedRegionId: string) => {
    if (quizFeedback) return; // prevent multiple clicks before next

    const currentQuestion = MAP_QUIZ_QUESTIONS[quizIndex];
    const isCorrect = clickedRegionId === currentQuestion.targetRegionId;

    if (isCorrect) {
      playSuccessSound(soundEnabled);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 }
      });
      setQuizScore((prev) => prev + 1);
      if (onEarnXp) {
        onEarnXp(20);
      }
      setQuizFeedback({
        isCorrect: true,
        message: currentQuestion.explanation
      });
    } else {
      playWrongSound(soundEnabled);
      const targetRegion = MAP_REGIONS.find((r) => r.id === currentQuestion.targetRegionId);
      setQuizFeedback({
        isCorrect: false,
        message: `No és correcte. La resposta correcta era: ${targetRegion?.name || 'altra regió'}. ${currentQuestion.explanation}`
      });
    }
  };

  const handleNextQuizQuestion = () => {
    setQuizFeedback(null);
    if (quizIndex + 1 < MAP_QUIZ_QUESTIONS.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFeedback(null);
    setQuizCompleted(false);
  };

  const activePhaseData = selectedPhase !== 'all' 
    ? EXPANSION_PHASES.find(p => p.id === selectedPhase)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#2a0e10] via-[#451418] to-[#1f0a0c] p-6 rounded-2xl border-2 border-[#b88c32] text-amber-50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#f5d77f] mb-1">
              <Compass className="w-5 h-5 text-[#f5d77f]" />
              <span className="text-xs uppercase font-mono tracking-widest font-bold">
                Cartografia Històrica · 2n d’ESO
              </span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-white tracking-wide">
              L'Expansió Territorial de la Roma Antiga
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-3xl leading-relaxed">
              Explora com una petita ciutat de pastors al costat del riu Tíber va arribar a controlar tot el <em>Mare Nostrum</em>, des d'Hispània i Britànnia fins a Egipte i Mesopotàmia. Clica a cada regió per descobrir com va ser conquerida i romanitzada.
            </p>
          </div>

          {/* Mode Switcher: Explore vs Quiz */}
          <div className="flex sm:flex-col gap-2 shrink-0">
            <div className="inline-flex p-1 bg-[#150506] border border-[#d4af37]/40 rounded-xl">
              <button
                onClick={() => {
                  setViewMode('explore');
                  setQuizFeedback(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'explore'
                    ? 'bg-[#8b1e24] text-amber-100 shadow-sm'
                    : 'text-amber-200/70 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explora el Mapa</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('quiz');
                  setSelectedPhase('all');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'quiz'
                    ? 'bg-[#8b1e24] text-amber-100 shadow-sm'
                    : 'text-amber-200/70 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 text-[#f5d77f]" />
                <span>Repte del Mapa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chronological Phase Slider Bar */}
        <div className="mt-5 pt-4 border-t border-amber-900/60">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f5d77f]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200">
                Fases de l'expansió romana:
              </span>
            </div>

            <button
              onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                isPlayingTimeline
                  ? 'bg-amber-400 text-stone-900 border-amber-300 font-bold'
                  : 'bg-white/10 text-amber-100 hover:bg-white/20 border-white/20'
              }`}
              title="Veure l'expansió de Roma animada pas a pas"
            >
              {isPlayingTimeline ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Atura Animació</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Reproduir Pas a Pas</span>
                </>
              )}
            </button>
          </div>

          {/* Phase Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <button
              onClick={() => {
                setSelectedPhase('all');
                setIsPlayingTimeline(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs text-left transition-all border ${
                selectedPhase === 'all'
                  ? 'bg-[#d4af37] text-stone-950 font-bold border-amber-200 shadow-md'
                  : 'bg-[#180809]/80 text-amber-200/80 hover:bg-white/10 border-amber-900/40'
              }`}
            >
              <span className="block text-[10px] font-mono opacity-80">Any 117 dC</span>
              <span className="font-cinzel font-bold">Màxima Expansió</span>
            </button>

            {EXPANSION_PHASES.map((phase) => {
              const isSelected = selectedPhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => {
                    setSelectedPhase(phase.id);
                    setIsPlayingTimeline(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs text-left transition-all border ${
                    isSelected
                      ? 'bg-[#d4af37] text-stone-950 font-bold border-amber-200 shadow-md'
                      : 'bg-[#180809]/80 text-amber-200/80 hover:bg-white/10 border-amber-900/40'
                  }`}
                >
                  <span className="block text-[10px] font-mono opacity-80">{phase.chronology}</span>
                  <span className="font-cinzel font-bold truncate block">{phase.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Summary banner */}
          {activePhaseData && (
            <div className="mt-3 p-3 bg-black/40 border border-amber-500/30 rounded-xl text-xs flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">🏛️ {activePhaseData.name}:</span>
              <span className="text-amber-100/90">{activePhaseData.shortDesc}</span>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ MODE INTERFACE (When Quiz tab is active) */}
      {viewMode === 'quiz' && (
        <div className="bg-white border-2 border-[#8b1e24] p-5 rounded-2xl shadow-md space-y-4">
          {!quizCompleted ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#8b1e24]" />
                  <span className="font-cinzel text-base font-bold text-[#8b1e24]">
                    Repte Cartogràfic: Pregunta {quizIndex + 1} de {MAP_QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono font-bold">
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Punts: {quizScore} encerts (+{quizScore * 20} XP)
                  </span>
                </div>
              </div>

              <div className="py-3">
                <h3 className="text-sm sm:text-base font-bold text-[#2a1d18]">
                  🎯 {MAP_QUIZ_QUESTIONS[quizIndex].question}
                </h3>
                <p className="text-xs text-[#705e52] mt-1 italic">
                  💡 Pista: {MAP_QUIZ_QUESTIONS[quizIndex].hint}
                </p>
                <p className="text-xs font-mono text-[#8b1e24] font-semibold mt-2">
                  👉 Fes clic directament sobre la regió corresponent al mapa per respondre!
                </p>
              </div>

              {/* Feedback box */}
              {quizFeedback && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm transition-all ${
                    quizFeedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {quizFeedback.isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>Molt bé! Resposta encertada (+20 XP)</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-rose-700" />
                        <span>Resposta incorrecta</span>
                      </>
                    )}
                  </div>
                  <p>{quizFeedback.message}</p>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-4 py-2 bg-[#8b1e24] hover:bg-[#70151a] text-white font-bold rounded-lg text-xs shadow-xs transition-transform active:scale-95"
                    >
                      {quizIndex + 1 === MAP_QUIZ_QUESTIONS.length ? 'Finalitzar el repte' : 'Següent pregunta'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-3xl">
                🏆
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#8b1e24]">
                Repte Cartogràfic Completat!
              </h3>
              <p className="text-sm text-[#5a483e]">
                Has obtingut <strong>{quizScore} de {MAP_QUIZ_QUESTIONS.length}</strong> respostes correctes al mapa d'expansió territorial romana.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#8b1e24] hover:bg-[#6c1418] text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tornar a jugar</span>
                </button>
                <button
                  onClick={() => setViewMode('explore')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#44332b] font-bold rounded-xl text-xs border border-stone-300 transition-colors"
                >
                  Tornar a explorar el mapa
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Interactive Map (Left/Center) + Region Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Map Column */}
        <div className="lg:col-span-8 space-y-3">
          {/* Map Layer Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-2.5 rounded-xl border border-[#ded4c3] shadow-2xs text-xs">
            <div className="flex items-center gap-1 text-[#6b584d]">
              <Layers className="w-4 h-4 text-[#8b1e24]" />
              <span className="font-semibold text-[#3b2d26]">Capes del mapa:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#4e3f36]">
                <input
                  type="checkbox"
                  checked={showCities}
                  onChange={(e) => setShowCities(e.target.checked)}
                  className="rounded text-[#8b1e24] focus:ring-[#8b1e24]"
                />
                <span>Ciutats Clau</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#4e3f36]">
                <input
                  type="checkbox"
                  checked={showLimes}
                  onChange={(e) => setShowLimes(e.target.checked)}
                  className="rounded text-[#8b1e24] focus:ring-[#8b1e24]"
                />
                <span>Limes (Muralles i Fronteres)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#4e3f36]">
                <input
                  type="checkbox"
                  checked={showRomanizationBadge}
                  onChange={(e) => setShowRomanizationBadge(e.target.checked)}
                  className="rounded text-[#8b1e24] focus:ring-[#8b1e24]"
                />
                <span>Grau de Romanització</span>
              </label>
            </div>
          </div>

          {/* SVG Map Canvas Container */}
          <div className="relative bg-[#ebf3f7] border-2 border-[#b88c32] rounded-2xl overflow-hidden shadow-md">
            {/* Compass Rose overlay */}
            <div className="absolute top-3 right-3 pointer-events-none opacity-85 z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#8b1e24]/40 bg-[#fbf6ea]/90 flex items-center justify-center shadow-xs">
                <span className="font-cinzel text-xs font-black text-[#8b1e24]">N</span>
              </div>
              <span className="font-cinzel text-[9px] font-bold text-[#8b1e24] mt-0.5">SEPTENTRIO</span>
            </div>

            {/* Maritime Trade Routes legend */}
            <div className="absolute bottom-3 left-3 pointer-events-none bg-[#fdfaf3]/95 border border-[#cdbfab] p-2.5 rounded-lg shadow-xs z-10 text-[10px] text-[#483a32] space-y-1">
              <div className="font-cinzel font-bold text-[#8b1e24] text-[11px]">MARE NOSTRVM</div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#8b1e24]"></span>
                <span>Territori Romà sota control</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-[#d97706]"></span>
                <span>Ruta marítima del blat d'Egipte</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#1e293b]"></span>
                <span>Limes defensiu (Hadrià i Rin)</span>
              </div>
            </div>

            {/* Main Interactive SVG */}
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-auto select-none block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Parchment and sea patterns */}
                <pattern id="seaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#bedbe9" strokeWidth="0.5" />
                </pattern>

                <linearGradient id="medSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d3e7f2" />
                  <stop offset="100%" stopColor="#bdd9e8" />
                </linearGradient>

                {/* Filter for subtle drop shadow on active region */}
                <filter id="regionGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#8b1e24" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Sea background with graticule */}
              <rect width="1000" height="600" fill="url(#medSeaGrad)" />
              <rect width="1000" height="600" fill="url(#seaGrid)" opacity="0.6" />

              {/* Non-conquered Continental Outline Background (Europe, Africa, Asia) */}
              <g fill="#ebdcc8" stroke="#a38f78" strokeWidth="1">
                {/* Scandinavia & Baltic */}
                <path d="M 430 0 L 530 0 L 520 60 L 460 70 L 430 40 Z" />
                {/* Ireland (Hibernia) */}
                <path d="M 180 80 L 230 70 L 240 130 L 190 140 Z" fill="#e2d2bd" />
                <text x="200" y="110" fontSize="8" fontFamily="'Cinzel', serif" fill="#8c7760">HIBERNIA</text>
                {/* Scotland (Caledonia, north of Hadrian Wall) */}
                <path d="M 270 30 L 320 30 L 330 90 L 280 90 Z" fill="#e2d2bd" />
                <text x="285" y="65" fontSize="8" fontFamily="'Cinzel', serif" fill="#8c7760">CALEDONIA</text>
                {/* Unconquered Germania beyond Rhine/Elbe */}
                <path d="M 520 70 L 720 70 L 750 160 L 580 150 Z" fill="#ebdcc8" />
                <text x="610" y="110" fontSize="11" fontFamily="'Cinzel', serif" letterSpacing="3" fill="#8c7760">GERMANIA LIBERA</text>
                {/* Sarmatia / Steppes */}
                <path d="M 750 110 L 980 110 L 980 230 L 750 200 Z" fill="#ebdcc8" />
                <text x="820" y="150" fontSize="11" fontFamily="'Cinzel', serif" letterSpacing="2" fill="#8c7760">SARMATIA</text>
                {/* Parthian Empire (Persia) */}
                <path d="M 880 320 L 1000 320 L 1000 480 L 880 460 Z" fill="#ebdcc8" />
                <text x="900" y="380" fontSize="10" fontFamily="'Cinzel', serif" letterSpacing="2" fill="#8c7760">IMPERIVM PARTHICVM</text>
                {/* Sahara Desert (Africa Interior) */}
                <path d="M 150 490 L 850 490 L 850 600 L 150 600 Z" fill="#ebd9c0" />
                <text x="440" y="550" fontSize="11" fontFamily="'Cinzel', serif" letterSpacing="4" fill="#9c8466">AFRICA INTERIOR (SAHARA)</text>
              </g>

              {/* Major Ancient Seas Names */}
              <text x="460" y="380" fontFamily="'Cinzel', serif" fontSize="16" fontWeight="bold" fill="#58798e" letterSpacing="6" opacity="0.8">MARE NOSTRVM</text>
              <text x="50" y="240" fontFamily="'Cinzel', serif" fontSize="10" fill="#678a9f" letterSpacing="2" transform="rotate(-30 50,240)">OCEANVS ATLANTICVS</text>
              <text x="790" y="230" fontFamily="'Cinzel', serif" fontSize="10" fill="#58798e" letterSpacing="2">PONTVS EVXINVS (MAR NEGRE)</text>

              {/* Major Rivers (Rhine, Danube, Nile, Tiber, Ebro, Rhone) */}
              <g stroke="#79a8c0" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Rhine */}
                <path d="M 400 240 Q 420 200 425 150 L 415 130" />
                {/* Danube */}
                <path d="M 445 220 Q 550 220 630 245 Q 700 245 745 250" />
                {/* Nile */}
                <path d="M 760 480 L 775 520 L 780 590" />
                {/* Ebro */}
                <path d="M 230 290 Q 275 300 305 320" />
                {/* Rhone */}
                <path d="M 420 240 Q 405 260 395 285" />
                {/* Tiber */}
                <path d="M 500 280 L 498 315" />
              </g>

              {/* Maritime Grain Route from Alexandria to Rome (Dotted) */}
              <path
                d="M 740 455 Q 640 420 540 380 Q 515 350 495 325"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
                strokeDasharray="6,4"
                opacity="0.75"
              />

              {/* REGIONS (Interactive Clikable Areas) */}
              <g id="roman_provinces">
                {MAP_REGIONS.map((region) => {
                  const isActiveInPhase = isRegionActiveInPhase(region);
                  const isSelected = selectedRegion?.id === region.id;
                  const isHovered = hoveredRegion?.id === region.id;

                  // Color styling based on state
                  let fillColor = region.color;
                  let fillOpacity = 0.85;

                  if (!isActiveInPhase) {
                    fillColor = '#ebdcc8';
                    fillOpacity = 0.35;
                  } else if (isSelected) {
                    fillColor = '#991b1b';
                    fillOpacity = 0.95;
                  } else if (isHovered) {
                    fillOpacity = 1;
                  }

                  return (
                    <g
                      key={region.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => handleRegionClick(region)}
                      onMouseEnter={() => setHoveredRegion(region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      {/* Region polygon / path */}
                      <path
                        d={region.svgPath}
                        fill={fillColor}
                        fillOpacity={fillOpacity}
                        stroke={isSelected ? '#fde047' : isActiveInPhase ? '#3b1c1d' : '#8c7760'}
                        strokeWidth={isSelected ? 3.5 : 2}
                        filter={isSelected ? 'url(#regionGlow)' : undefined}
                      />

                      {/* Region Central Marker Pin / Badge */}
                      {isActiveInPhase && (
                        <g transform={`translate(${region.badgeCoord.x}, ${region.badgeCoord.y})`}>
                          <circle
                            r={isSelected ? 9 : 7}
                            fill={isSelected ? '#fde047' : '#ffffff'}
                            stroke="#8b1e24"
                            strokeWidth="2.5"
                            className="transition-all"
                          />
                          <circle
                            r="3"
                            fill="#8b1e24"
                          />
                          {/* Label of the Region */}
                          <text
                            y={-12}
                            textAnchor="middle"
                            fontFamily="'Cinzel', serif"
                            fontSize={isSelected ? "11" : "9"}
                            fontWeight="bold"
                            fill={isSelected ? '#8b1e24' : '#1f0d0e'}
                            className="pointer-events-none drop-shadow-xs"
                          >
                            {region.name.split(' (')[0]}
                          </text>

                          {/* Romanization indicator icon/tag */}
                          {showRomanizationBadge && (
                            <text
                              y={16}
                              textAnchor="middle"
                              fontFamily="sans-serif"
                              fontSize="7.5"
                              fontWeight="600"
                              fill="#451a03"
                              className="pointer-events-none"
                            >
                              {region.conquestCentury.split(' (')[0]}
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Limes Defenses (Hadrian Wall & Rhine-Danube) */}
              {showLimes && (
                <g stroke="#0f172a" strokeWidth="3" strokeLinecap="round">
                  {/* Hadrian's Wall across Britannia */}
                  <line x1="295" y1="115" x2="335" y2="108" stroke="#1e293b" strokeWidth="4" />
                  <text x="315" y="102" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                    Mur d'Hadrià (122 dC)
                  </text>

                  {/* Rhine-Danube Limes Germanicus */}
                  <path
                    d="M 425 140 L 440 180 L 470 210 L 530 215 L 610 235"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeDasharray="4,2"
                  />
                  <text x="495" y="202" fontSize="7" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                    Limes Germanicus
                  </text>
                </g>
              )}

              {/* Key Roman Cities */}
              {showCities && (
                <g id="cities">
                  {/* Rome */}
                  <g transform="translate(498, 315)">
                    <circle r="5" fill="#fde047" stroke="#8b1e24" strokeWidth="2.5" />
                    <text x="8" y="4" fontFamily="'Cinzel', serif" fontSize="11" fontWeight="900" fill="#781419">
                      ROMA (Caput Mundi)
                    </text>
                  </g>

                  {/* Tarraco (Tarragona) */}
                  <g transform="translate(305, 320)">
                    <circle r="3.5" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" fill="#781419">
                      Tarraco
                    </text>
                  </g>

                  {/* Barcino (Barcelona) */}
                  <g transform="translate(315, 310)">
                    <circle r="3" fill="#ffffff" stroke="#8b1e24" strokeWidth="1.5" />
                    <text x="5" y="-3" fontFamily="'Cinzel', serif" fontSize="7.5" fontWeight="bold" fill="#781419">
                      Barcino
                    </text>
                  </g>

                  {/* Emporiae (Empúries - 218 aC) */}
                  <g transform="translate(325, 298)">
                    <circle r="3.5" fill="#f59e0b" stroke="#781419" strokeWidth="1.5" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="7.5" fontWeight="bold" fill="#781419">
                      Emporiae (218 aC)
                    </text>
                  </g>

                  {/* Carthago */}
                  <g transform="translate(470, 435)">
                    <circle r="4" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="7" y="3" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" fill="#781419">
                      Carthago
                    </text>
                  </g>

                  {/* Alexandria */}
                  <g transform="translate(740, 455)">
                    <circle r="4" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="-55" y="12" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" fill="#781419">
                      Alexandria
                    </text>
                  </g>

                  {/* Athenae */}
                  <g transform="translate(635, 365)">
                    <circle r="4" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="8" fontWeight="bold" fill="#781419">
                      Athenae
                    </text>
                  </g>

                  {/* Lugdunum (Lió) */}
                  <g transform="translate(395, 245)">
                    <circle r="3.5" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="7.5" fontWeight="bold" fill="#781419">
                      Lugdunum
                    </text>
                  </g>

                  {/* Londinium */}
                  <g transform="translate(325, 145)">
                    <circle r="3.5" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="7.5" fontWeight="bold" fill="#781419">
                      Londinium
                    </text>
                  </g>

                  {/* Byzantium */}
                  <g transform="translate(710, 305)">
                    <circle r="3.5" fill="#ffffff" stroke="#8b1e24" strokeWidth="2" />
                    <text x="6" y="3" fontFamily="'Cinzel', serif" fontSize="7.5" fontWeight="bold" fill="#781419">
                      Byzantium
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Quick instructions indicator */}
          <div className="flex items-center justify-between text-xs text-[#705e52] px-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#8b1e24]" />
              <span>Clica sobre qualsevol territori del mapa per consultar el seu dossier de conquesta i romanització.</span>
            </span>
            <span className="font-mono text-[11px] font-bold text-[#8b1e24]">
              {selectedRegion ? `Regió seleccionada: ${selectedRegion.name.split(' (')[0]}` : 'Cap regió seleccionada'}
            </span>
          </div>
        </div>

        {/* Region Detail Dossier Column (Right) */}
        <div className="lg:col-span-4">
          {selectedRegion ? (
            <div className="bg-white border-2 border-[#b88c32] rounded-2xl p-5 sm:p-6 shadow-md space-y-5 text-[#241c19] sticky top-24">
              {/* Region Header */}
              <div className="border-b border-[#ebd7b8] pb-4">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b1e24] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    {selectedRegion.conquestCentury}
                  </span>
                  <span className="text-xs font-serif italic text-[#786354]">
                    {selectedRegion.latinName}
                  </span>
                </div>

                <h2 className="font-cinzel text-xl sm:text-2xl font-black text-[#1c0809] mt-1">
                  {selectedRegion.name}
                </h2>
                <p className="text-xs text-[#6e5a4f] mt-0.5">
                  🌍 <strong>Països actuals:</strong> {selectedRegion.modernCountries}
                </p>
              </div>

              {/* Romanization Degree Badge & Economy */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#fbf8f0] rounded-xl border border-[#e5d9c7]">
                  <span className="text-[10px] text-[#736357] block font-semibold uppercase">Romanització</span>
                  <span className="font-bold text-[#8b1e24]">
                    {selectedRegion.romanizationLevel}
                  </span>
                </div>
                <div className="p-2.5 bg-[#fbf8f0] rounded-xl border border-[#e5d9c7]">
                  <span className="text-[10px] text-[#736357] block font-semibold uppercase">Cronologia</span>
                  <span className="font-bold text-[#1e293b]">
                    {selectedRegion.conquestPeriod}
                  </span>
                </div>
              </div>

              {/* Conquest Narrative */}
              <div>
                <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#8b1e24] mb-1.5 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Com va ser conquerida?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#47372f] leading-relaxed bg-[#faf7f0] p-3 rounded-xl border border-[#ebdcc7]">
                  {selectedRegion.conquestStory}
                </p>
              </div>

              {/* Generals & Key Battles */}
              <div className="space-y-1.5 text-xs text-[#47372f]">
                <div>
                  <strong className="text-[#1c0809]">Protagonistes clau: </strong>
                  <span>{selectedRegion.keyFigures}</span>
                </div>
                <div>
                  <strong className="text-[#1c0809]">Batalles o fets decisius: </strong>
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-[11px] text-[#5c493e]">
                    {selectedRegion.keyBattles.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Romanization Process */}
              <div>
                <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#8b1e24] mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Procés de Romanització</span>
                </h4>
                <p className="text-xs text-[#47372f] leading-relaxed">
                  {selectedRegion.romanizationDetails}
                </p>
              </div>

              {/* Catalonia / Hispania connection if exists */}
              {selectedRegion.cataloniaConnection && (
                <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-xl text-xs text-[#523d1d] space-y-1">
                  <span className="font-bold text-[#8b1e24] block">📍 Connexió amb Catalunya i 2n d'ESO:</span>
                  <p className="leading-relaxed">{selectedRegion.cataloniaConnection}</p>
                </div>
              )}

              {/* Main Cities & Monuments */}
              <div>
                <h4 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#8b1e24] mb-1.5 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Ciutats romanes i monuments</span>
                </h4>
                <div className="space-y-2">
                  {selectedRegion.mainCities.map((city, idx) => (
                    <div key={idx} className="p-2 bg-[#fbf9f4] border border-[#e5d9c7] rounded-lg text-[11px]">
                      <div className="font-bold text-[#1c0809]">
                        {city.latinName} <span className="font-normal text-[#786354]">({city.modernName})</span>
                      </div>
                      <div className="text-[#59473d] text-[10px] mt-0.5">{city.role}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 text-[11px] text-[#6b584d]">
                  <strong>Monuments visitables: </strong>
                  <span>{selectedRegion.keyMonuments.join(' · ')}</span>
                </div>
              </div>

              {/* Economic Importance */}
              <div className="p-3 bg-[#f5ede0] rounded-xl text-xs text-[#4c3b31] border border-[#d9c7af]">
                <strong className="text-[#8b1e24]">Valor per a Roma: </strong>
                {selectedRegion.economicValue}
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-[#b88c32] rounded-2xl p-8 text-center space-y-3">
              <Compass className="w-10 h-10 text-[#8b1e24] mx-auto opacity-70" />
              <h3 className="font-cinzel text-lg font-bold text-[#2a1d18]">
                Selecciona una regió del mapa
              </h3>
              <p className="text-xs text-[#6e5a4f]">
                Fes clic a qualsevol província de l'Imperi Romà per consultar la seva data de conquesta, els generals, les batalles i el grau de romanització.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
