import React from 'react';
import { Volume2, VolumeX, BookMarked, Award, Shield, Compass, BookOpen, Clock, FileCheck, Map, GraduationCap } from 'lucide-react';
import { getRankForXp, getNextRank, RomanRank } from '../utils/ranks';

export type TabType = 'temari' | 'mapa' | 'quiz' | 'flashcards' | 'timeline' | 'romanitzacio' | 'examen' | 'examen_pdf';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  xp: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenGlossary: () => void;
  onOpenRanksModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  xp,
  soundEnabled,
  setSoundEnabled,
  onOpenGlossary,
  onOpenRanksModal
}) => {
  const currentRank: RomanRank = getRankForXp(xp);
  const nextRank = getNextRank(xp);

  const prevXpThreshold = currentRank.minXp;
  const nextXpThreshold = nextRank ? nextRank.minXp : currentRank.minXp + 500;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((xp - prevXpThreshold) / (nextXpThreshold - prevXpThreshold)) * 100))
  );

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; highlight?: boolean }[] = [
    { id: 'temari', label: 'Els 9 Temes', icon: BookOpen },
    { id: 'mapa', label: "Mapa d'Expansió", icon: Map },
    { id: 'quiz', label: 'Repte Quiz', icon: Shield },
    { id: 'flashcards', label: 'Flashcards', icon: BookMarked },
    { id: 'timeline', label: 'Línia del Temps', icon: Clock },
    { id: 'romanitzacio', label: 'Romanització', icon: Compass },
    { id: 'examen', label: 'Simulacre', icon: FileCheck },
    { id: 'examen_pdf', label: 'Examen PDF Imprimible', icon: GraduationCap, highlight: true },
  ];

  return (
    <header className="w-full bg-[#1c0809] text-amber-50 border-b-2 border-[#b88c32] shadow-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & title */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#8b1e24] to-[#541418] border border-[#d4af37] flex items-center justify-center shadow-inner group">
              {/* Comic helmet plume crest decoration */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-t-full border-t border-amber-300" />
              <span className="font-cinzel text-xl font-black text-[#f7d984] tracking-tighter">SPQR</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-white">
                  ROMA ANTIGA
                </h1>
                <span className="text-[10px] bg-red-800 text-amber-200 border border-amber-500/40 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  2n d’ESO
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-[#3a1518] text-[#f7d984] border border-[#d4af37]/40 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  Còmic Històric
                </span>
              </div>
              <p className="text-xs text-amber-200/75 hidden sm:block">
                Edició il·lustrada: Dels orígens de Roma a la crisi de l'Imperi Romà
              </p>
            </div>
          </div>

          {/* User Progress & Actions */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4">
            {/* Rank widget */}
            <button
              onClick={onOpenRanksModal}
              title="Clica per veure els rangs romans"
              className="flex items-center gap-2.5 bg-[#2b0f12] hover:bg-[#3c171b] border border-[#9b722b] px-3 py-1.5 rounded-lg transition-colors text-left"
            >
              <span className="text-xl select-none" aria-hidden="true">{currentRank.badge}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-cinzel font-bold text-[#f7d984]">{currentRank.name}</span>
                  <span className="text-[10px] text-amber-300/80 font-mono font-bold">({xp} XP)</span>
                </div>
                <div className="w-24 sm:w-28 bg-[#140607] h-1.5 rounded-full overflow-hidden mt-1 border border-[#6b4c1a]">
                  <div
                    className="bg-gradient-to-r from-[#d4af37] to-[#f3cf65] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Quick buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={onOpenGlossary}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-200 hover:text-white bg-white/5 hover:bg-white/10 border border-amber-500/30 rounded-lg transition-colors"
                title="Obrir glossari de termes"
              >
                <BookOpen className="w-4 h-4 text-[#d8ab4e]" />
                <span className="hidden sm:inline">Glossari</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  soundEnabled
                    ? 'text-amber-300 bg-amber-400/10 border-amber-500/40 hover:bg-amber-400/20'
                    : 'text-stone-400 bg-black/20 border-stone-700 hover:text-stone-300'
                }`}
                title={soundEnabled ? 'Silenciar efectes de so' : 'Activar efectes de so'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-[#4a1a1e] bg-[#240a0c]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none" aria-label="Seccions principals">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#8b1e24] text-white shadow-xs font-semibold ring-1 ring-amber-400/50'
                      : item.highlight
                      ? 'bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 border border-amber-500/40 font-semibold'
                      : 'text-amber-100/70 hover:text-amber-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#f5d77f]' : item.highlight ? 'text-amber-300' : 'text-amber-300/70'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="hidden lg:inline text-[9px] bg-amber-500 text-neutral-950 font-bold px-1.5 py-0.2 rounded-full font-mono uppercase">
                      PDF
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
