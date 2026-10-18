import React, { useState } from 'react';
import { 
  ROMAN_BUILDINGS, 
  LATIN_EVOLUTIONS, 
  ROMAN_LAW_PRINCIPLES, 
  RomanBuilding 
} from '../data/romanizationData';
import { AsterixIllustration } from './AsterixIllustration';
import { 
  Compass, 
  Building2, 
  Languages, 
  Scale, 
  MapPin, 
  Info, 
  Check, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const RomanizationView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'edificis' | 'llati' | 'dret' | 'urbanisme'>('edificis');
  const [selectedBuilding, setSelectedBuilding] = useState<RomanBuilding>(ROMAN_BUILDINGS[0]);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-[#21090a] to-[#401215] p-6 rounded-2xl border border-[#9b722b] text-white shadow-md">
        <div className="flex items-center gap-2 text-[#f3cb69] mb-1">
          <Compass className="w-5 h-5" />
          <span className="text-xs uppercase font-mono tracking-widest font-bold">Patrimoni i Civilització</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide">
          La Romanització: L'Herència de Roma
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-3xl">
          El procés històric pel qual els pobles sotmesos (com els ibers a Catalunya i Hispània) van adoptar progressivament la llengua llatina, les lleis, les calçades, l'urbanisme i la manera de viure romana.
        </p>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setActiveSubTab('edificis')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'edificis'
                ? 'bg-[#d4af37] text-[#1c0809] shadow-sm font-bold'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Monuments i Edificis Romans</span>
          </button>

          <button
            onClick={() => setActiveSubTab('llati')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'llati'
                ? 'bg-[#d4af37] text-[#1c0809] shadow-sm font-bold'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>Del Llatí al Català</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dret')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'dret'
                ? 'bg-[#d4af37] text-[#1c0809] shadow-sm font-bold'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>El Dret Romà</span>
          </button>

          <button
            onClick={() => setActiveSubTab('urbanisme')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'urbanisme'
                ? 'bg-[#d4af37] text-[#1c0809] shadow-sm font-bold'
                : 'bg-white/10 hover:bg-white/20 text-amber-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>El Model de Ciutat Romana</span>
          </button>
        </div>
      </div>

      {/* Subtab 1: Edificis i Monuments */}
      {activeSubTab === 'edificis' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Building List (Left) */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#695547] block mb-2">
              Edificis imprescindibles:
            </span>
            {ROMAN_BUILDINGS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBuilding(b)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  selectedBuilding.id === b.id
                    ? 'bg-white border-[#7b1a20] shadow-sm ring-2 ring-[#7b1a20]/30 font-bold text-[#7b1a20]'
                    : 'bg-[#faf7f0] hover:bg-white border-[#dfd4c3] text-[#332721]'
                }`}
              >
                <div>
                  <div className="text-sm font-cinzel">{b.name}</div>
                  <div className="text-[11px] font-mono italic text-[#7a6657]">{b.latinName}</div>
                </div>
                <span className="text-xs px-2 py-0.5 bg-black/5 rounded text-[#5e4b3e]">
                  {b.category}
                </span>
              </button>
            ))}
          </div>

          {/* Building Detail (Right) */}
          <div className="md:col-span-8 bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#ebd7b8] pb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#8b1e24] uppercase tracking-wider">
                  {selectedBuilding.category}
                </span>
                <span className="text-xs font-serif italic text-[#786354]">
                  En llatí: {selectedBuilding.latinName}
                </span>
              </div>
              <h3 className="font-cinzel text-2xl font-black text-[#1c0809]">
                {selectedBuilding.name}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#47372f] leading-relaxed">
              {selectedBuilding.description}
            </p>

            {/* Asterix style illustration for Aqueduct or Urbanism */}
            {selectedBuilding.id === 'aqueducte' && (
              <div className="my-3">
                <AsterixIllustration
                  type="aqueduct_building"
                  caption="Els enginyers romans calculaven la inclinació de l'aqüeducte amb gran precisió!"
                  className="max-w-md mx-auto aspect-16/10"
                />
              </div>
            )}
            {selectedBuilding.id === 'calcada' && (
              <div className="my-3">
                <AsterixIllustration
                  type="legion_march"
                  caption="Les calçades romanes connectaven tot l'Imperi: Via Augusta cap a Tàrraco i Bàrcino"
                  className="max-w-md mx-auto aspect-16/10"
                />
              </div>
            )}

            {/* Architectural features */}
            <div className="bg-[#fbf9f4] p-5 rounded-xl border border-[#e5d9c7] space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-[#7b1a20] uppercase tracking-wider">
                Característiques arquitectòniques i d'ús:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#44352e]">
                {selectedBuilding.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Catalonia / Hispania Example */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#8b5e1b] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm text-[#614112] block">
                  Exemple destacat a Catalunya o Hispània:
                </strong>
                <span className="text-xs sm:text-sm text-[#422e11]">
                  {selectedBuilding.localExample}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Del Llatí al Català */}
      {activeSubTab === 'llati' && (
        <div className="bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <h3 className="font-cinzel text-xl font-bold text-[#7b1a20]">
              El Llatí: La Llengua Mare del Català
            </h3>
            <p className="text-xs sm:text-sm text-[#544339] mt-1.5 leading-relaxed">
              Els soldats, comerciants i funcionaris romans parlaven el <strong>llatí vulgar</strong> (el parlat pel carrer). Amb els segles, la seva evolució en contacte amb les poblacions locals va donar lloc a les <strong>llengües romàniques</strong> (com el català, l'occità, el castellà, el francès, l'italià, el portuguès i el romanès).
            </p>
          </div>

          {/* Interactive Word Evolution Table */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#695547] block">
              Comprova l'evolució d'aquestes paraules llatines:
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#240a0c] text-amber-100 font-cinzel">
                    <th className="p-3 rounded-tl-lg">Llatí clàssic</th>
                    <th className="p-3">Significat</th>
                    <th className="p-3 bg-[#7b1a20] text-white font-bold">Català</th>
                    <th className="p-3">Castellà</th>
                    <th className="p-3">Francès</th>
                    <th className="p-3 rounded-tr-lg">Italià</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ece2d2]">
                  {LATIN_EVOLUTIONS.map((item, idx) => (
                    <tr
                      key={item.latin}
                      onClick={() => setSelectedWordIndex(idx)}
                      className={`cursor-pointer transition-colors ${
                        selectedWordIndex === idx ? 'bg-amber-100/70 font-semibold' : 'hover:bg-[#faf7f1]'
                      }`}
                    >
                      <td className="p-3 font-mono font-bold text-[#7b1a20]">{item.latin}</td>
                      <td className="p-3 text-[#5e4c40]">{item.meaning}</td>
                      <td className="p-3 bg-amber-50/70 text-[#7b1a20] font-bold">{item.catala}</td>
                      <td className="p-3 text-[#44352d]">{item.castella}</td>
                      <td className="p-3 text-[#44352d]">{item.frances}</td>
                      <td className="p-3 text-[#44352d]">{item.italia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-[#f8f5ee] border border-[#e1d5c2] rounded-xl text-xs sm:text-sm text-[#4a3b32]">
            💡 <strong>Pensa-hi:</strong> Més del 80% de les paraules que fem servir cada dia en català provenen directament del llatí que van portar les legions romanes fa més de dos mil anys!
          </div>
        </div>
      )}

      {/* Subtab 3: El Dret Romà */}
      {activeSubTab === 'dret' && (
        <div className="bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-[#7b1a20]">
              El Dret Romà: Els Fonaments de la Nostra Justícia
            </h3>
            <p className="text-xs sm:text-sm text-[#544339] mt-1.5 leading-relaxed">
              Abans de Roma, la justícia era venjança privada o arbitri dels reis. Els romans van crear un sistema de lleis escrites, públiques i debatudes per jutges que van transformar el món per sempre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROMAN_LAW_PRINCIPLES.map((principle) => (
              <div
                key={principle.latinQuote}
                className="bg-[#faf6ee] border border-[#e0d3c0] rounded-xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="font-serif italic text-xs text-[#8b1e24] block mb-1">
                    "{principle.latinQuote}"
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#241c19]">
                    {principle.catalanTitle}
                  </h4>
                  <p className="text-xs text-[#524238] mt-2 leading-relaxed">
                    {principle.explanation}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ebdcc7] text-[11px] text-[#786354]">
                  <strong className="text-[#8b1e24]">Impacte actual: </strong>
                  {principle.modernImpact}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-[#4e3818]">
            ⚖️ <strong>Per a l'examen de 2n d'ESO:</strong> Recorda que el <strong>Dret Romà</strong> és considerat una de les contribucions més grans de Roma a la humanitat, juntament amb la llengua llatina i les grans obres d'enginyeria.
          </div>
        </div>
      )}

      {/* Subtab 4: El Model de Ciutat Romana */}
      {activeSubTab === 'urbanisme' && (
        <div className="bg-white border border-[#ded3be] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-cinzel text-xl font-bold text-[#7b1a20]">
              L'Urbanisme Romà: La Ciutat en Quadrícula
            </h3>
            <p className="text-xs sm:text-sm text-[#544339] mt-1.5 leading-relaxed">
              Totes les colònies i ciutats fundades pels romans seguien el patró racional dels seus campaments militars (<em>castrum</em>), amb dos carrers principals creuats en angle recte:
            </p>
          </div>

          {/* Castrum comic illustration */}
          <div className="my-3 max-w-md mx-auto">
            <AsterixIllustration
              type="roman_camp"
              caption="El famós campament romà fortificat (Castrum) amb palissada, torres i fossat com a Petibonum o Aquarium!"
              className="aspect-16/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#fbf9f4] border border-[#dfd4c1] p-5 rounded-xl space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-[#8b1e24]">Eix Nord - Sud</span>
              <h4 className="font-cinzel text-lg font-bold text-[#241c19]">Cardo Maximus</h4>
              <p className="text-xs sm:text-sm text-[#4e3f36] leading-relaxed">
                El carrer principal que travessava la ciutat de nord a sud. Connectava les portes principals de les muralles. A Bàrcino (Barcelona), coincideix aproximadament amb els actuals carrers del Bisbe i Ciutat!
              </p>
            </div>

            <div className="bg-[#fbf9f4] border border-[#dfd4c1] p-5 rounded-xl space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-[#8b1e24]">Eix Est - Oest</span>
              <h4 className="font-cinzel text-lg font-bold text-[#241c19]">Decumanus Maximus</h4>
              <p className="text-xs sm:text-sm text-[#4e3f36] leading-relaxed">
                El carrer principal d'est a oest. Al punt exacte on es creuava amb el Cardo se situava sempre el <strong>Fòrum</strong>, el centre neuràlgic de tota la vida política, judicial i religiosa.
              </p>
            </div>
          </div>

          {/* Infrastructure checklist */}
          <div className="bg-[#faf7f0] border border-[#e1d5c2] p-5 rounded-xl space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-[#7b1a20] uppercase tracking-wider">
              Serveis avançats de la ciutat romana:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#46372f]">
              <div className="p-3 bg-white border border-[#e0d4c2] rounded-lg">
                <strong className="block text-[#8b1e24] mb-0.5">Clavegueram</strong>
                Xarxa subterrània per drenar aigües brutes i evitar epidèmies (com la <em>Cloaca Maxima</em>).
              </div>
              <div className="p-3 bg-white border border-[#e0d4c2] rounded-lg">
                <strong className="block text-[#8b1e24] mb-0.5">Aigua corrent</strong>
                Fonts públiques gratuïtes a cada cantonada abastides pels aqüeductes.
              </div>
              <div className="p-3 bg-white border border-[#e0d4c2] rounded-lg">
                <strong className="block text-[#8b1e24] mb-0.5">Muralles fortificades</strong>
                Torres cilíndriques i portals monumentals de defensa i control duaner.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
