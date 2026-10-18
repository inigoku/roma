export interface Flashcard {
  id: string;
  topicId: number;
  topicTitle: string;
  front: string;
  back: string;
  hint?: string;
}

export const FLASHCARDS_DATA: Flashcard[] = [
  // Tema 1
  {
    id: 'fc-1',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    front: 'Data mítica de la fundació de Roma i qui van ser els fundadors segons la llegenda.',
    back: '753 aC. Els bessons Ròmul i Rem, fills del déu Mart i Rea Sílvia, alletats per la lloba Luperca.',
    hint: 'Recorda el segle VIII aC i la lloba.'
  },
  {
    id: 'fc-2',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    front: 'Quants reis va tenir Roma durant la Monarquia i de quines dues procedències eren?',
    back: '7 reis en total. Els 4 primers eren d’origen llatí i sabí; els 3 últims eren d’origen etrusc.',
    hint: '4 llatins-sabins + 3 etruscos.'
  },
  {
    id: 'fc-3',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    front: 'Diferència clau entre Patricis i Plebeus a la societat romana.',
    back: 'Patricis: aristòcrates rics, propietaris de terres i descendents dels fundadors amb plens drets polítics. Plebeus: poble lliure (pagesos, artesans) obligats a pagar impostos i anar a la guerra, però inicialment sense drets polítics.',
    hint: 'Noblesa rica vs. poble comú.'
  },
  {
    id: 'fc-4',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    front: 'Què va passar l’any 509 aC a Roma?',
    back: 'El poble es va rebel·lar contra la tirania del rei etrusc Tarquini el Superb, s’acaba la Monarquia i es proclama la República.',
    hint: 'Final d’una etapa i inici de la República.'
  },

  // Tema 2
  {
    id: 'fc-5',
    topicId: 2,
    topicTitle: 'La República',
    front: 'Quines eren les dues característiques principals de les magistratures republicanes per evitar tiranies?',
    back: 'Eren temporals (normalment duraven 1 any) i col·legiades (compartides per almenys 2 persones amb dret a veto mutu).',
    hint: 'Durada i nombre de membres.'
  },
  {
    id: 'fc-6',
    topicId: 2,
    topicTitle: 'La República',
    front: 'Què és el Cursus Honorum?',
    back: 'La carrera política reglada que els ciutadans romans havien de seguir en ordre: Qüestor → Edil → Pretor → Cònsol.',
    hint: 'L’escala d’ascens polític.'
  },
  {
    id: 'fc-7',
    topicId: 2,
    topicTitle: 'La República',
    front: 'Què era el Tribú de la Plebs i quin poder sagrat tenia?',
    back: 'Magistrat escollit pels plebeus, persona sagrada i inviolable. Tenia el poder de VETO ("M’hi oposo") per paralitzar qualsevol decisió patrícia que perjudiqués el poble.',
    hint: 'Defensor del poble amb poder d’aturar lleis.'
  },
  {
    id: 'fc-8',
    topicId: 2,
    topicTitle: 'La República',
    front: 'Quina importància va tenir la Llei de les XII Taules (450 aC)?',
    back: 'Va ser el primer recull de lleis escrites de Roma, exposat públicament en taules de bronze al Fòrum per garantir que la justícia s’apliqués a tothom per igual.',
    hint: 'Primer codi de lleis escrites públiques.'
  },

  // Tema 3
  {
    id: 'fc-9',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    front: 'Què vol dir l’expressió "Mare Nostrum"?',
    back: '"El nostre mar". Així anomenaven els romans el mar Mediterrani quan totes les seves costes van passar a formar part de les províncies romanes.',
    hint: 'Com deien al Mediterrani.'
  },
  {
    id: 'fc-10',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    front: 'Quina relació té l’any 218 aC amb la península Ibèrica?',
    back: 'Les legions romanes van desembarcar a Empúries (Girona) durant la Segona Guerra Púnica per tallar els subministraments a Anníbal, iniciant la conquesta d’Hispània.',
    hint: 'Arribada dels romans a Empúries.'
  },
  {
    id: 'fc-11',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    front: 'Quines armes i equipament caracteritzaven el legionari romà?',
    back: 'El Pilum (llança llancívola pesada), el Gladius (espasa curta d’estocada), el Scutum (gran escut rectangular corbat) i la Lorica (armadura).',
    hint: 'Llança, espasa curta i escut.'
  },

  // Tema 4
  {
    id: 'fc-12',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    front: 'Qui es va enfrontar a les Guerres Púniques i per què s’anomenen així?',
    back: 'Roma contra Cartago pel control del comerç al Mediterrani. S’anomenen "púniques" pel mot llatí "Poeni", que significa fenicis (els fundadors de Cartago).',
    hint: 'Roma vs Cartago.'
  },
  {
    id: 'fc-13',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    front: 'Quina gran gesta militar va realitzar el general cartaginès Anníbal Barca el 218 aC?',
    back: 'Va travessar els Pirineus i els Alps amb desenes de milers de soldats i elefants de guerra per sorprendre Roma al seu propi territori a Itàlia.',
    hint: 'Alps + elefants.'
  },
  {
    id: 'fc-14',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    front: 'Quina va ser la batalla definitiva de la Segona Guerra Púnica i qui en va ser el vencedor?',
    back: 'La batalla de Zama (202 aC, nord d’Àfrica). El general romà Publi Corneli Escipió ("l’Africà") va vèncer Anníbal.',
    hint: 'Zama, any 202 aC, Escipió.'
  },
  {
    id: 'fc-15',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    front: 'Com va acabar la Tercera Guerra Púnica l’any 146 aC?',
    back: 'Roma va assetjar i arrasar Cartago completament; va cremar la ciutat durant 17 dies i en va esclavitzar tota la població supervivent.',
    hint: 'Destrucció total el 146 aC.'
  },

  // Tema 5
  {
    id: 'fc-16',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    front: 'Per què les grans conquestes van provocar la ruïna dels camperols romans?',
    back: 'Els camperols passaven anys lluitant com a soldats; en tornar, les seves terres estaven abandonades i no podien competir amb els latifundis dels patricis que utilitzaven mà d’obra esclava gratuïta.',
    hint: 'Latifundis i mà d’obra esclava.'
  },
  {
    id: 'fc-17',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    front: 'Què pretenien els germans Tiberi i Gai Grac i què els va passar?',
    back: 'Com a Tribuns de la Plebs van proposar reformes agràries per repartir terres públiques als ciutadans pobres. El Senat aristocràtic es va oposar i tots dos van ser assassinats.',
    hint: 'Reforma agrària i oposició violenta del Senat.'
  },
  {
    id: 'fc-18',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    front: 'Qui va ser Espàrtac i quin fet històric va protagonitzar (73-71 aC)?',
    back: 'Un gladiador traci que va escapar de l’escola de Càpua i va liderar un exèrcit de més de 70.000 esclaus en rebel·lió oberta contra les legions romanes durant dos anys.',
    hint: 'La gran revolta d’esclaus.'
  },
  {
    id: 'fc-19',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    front: 'Com va canviar la fidelitat de l’exèrcit amb la reforma de Gai Mari?',
    back: 'Mari va crear un exèrcit professional a sou. Com que el general pagava el sou i concedia terres, els soldats es van fer fidels al seu general abans que a la República.',
    hint: 'Soldats fidels al general, no a Roma.'
  },

  // Tema 6
  {
    id: 'fc-20',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    front: 'Qui formava el Primer Triumvirat l’any 60 aC?',
    back: 'Gai Juli Cèsar, Gneu Pompeu Magne i Marc Licini Cras.',
    hint: 'Els tres homes més poderosos de Roma.'
  },
  {
    id: 'fc-21',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    front: 'On va aconseguir Cèsar la seva gran glòria militar entre el 58 i el 50 aC?',
    back: 'A la Guerra de les Gàl·lies, on va conquerir tot el territori de la França actual i va vèncer el cabdill gal Vercingetòrix al setge d’Alèsia (52 aC).',
    hint: 'La Gàl·lia i Alèsia.'
  },
  {
    id: 'fc-22',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    front: 'Què va significar el creuament del riu Rubicó l’any 49 aC i quina frase va dir Cèsar?',
    back: 'Va creuar el límit d’Itàlia amb les seves armes desafiant el Senat i iniciant la Guerra Civil. Va pronunciar: "Alea iacta est" (La sort està tirada).',
    hint: 'Alea iacta est.'
  },
  {
    id: 'fc-23',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    front: 'Què va passar els Idus de Març (15 de març del 44 aC)?',
    back: 'Un grup de més de 60 senadors republicans encapçalats per Marc Juni Brut i Cassi van assassinar Juli Cèsar al Senat clavant-li 23 punyalades per por que es coronés rei.',
    hint: 'Assassinat de Cèsar al Senat.'
  },

  // Tema 7
  {
    id: 'fc-24',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    front: 'Qui va ser el primer emperador de Roma i en quin any va començar el seu imperi?',
    back: 'Octavi August, l’any 27 aC. Va concentrar tots els poders militars, civils i religiosos mantenint en aparença les institucions del Senat.',
    hint: 'August, any 27 aC.'
  },
  {
    id: 'fc-25',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    front: 'Què va ser la Pax Romana (segles I i II dC)?',
    back: 'Una llarga època de pau interior, estabilitat política, seguretat als camins i màxim creixement econòmic i comercial a tot l’Imperi.',
    hint: 'Dos segles d’esplendor i pau interior.'
  },
  {
    id: 'fc-26',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    front: 'Quins són els quatre pilars fonamentals de la Romanització?',
    back: '1) La llengua llatina. 2) El Dret Romà. 3) L’urbanisme (ciutats amb fòrum, termes, teatres, clavegueres). 4) La xarxa de calçades i el comerç.',
    hint: 'Llatí, lleis, ciutats i calçades.'
  },
  {
    id: 'fc-27',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    front: 'Què va causar la gran crisi del segle III dC a l’Imperi Romà?',
    back: '1) Inestabilitat política: més de 25 emperadors assassinats per les legions (anarquia militar). 2) Atacs i invasions dels pobles bàrbars (germànics i perses) al limes. 3) Crisi econòmica, inflació i despoblament de les ciutats.',
    hint: 'Invasions + emperadors assassinats + crisi econòmica.'
  },

  // Tema 8
  {
    id: 'fc-28',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    front: 'Quins són els 3 conreus que formen la "Trilogia Mediterrània" romana?',
    back: 'Blat (per al pa diari), Oliva (oli per cuinar, conservar i enllumenar llànties) i Vinya (vi consumit per totes les classes socials).',
    hint: 'Blat, olivera i vinya.'
  },
  {
    id: 'fc-29',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    front: 'Quines eren les tres formes principals d’explotació dels territoris conquerits per Roma?',
    back: '1) Captura d’esclaus (mà d’obra gratuïta per a mines i camps). 2) Cobrament d’impostos i tributs anuals. 3) Confiscació de terres fèrtils i riqueses (ager publicus).',
    hint: 'Esclaus, impostos i confiscació de terres.'
  },
  {
    id: 'fc-30',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    front: 'Per què les autoritats romanes van perseguir inicialment els cristians?',
    back: 'Perquè els cristians eren monoteistes i es negaven categòricament a retre culte als déus pagans de l’Estat i a adorar l’emperador com un déu viu, cosa que es considerava traïció política.',
    hint: 'Negativa a adorar l’emperador com a déu.'
  },
  {
    id: 'fc-31',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    front: 'Què va establir l’Edicte de Milà (313 dC) i quin emperador el va promulgar?',
    back: 'L’emperador Constantí el Gran va proclamar la llibertat religiosa a tot l’Imperi, aturant les persecucions i legalitzant el cristianisme.',
    hint: 'Constantí, llibertat religiosa l’any 313 dC.'
  },
  {
    id: 'fc-32',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    front: 'Quin emperador i quin any va convertir el cristianisme en l’ÚNICA religió oficial de tot l’Imperi Romà?',
    back: 'L’emperador Teodosi el Gran, l’any 380 dC mitjançant l’Edicte de Tessalònica.',
    hint: 'Teodosi, any 380 dC.'
  },

  // Tema 9
  {
    id: 'fc-33',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    front: 'Quina reacció en cadena va provocar la fi de les grans conquestes territorials de Roma?',
    back: 'Fi de les conquestes → Manca d’arribada d’esclaus → Fort descens de la producció agrícola i minera → Tall de rutes comercials, fallida dels mercaders i despoblament de les ciutats.',
    hint: 'Manca d’esclaus i caiguda de la producció.'
  },
  {
    id: 'fc-34',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    front: 'Quan i com va dividir l’emperador Teodosi l’Imperi Romà?',
    back: 'L’any 395 dC, Teodosi va dividir l’Imperi entre els seus dos fills: Honori (Imperi d’Occident, capital Roma) i Arcadi (Imperi d’Orient, capital Constantinoble).',
    hint: 'Any 395 dC, Honori (Occident) i Arcadi (Orient).'
  },
  {
    id: 'fc-35',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    front: 'Quins pobles germànics van envair Hispània l’any 409 dC i quin rei visigot va saquejar Roma el 410 dC?',
    back: 'A Hispània van entrar els vàndals, alans i sueus (409 dC). A Roma, el rei visigot Alaric I va assaltar i saquejar la ciutat durant 3 dies (410 dC).',
    hint: 'Vàndals, alans, sueus i el rei visigot Alaric.'
  },
  {
    id: 'fc-36',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    front: 'Què va passar l’any 476 dC i per què és una data cabdal de la història universal?',
    back: 'El cabdill bàrbar Odoacre va deposar l’últim emperador d’Occident, Ròmul Augústul. Aquest fet marca la FI DE L’IMPERI ROMÀ D’OCCIDENT, la FI DE L’EDAT ANTIGA i el començament de L’EDAT MITJANA.',
    hint: 'Any 476 dC: Odoacre deposa Ròmul Augústul (Inici Edat Mitjana).'
  }
];
