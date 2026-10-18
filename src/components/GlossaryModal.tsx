import React, { useState } from 'react';
import { X, Search, BookOpen } from 'lucide-react';

interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
}

const GLOSSARY_ITEMS: GlossaryItem[] = [
  { term: 'Patrici', category: 'Societat', definition: 'Membre de l’aristocràcia terratinent descendent dels primers pobladors de Roma, amb plens drets polítics.' },
  { term: 'Plebeu', category: 'Societat', definition: 'Ciutadà lliure pertanyent al poble comú (pagesos, comerciants, artesans) que inicialment no tenia poder polític.' },
  { term: 'SPQR', category: 'Política', definition: '"Senatus Populusque Romanus" (El Senat i el Poble Romà), lema oficial de la República i l’Estat romà.' },
  { term: 'Cursus Honorum', category: 'Política', definition: 'La carrera política reglada que els magistrats havien de recórrer pas a pas: Qüestor → Edil → Pretor → Cònsol.' },
  { term: 'Cònsol', category: 'Magistratura', definition: 'Els dos magistrats suprems anuals de la República que dirigien el govern i comandaven les legions en combat.' },
  { term: 'Tribú de la Plebs', category: 'Magistratura', definition: 'Magistrat sagrat i inviolable elegit pels plebeus per defensar-los dels abusos amb el poder de veto.' },
  { term: 'Veto', category: 'Dret', definition: 'Paraula llatina que significa "m’hi oposo" o "ho prohibeixo". Aturava qualsevol llei o decisió al Senat.' },
  { term: 'Llei de les XII Taules', category: 'Dret', definition: 'Primer recull de lleis escrites de Roma (450 aC), gravat en bronze i situat al Fòrum per a tothom.' },
  { term: 'Mare Nostrum', category: 'Geografia', definition: 'Nom llatí ("El nostre mar") amb què els romans anomenaven el Mediterrani en dominar totes les seves costes.' },
  { term: 'Guerres Púniques', category: 'Militar', definition: 'Les tres grans guerres entre Roma i Cartago (264 - 146 aC) pel control absolut del comerç marítim.' },
  { term: 'Corvus (Corb)', category: 'Militar', definition: 'Pont d’abordatge proveït d’una punxa de ferro que permetia als soldats romans lluitar sobre els vaixells enemics.' },
  { term: 'Latifundi', category: 'Economia', definition: 'Gran explotació agrària en mans d’aristòcrates rics treballada fonamentalment per mà d’obra esclava.' },
  { term: 'Reforma Agrària', category: 'Social', definition: 'Intent dels germans Grac de limitar la terra en mans dels rics i repartir parcel·les als ciutadans sense recursos.' },
  { term: 'Triumvirat', category: 'Política', definition: 'Govern o aliança de tres líders polítics per controlar l’Estat romà (Primer: Cèsar, Pompeu i Cras).' },
  { term: 'Alea iacta est', category: 'Història', definition: '"La sort està tirada", frase de Juli Cèsar en creuar el riu Rubicó desafiant el Senat el 49 aC.' },
  { term: 'Idus de Març', category: 'Història', definition: 'El 15 de març del 44 aC, dia en què un grup de senadors va assassinar Juli Cèsar clavant-li 23 punyalades.' },
  { term: 'Pax Romana', category: 'Imperi', definition: 'Llarg període de pau interior, estabilitat i prosperitat que va viure l’Imperi Romà durant els segles I i II dC.' },
  { term: 'Romanització', category: 'Cultura', definition: 'Procés d’adopció de la llengua llatina, les lleis, l’urbanisme i els costums romans pels pobles conquerits.' },
  { term: 'Limes', category: 'Militar', definition: 'Frontera fortificada de l’Imperi (als rius Rin, Danubi o la Muralla d’Hadrià) custodiada per legions.' },
  { term: 'Via Augusta', category: 'Urbanisme', definition: 'La gran calçada romana de més de 1.500 km que recorria la costa mediterrània des dels Pirineus fins a Cadis.' }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tots');

  if (!isOpen) return null;

  const categories = ['Tots', 'Política', 'Societat', 'Militar', 'Dret', 'Urbanisme', 'Cultura'];

  const filtered = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tots' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xl bg-[#fbf9f4] border-2 border-[#cbbfa8] shadow-2xl text-[#241c19]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e2d8c3] px-6 py-4 bg-[#7b1a20] text-amber-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="font-cinzel text-lg font-bold tracking-wider">Glossari de la Roma Antiga</h2>
              <p className="text-xs text-amber-200/80">Termes i conceptes clau per a 2n d'ESO</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Tancar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & filters */}
        <div className="p-4 border-b border-[#e8dfcf] bg-[#f5f0e4] space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8a7a68]" />
            <input
              type="text"
              placeholder="Cerca un concepte, personatge o definició..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#cbbfa8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b1a20]/40 text-[#241c19] placeholder:text-[#9c8e7e]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#7b1a20] text-white shadow-xs'
                    : 'bg-white/80 text-[#5c4a3e] border border-[#dcd3c2] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-[#ece3d4] space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-[#8a7a68]">
              Cap terme coincideix amb "{searchTerm}"
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.term} className="pt-3 first:pt-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-cinzel text-base font-bold text-[#7b1a20]">{item.term}</h3>
                  <span className="text-xs font-mono uppercase text-[#735e50]">{item.category}</span>
                </div>
                <p className="text-sm text-[#453730] leading-relaxed">{item.definition}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2d8c3] px-6 py-3 bg-[#ede6d8] flex justify-between items-center text-xs text-[#735e50] rounded-b-xl">
          <span>{filtered.length} termes disponibles</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#7b1a20] hover:bg-[#621318] text-white font-medium rounded-md transition-colors"
          >
            Entesos!
          </button>
        </div>
      </div>
    </div>
  );
};
