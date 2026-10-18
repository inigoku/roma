import React, { useState } from 'react';
import { TIMELINE_EVENTS, TimelineEvent } from '../data/timelineData';
import { AsterixIllustration, AsterixIllustrationType } from './AsterixIllustration';
import { Clock, Calendar, CheckCircle2, ChevronDown, ChevronUp, Filter, Sparkles } from 'lucide-react';

export const TimelineView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'Tots' | 'Monarquia' | 'República' | 'Imperi'>('Tots');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredEvents = TIMELINE_EVENTS.filter((e) => {
    if (selectedPeriod === 'Tots') return true;
    return e.period === selectedPeriod;
  });

  const periodSummaries = {
    Monarquia: '753 aC – 509 aC (~244 anys): Govern de 7 reis (llatins i etruscs), fundació mítica i naixement del Senat.',
    República: '509 aC – 27 aC (~482 anys): Govern SPQR, magistratures anuals, conquestes del Mare Nostrum, Guerres Púniques, Cèsar i crisi social.',
    Imperi: '27 aC – 476 dC a Occident: Emperadors amb poder absolut, Pax Romana, romanització i crisi del segle III.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#2a0c0e] to-[#451216] p-6 rounded-2xl border border-[#9b722b] text-white shadow-md">
        <div className="flex items-center gap-2 text-[#f3cb69] mb-1">
          <Clock className="w-5 h-5" />
          <span className="text-xs uppercase font-mono tracking-widest font-bold">Eix Cronològic Romà</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide">
          Línia del Temps: De la Fundació a la Crisi de l'Imperi
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl">
          Visualitza l'ordre cronològic dels fets més decisius que apareixen als exàmens de 2n d'ESO.
        </p>

        {/* Period Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {(['Tots', 'Monarquia', 'República', 'Imperi'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === period
                  ? 'bg-[#d4af37] text-[#1c0809] shadow-sm font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-amber-100'
              }`}
            >
              {period === 'Tots' ? 'Tota la Història' : period}
            </button>
          ))}
        </div>
      </div>

      {/* Overview bar of the three great periods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 bg-[#fbf8f0] border border-[#e8d7bb] rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-cinzel font-bold text-sm text-[#7b1a20]">I. Monarquia</span>
            <span className="font-mono text-[#876a52]">753 – 509 aC</span>
          </div>
          <p className="text-[#59473c] leading-relaxed">
            Ròmul, els 7 reis, primers temples i pas del poblat a ciutat emmurallada.
          </p>
        </div>

        <div className="p-4 bg-[#fbf8f0] border border-[#e8d7bb] rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-cinzel font-bold text-sm text-[#7b1a20]">II. República</span>
            <span className="font-mono text-[#876a52]">509 – 27 aC</span>
          </div>
          <p className="text-[#59473c] leading-relaxed">
            Senat i cònsols, lluita patricis vs plebeus, Anníbal, conquestes i Juli Cèsar.
          </p>
        </div>

        <div className="p-4 bg-[#fbf8f0] border border-[#e8d7bb] rounded-xl text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-cinzel font-bold text-sm text-[#7b1a20]">III. Imperi Romà</span>
            <span className="font-mono text-[#876a52]">27 aC endavant</span>
          </div>
          <p className="text-[#59473c] leading-relaxed">
            Octavi August, Pax Romana, gran romanització de les províncies i crisi del s. III.
          </p>
        </div>
      </div>

      {/* Timeline items list */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#b88c32] space-y-6 ml-3 sm:ml-4 py-2">
        {filteredEvents.map((ev, idx) => {
          const isExpanded = expandedIndex === idx;
          const isKey = ev.importance === 'clau';

          return (
            <div key={idx} className="relative group">
              {/* Timeline marker on the line */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isKey
                    ? 'bg-[#8b1e24] border-[#d4af37] text-white shadow-xs'
                    : 'bg-white border-[#b88c32] text-[#8b1e24]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isKey ? 'bg-[#d4af37]' : 'bg-[#8b1e24]'}`} />
              </div>

              {/* Event card */}
              <div className="bg-white border border-[#ded3be] hover:border-[#b88c32] rounded-xl p-4 sm:p-5 shadow-xs transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs sm:text-sm text-[#8b1e24] px-2 py-0.5 bg-[#fbf5e8] border border-[#ecd9bb] rounded-md">
                      {ev.year}
                    </span>
                    <span className="text-[11px] font-semibold uppercase text-[#7a6453]">
                      · {ev.period}
                    </span>
                    {isKey && (
                      <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-sm">
                        Fet Clau
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#8f7d6e] font-mono bg-stone-100 px-2 py-0.5 rounded">
                    {ev.tag}
                  </span>
                </div>

                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#1f1715]">
                  {ev.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4d3d34] mt-1.5 leading-relaxed">
                  {ev.description}
                </p>

                {/* Comic vignette for key events */}
                {ev.numericYear === -753 && (
                  <div className="mt-3 max-w-sm">
                    <AsterixIllustration type="romulus_remus" caption="La fundació mítica al Palatí" className="aspect-16/10" />
                  </div>
                )}
                {ev.numericYear === -218 && (
                  <div className="mt-3 max-w-sm">
                    <AsterixIllustration type="hannibal_elephant" caption="Anníbal i els elefants als Alps" className="aspect-16/10" />
                  </div>
                )}
                {ev.numericYear === -49 && (
                  <div className="mt-3 max-w-sm">
                    <AsterixIllustration type="caesar_rubicon" caption="Alea iacta est: Cèsar desafiant el Senat" className="aspect-16/10" />
                  </div>
                )}
                {ev.numericYear === -27 && (
                  <div className="mt-3 max-w-sm">
                    <AsterixIllustration type="augustus_pax" caption="Octavi August i la Pax Romana" className="aspect-16/10" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
