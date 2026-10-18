import React from 'react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { ROMAN_RANKS, getRankForXp } from '../utils/ranks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  xp: number;
}

export const RanksModal: React.FC<Props> = ({ isOpen, onClose, xp }) => {
  if (!isOpen) return null;

  const currentRank = getRankForXp(xp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-xl bg-[#fbf8f2] border-2 border-[#b88c32] shadow-2xl text-[#241c19]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e2d8c3] px-6 py-4 bg-[#7b1a20] text-amber-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="font-cinzel text-lg font-bold tracking-wider">Els Rangs Militars i Cívics Romans</h2>
              <p className="text-xs text-amber-200/80">Guanya punts d'experiència (XP) responent preguntes i superant reptes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status highlight */}
        <div className="bg-[#ede4d2] px-6 py-3 border-b border-[#ddcfb9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentRank.badge}</span>
            <div>
              <span className="text-xs text-[#6e5849] uppercase font-bold tracking-wider">El teu rang actual:</span>
              <h3 className="font-cinzel text-base font-bold text-[#7b1a20]">{currentRank.name}</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#6e5849]">Puntuació total</span>
            <div className="text-base font-bold font-mono text-[#7b1a20]">{xp} XP</div>
          </div>
        </div>

        {/* Ranks list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {ROMAN_RANKS.map((rank) => {
            const isUnlocked = xp >= rank.minXp;
            const isCurrent = currentRank.name === rank.name;

            return (
              <div
                key={rank.name}
                className={`p-3.5 rounded-lg border transition-colors flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-amber-100/70 border-[#b88c32] ring-2 ring-[#b88c32]/40 shadow-xs'
                    : isUnlocked
                    ? 'bg-white/80 border-[#d9ccb6]'
                    : 'bg-stone-100/60 border-stone-200 opacity-60'
                }`}
              >
                <div className="text-2xl pt-0.5 select-none">{rank.badge}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-sm font-bold text-[#241c19]">{rank.name}</h4>
                      <span className="text-xs italic text-[#735e50]">({rank.latinName})</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#8b1e24]">
                      {rank.minXp} XP
                    </span>
                  </div>
                  <p className="text-xs text-[#52443c] mt-0.5">{rank.description}</p>
                </div>
                <div className="pt-1">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-stone-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2d8c3] px-6 py-3 bg-[#ede6d8] flex justify-end rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#7b1a20] hover:bg-[#621318] text-white font-medium rounded-md transition-colors text-xs"
          >
            Tancar
          </button>
        </div>
      </div>
    </div>
  );
};
