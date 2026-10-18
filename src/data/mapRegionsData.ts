export type ExpansionPhaseId =
  | 'monarquia'
  | 'republica_primerenca'
  | 'guerres_puniques'
  | 'cesar_tardo_republica'
  | 'alt_imperi';

export interface ExpansionPhase {
  id: ExpansionPhaseId;
  name: string;
  chronology: string;
  shortDesc: string;
  color: string;
  highlightRegions: string[];
}

export interface MapRegion {
  id: string;
  name: string;
  latinName: string;
  modernCountries: string;
  phaseId: ExpansionPhaseId;
  conquestPeriod: string;
  conquestCentury: string;
  keyFigures: string;
  keyBattles: string[];
  conquestStory: string;
  romanizationLevel: 'Molt alta' | 'Alta' | 'Mitjana (Món hel·lènic)' | 'Fronterera (Limes militar)';
  romanizationDetails: string;
  mainCities: { latinName: string; modernName: string; role: string }[];
  keyMonuments: string[];
  cataloniaConnection?: string;
  economicValue: string;
  color: string;
  badgeCoord: { x: number; y: number };
  svgPath: string;
}

export interface MapQuizQuestion {
  id: number;
  question: string;
  targetRegionId: string;
  hint: string;
  explanation: string;
}

export const EXPANSION_PHASES: ExpansionPhase[] = [
  {
    id: 'monarquia',
    name: '1. Orígens i Laci',
    chronology: '753 aC – 509 aC',
    shortDesc: 'Fundació de Roma als 7 turons del Tíber i primeres aliances amb les tribus llatines i sabines veïnes.',
    color: '#e11d48',
    highlightRegions: ['italia_central']
  },
  {
    id: 'republica_primerenca',
    name: "2. Conquesta d'Itàlia",
    chronology: '509 aC – 264 aC',
    shortDesc: "La República unifica la península Itàlica sotmetent etruscs al nord, samnites al centre i les polis gregues al sud.",
    color: '#ea580c',
    highlightRegions: ['italia_central', 'italia_nord', 'magna_grecia']
  },
  {
    id: 'guerres_puniques',
    name: '3. Guerres Púniques i Mediterrani',
    chronology: '264 aC – 146 aC',
    shortDesc: "Triomf contra Cartago (218 aC: desembarcament a Empúries), annexió d'Hispània, Sicília, Còrsega, Sardenya, Macedònia i Àfrica.",
    color: '#ca8a04',
    highlightRegions: ['italia_central', 'italia_nord', 'magna_grecia', 'hispania', 'africa_proconsular', 'grecia_macedonia', 'illes_mediterranies']
  },
  {
    id: 'cesar_tardo_republica',
    name: '4. Gàl·lia i Final de la República',
    chronology: '146 aC – 27 aC',
    shortDesc: "Juli Cèsar conquereix tota la Gàl·lia (Alèsia, 52 aC). Pompeu annexa Síria i Àsia Menor. Octavi incorpora Egipte rere la batalla d'Àccium.",
    color: '#16a34a',
    highlightRegions: [
      'italia_central', 'italia_nord', 'magna_grecia', 'hispania', 'africa_proconsular',
      'grecia_macedonia', 'illes_mediterranies', 'gallia', 'asia_menor', 'siria_orient', 'egipte'
    ]
  },
  {
    id: 'alt_imperi',
    name: "5. L'Imperi i Màxima Expansió",
    chronology: '27 aC – 117 dC',
    shortDesc: "Claudi conquereix Britànnia. August pacificà Hispània i fixa el Limes al Rin i Danubi. Trajà assoleix la màxima extensió incorporant Dàcia.",
    color: '#7c3aed',
    highlightRegions: [
      'italia_central', 'italia_nord', 'magna_grecia', 'hispania', 'africa_proconsular',
      'grecia_macedonia', 'illes_mediterranies', 'gallia', 'asia_menor', 'siria_orient',
      'egipte', 'britannia', 'dacia', 'limes_germania'
    ]
  }
];

export const MAP_REGIONS: MapRegion[] = [
  {
    id: 'italia_central',
    name: 'Itàlia Central (Laci i Roma)',
    latinName: 'Latium et Regio I',
    modernCountries: 'Itàlia (Roma, Laci, Campània, Etrúria)',
    phaseId: 'monarquia',
    conquestPeriod: '753 aC – 272 aC',
    conquestCentury: 'Segles VIII a III aC',
    keyFigures: 'Ròmul, Servius Tul·li, Camil·le (conqueridor de Veïs)',
    keyBattles: ['Presa de Veïs (396 aC)', 'Guerres Samnites (343 – 290 aC)', 'Batalla del Llac Regil·le (496 aC)'],
    conquestStory: "Bressol de la civilització romana. Després d'alliberar-se de la dominació etrusca (509 aC), la jove República va vèncer la Lliga Llatina i va resistir la invasió dels gals de Brennus (390 aC). A través de les dures Guerres Samnites a les muntanyes dels Apenins, Roma es va fer mestra de tot el centre peninsular.",
    romanizationLevel: 'Molt alta',
    romanizationDetails: "Centre neuràlgic de l'Imperi. Des d'aquí es va irradiar el llatí, el Senat, les dotze Taules de la Llei i el culte als déus capitolins. Totes les grans calçades com la Via Àpia (312 aC) partien del Fòrum de Roma.",
    mainCities: [
      { latinName: 'Roma', modernName: 'Roma', role: 'Cap de tot l’Imperi (Caput Mundi), residència del Senat i dels emperadors.' },
      { latinName: 'Ostia Antica', modernName: 'Òstia', role: 'Principal port marítim i comercial de Roma a la desembocadura del Tíber.' },
      { latinName: 'Capua', modernName: 'Càpua', role: 'Ciutat rica de Campània, seu de les escoles de gladiadors d’on va sorgir la revolta d’Espàrtac.' }
    ],
    keyMonuments: ['Coliseu (Amfiteatre Flavi)', 'Panteó d’Agripa', 'Fòrum Romà i Cúria del Senat', 'Circ Màxim', 'Via Àpia'],
    cataloniaConnection: "D'aquesta regió van salpar els primers colons, legions i magistrats que van poblar Tàrraco, Bàrcino i Emporiae.",
    economicValue: 'Centre polític, tresor públic i importació de recursos de totes les províncies del Mare Nostrum.',
    color: '#b91c1c',
    badgeCoord: { x: 502, y: 310 },
    svgPath: 'M 488 285 L 508 275 L 522 300 L 528 335 L 512 342 L 495 320 Z'
  },
  {
    id: 'italia_nord',
    name: 'Gàl·lia Cisalpina (Nord d’Itàlia)',
    latinName: 'Gallia Cisalpina',
    modernCountries: 'Nord d’Itàlia (Lombardia, Vèneto, Emília-Romanya, Piemont)',
    phaseId: 'republica_primerenca',
    conquestPeriod: '222 aC – 190 aC',
    conquestCentury: 'Segle III a II aC',
    keyFigures: 'Gai Flamini, Marcel·le, Escipió',
    keyBattles: ['Batalla de Clastídium (222 aC)', 'Batalla de Cremona (200 aC)'],
    conquestStory: "Territori ocupat per tribus gal·les (ínsubres i bois) a la fèrtil vall del riu Po. Conquistada per protegir Roma d'invasions cèltiques i connectar Itàlia amb l'Europa central. Va ser clau durant la invasió d'Anníbal.",
    romanizationLevel: 'Molt alta',
    romanizationDetails: "La via Emília (187 aC) va vertebrar la regió. Els seus habitants van rebre la ciutadania romana completa amb Juli Cèsar (49 aC). Va ser bressol de grans poetes llatins com Virgili i Catul.",
    mainCities: [
      { latinName: 'Mediolanum', modernName: 'Milà', role: 'Gran nucli artesanal i posteriorment capital de l’Imperi d’Occident.' },
      { latinName: 'Ravenna', modernName: 'Ravenna', role: 'Base de la flota de l’Adriàtic i refugi d’emperadors.' },
      { latinName: 'Verona', modernName: 'Verona', role: 'Important nus viari amb un amfiteatre (Arena) perfectament conservat.' }
    ],
    keyMonuments: ['Arena de Verona', 'Porta Borsari de Verona', 'Via Emília'],
    economicValue: 'Gran producció agrícola de cereals, vinya, fusta dels Alps i bestiar porcí.',
    color: '#c2410c',
    badgeCoord: { x: 472, y: 245 },
    svgPath: 'M 445 235 L 485 228 L 515 240 L 508 275 L 488 285 L 450 265 Z'
  },
  {
    id: 'magna_grecia',
    name: 'Magna Grècia i Sud d’Itàlia',
    latinName: 'Magna Graecia et Apulia',
    modernCountries: 'Sud d’Itàlia (Calàbria, Pulla, Basilicata)',
    phaseId: 'republica_primerenca',
    conquestPeriod: '280 aC – 272 aC',
    conquestCentury: 'Segle III aC',
    keyFigures: 'Pirros de l’Epir, Marc Valeri Leví',
    keyBattles: ['Batalla d’Heraclea (280 aC - "Victòria pírrica")', 'Batalla de Benevent (275 aC)', 'Rendició de Tàrent (272 aC)'],
    conquestStory: "Poblada per riques polis gregues. Tàrent va demanar auxili al rei Pirros de l’Epir, que va portar elefants de combat a Itàlia. Tot i patir grans derrotes inicials, la perseverança romana va fer foragitar Pirros i conquerir tot el sud d’Itàlia l’any 272 aC.",
    romanizationLevel: 'Alta',
    romanizationDetails: "Va ser el primer gran pont de contacte entre Roma i la cultura hel·lènica refinada: art, teatre, filosofia i l'ús de la moneda grega. El poeta Horaci va immortalitzar la frase sobre aquesta trobada cultural.",
    mainCities: [
      { latinName: 'Tarentum', modernName: 'Tàrent', role: 'Polis grega refinada i port clau cap a Grècia i l’Orient.' },
      { latinName: 'Brundisium', modernName: 'Bríndisi', role: 'Terminus de la Via Àpia i principal moll d’embarcament cap a Grècia.' },
      { latinName: 'Neapolis', modernName: 'Nàpols', role: 'Important ciutat de cultura grecollatina i bressol intel·lectual.' }
    ],
    keyMonuments: ['Temples grecs de Paestum', 'Fi de la Via Àpia a Bríndisi', 'Teatre romà de Nàpols'],
    economicValue: 'Oli d’oliva d’alta qualitat, ceràmica de luxe i port d’escala del comerç hel·lènic.',
    color: '#d97706',
    badgeCoord: { x: 540, y: 345 },
    svgPath: 'M 522 300 L 555 315 L 575 345 L 545 375 L 528 335 Z'
  },
  {
    id: 'hispania',
    name: 'Hispània (Península Ibèrica)',
    latinName: 'Hispania (Tarraconensis, Baetica, Lusitania)',
    modernCountries: 'Espanya, Catalunya i Portugal',
    phaseId: 'guerres_puniques',
    conquestPeriod: '218 aC – 19 aC',
    conquestCentury: 'Segles III a I aC (més de 200 anys de lluites!)',
    keyFigures: 'Gneu i Publi Corneli Escipió, Escipió l’Africà, Cató el Vell, Viriat, Escipió Emilià, August',
    keyBattles: [
      'Desembarcament a Empúries (218 aC)',
      'Presa de Cartago Nova (209 aC)',
      'Setge de Numància (133 aC)',
      'Guerres Càntabres i Asturs (29 – 19 aC)'
    ],
    conquestStory: "Iniciada el 218 aC a Empúries durant la Segona Guerra Púnica per tallar els subministraments a Anníbal. La conquesta de l'interior peninsular va topar amb una ferotge resistència dels ibers i celtibers (guerrilles de Viriat i heroisme de Numància). Finalment, el primer emperador Octavi August va concloure la pacificació total de càntabres i asturs l'any 19 aC.",
    romanizationLevel: 'Molt alta',
    romanizationDetails: "Una de les províncies més intensament romanitzades del món antic. Hispània va adoptar la llengua llatina, el dret romà i va aportar personatges cabdals: els emperadors Trajà i Hadrià (nascuts a Itàlica), i filòsofs com Sèneca i Quintilià.",
    mainCities: [
      { latinName: 'Tarraco', modernName: 'Tarragona', role: 'Capital de la província Tarraconense, residència d’August (26-25 aC) i gran fòrum colonial.' },
      { latinName: 'Barcino', modernName: 'Barcelona', role: 'Colònia fundada per August (Colonia Iulia Augusta Faventia Paterna Barcino).' },
      { latinName: 'Emporiae', modernName: 'Empúries', role: 'Port d’arribada de les legions romanes el 218 aC a la Costa Brava.' },
      { latinName: 'Emerita Augusta', modernName: 'Mèrida', role: 'Capital de Lusitània fundada per als legionaris veterans (emèrits).' },
      { latinName: 'Corduba', modernName: 'Còrdova', role: 'Capital de la Bètica i seu dels filòsofs Sèneca.' }
    ],
    keyMonuments: [
      'Aqüeducte de les Ferreres o Pont del Diable (Tarragona)',
      'Amfiteatre i Circ de Tàrraco',
      'Aqüeducte de Segòvia',
      'Teatre i Amfiteatre de Mèrida',
      'Muralles romanes de Barcelona i de Lugo',
      'Pont d’Alcántara'
    ],
    cataloniaConnection: "Punt d'entrada històric de Roma a la Península (Empúries, 218 aC). Tarragona (Tàrraco) va esdevenir una de les capitals més esplendoroses de l'Imperi, i Barcelona (Bàrcino) conserva part del traçat del Cardo i Decumanus, el temple d'August i les muralles.",
    economicValue: 'Mines d’or (Las Médulas), plata (Cartagena), coure, blat de la vall de l’Ebre, vi de la Tarraconense i oli d’oliva de la Bètica enviat en àmfores a Roma.',
    color: '#e11d48',
    badgeCoord: { x: 260, y: 310 },
    svgPath: 'M 210 270 L 320 275 L 340 330 L 290 380 L 220 375 L 185 340 L 195 285 Z'
  },
  {
    id: 'illes_mediterranies',
    name: 'Sicília, Sardenya i Còrsega',
    latinName: 'Sicilia, Sardinia et Corsica',
    modernCountries: 'Itàlia (Sicília, Sardenya) i França (Còrsega)',
    phaseId: 'guerres_puniques',
    conquestPeriod: '241 aC – 227 aC',
    conquestCentury: 'Segle III aC (Primera Guerra Púnica)',
    keyFigures: 'Lutaci Càtul, Marcel·le, Arquimedes (defensor de Siracusa)',
    keyBattles: ['Batalla de les Illes Ègates (241 aC)', 'Setge de Siracusa (214 – 212 aC)'],
    conquestStory: "Sicília va ser la primera província romana de la història, cedida per Cartago després de la Primera Guerra Púnica (241 aC). Poc després, Roma va aprofitar la revolta dels mercenaris cartaginesos per ocupar Sardenya i Còrsega (238 aC).",
    romanizationLevel: 'Alta',
    romanizationDetails: "Sicília va conservar un fort substrat cultural grec combinat amb la llei romana. Sardenya va ser clau per la ramaderia i les mines de plom i plata.",
    mainCities: [
      { latinName: 'Syracusae', modernName: 'Siracusa', role: 'Famosa polis grega conquerida per Roma on va morir el geni Arquimedes.' },
      { latinName: 'Panormus', modernName: 'Palerm', role: 'Port comercial d’origen fenici transformat en colònia romana.' },
      { latinName: 'Caralis', modernName: 'Càller', role: 'Principal ciutat i port romà de Sardenya.' }
    ],
    keyMonuments: ['Teatre Grec-Romà de Taormina', 'Vil·la Romana del Casale (Piazza Armerina, Sicília)', 'Amfiteatre de Càller'],
    cataloniaConnection: "Les rutes navals des de les Balears i el golf de Roses feien escala habitual a les costes sardes i sicilianes rumb a Òstia.",
    economicValue: 'Sicília va ser el primer "graner de Roma", proveint de blat imprescindible per al pa gratuït de la plebs (annona).',
    color: '#ca8a04',
    badgeCoord: { x: 485, y: 380 },
    svgPath: 'M 495 365 L 535 365 L 530 395 L 490 390 Z M 440 315 L 460 315 L 458 355 L 438 355 Z'
  },
  {
    id: 'africa_proconsular',
    name: 'Nord d’Àfrica (Cartago i Numídia)',
    latinName: 'Africa Proconsularis et Numidia',
    modernCountries: 'Tunísia, Algèria i oest de Líbia',
    phaseId: 'guerres_puniques',
    conquestPeriod: '146 aC – 46 aC',
    conquestCentury: 'Segles II a I aC (Tercera Guerra Púnica)',
    keyFigures: 'Escipió l’Africà, Cató el Vell ("Carthago delenda est"), Escipió Emilià, Masinissa',
    keyBattles: ['Batalla de Zama (202 aC)', 'Destrucció de Cartago (146 aC)', 'Batalla de Tapsos (46 aC)'],
    conquestStory: "Després de la victòria sobre Anníbal a Zama, Cató el Vell insistia: «A més, penso que Cartago ha de ser destruïda». L'any 146 aC, Escipió Emilià va arrasar la ciutat púnica després d'un setge atroç. Juli Cèsar i August la van refundar com a pròspera colònia romana.",
    romanizationLevel: 'Alta',
    romanizationDetails: "La província es va convertir en una de les regions més riques i urbanitzades de l'Imperi, plena de sumptuoses ciutats amb teatres, termes i fòrums monumentals. Va ser bressol de l'escriptor Apuleu i de Sant Agustí.",
    mainCities: [
      { latinName: 'Carthago', modernName: 'Cartago / Tunis', role: 'Refundada com a Colònia Iulia Concordia Carthago, segona ciutat més gran d’Occident.' },
      { latinName: 'Leptis Magna', modernName: 'Al-Khums (Líbia)', role: 'Ciutat monumental bressol de l’emperador Septimi Sever.' },
      { latinName: 'Thysdrus', modernName: 'El Djem (Tunísia)', role: 'Capital de la producció d’oli amb el tercer amfiteatre més gran del món.' }
    ],
    keyMonuments: ['Amfiteatre d’El Djem', 'Arc de Septimi Sever a Leptis Magna', 'Termes d’Antoní a Cartago', 'Ruïnes de Dougga'],
    economicValue: 'Exportació massiva de blat cap a Roma, milions de litres d’oli d’oliva en àmfores i feres per als jocs del Coliseu.',
    color: '#a16207',
    badgeCoord: { x: 450, y: 440 },
    svgPath: 'M 380 435 L 530 435 L 560 480 L 370 480 Z'
  },
  {
    id: 'grecia_macedonia',
    name: 'Grècia, Macedònia i l’Epir',
    latinName: 'Achaea, Macedonia et Epirus',
    modernCountries: 'Grècia, Macedònia del Nord, Albània',
    phaseId: 'guerres_puniques',
    conquestPeriod: '200 aC – 146 aC',
    conquestCentury: 'Segle II aC (Guerres Macedòniques)',
    keyFigures: 'Tit Quinti Flaminí, Emili Paule, Luci Mummi',
    keyBattles: ['Batalla de Cinoscèfals (197 aC)', 'Batalla de Pidna (168 aC)', 'Saqueig de Corint (146 aC)'],
    conquestStory: "Roma va intervenir a Grècia per frenar el regne de Macedònia. L'any 196 aC, Flaminí va proclamar la «llibertat de Grècia», però les revoltes van portar al brutal saqueig de Corint (146 aC) i la conversió de Grècia en províncies romanes (Acaia i Macedònia).",
    romanizationLevel: 'Mitjana (Món hel·lènic)',
    romanizationDetails: "Es va produir el fenomen invers: la cultura grega va conquerir espiritualment els romans. Els patricis enviaven els fills a estudiar retòrica a Atenes, copiaven escultures gregues i van assimilar el panteó de déus (Júpiter = Zeus, Mart = Ares, etc.).",
    mainCities: [
      { latinName: 'Athenae', modernName: 'Atenes', role: 'Meca intel·lectual, universitat filosòfica del món clàssic protegida per August i Hadrià.' },
      { latinName: 'Corinthus', modernName: 'Corint', role: 'Refundada com a colònia romana per Juli Cèsar, gran cruïlla marítima de dos mars.' },
      { latinName: 'Thessalonica', modernName: 'Tessalònica', role: 'Capital de la província de Macedònia sobre la Via Egnàcia.' }
    ],
    keyMonuments: ['Odeó d’Herodes Àtic (Atenes)', 'Biblioteca d’Hadrià a Atenes', 'Via Egnàcia (connectava l’Adriàtic amb Bizanci)', 'Arc de Galeri'],
    economicValue: 'Producció de vi de luxe, oli, marbre de Paros i Pentèlic, i sobretot mestres, filòsofs i artistes.',
    color: '#84cc16',
    badgeCoord: { x: 620, y: 350 },
    svgPath: 'M 585 305 L 650 310 L 640 380 L 590 375 Z'
  },
  {
    id: 'gallia',
    name: 'La Gàl·lia (Tres Gàl·lies i Narbonense)',
    latinName: 'Gallia Narbonensis, Lugdunensis, Aquitania, Belgica',
    modernCountries: 'França, Bèlgica, Luxemburg, oest de Suïssa',
    phaseId: 'cesar_tardo_republica',
    conquestPeriod: '121 aC (Narbonense) / 58 aC – 51 aC (Guerra de les Gàl·lies)',
    conquestCentury: 'Segle I aC',
    keyFigures: 'Juli Cèsar, Vercingetòrix, Marc Antoni, Marc Vipsani Agripa',
    keyBattles: ['Setge de Gergòvia (52 aC)', 'Setge i Batalla d’Alèsia (52 aC)', 'Submissió dels belgues (57 aC)'],
    conquestStory: "Després de conquerir el sud de França (Narbonense, per connectar Itàlia amb Hispània per la Via Domícia), Juli Cèsar va llançar la seva famosa campanya relatada a 'De Bello Gallico'. Va sotmetre centenars de tribus celtes i va vèncer el cabdill arvern Vercingetòrix al cèlebre setge d'Alèsia.",
    romanizationLevel: 'Molt alta',
    romanizationDetails: "La Gàl·lia es va transformar ràpidament. Es van construir calçades, teatres i aqüeductes magnífics com el Pont del Gard. L'aristocràcia gal·la va aprendre llatí amb entusiasme i, sota l'emperador Claudi (any 48 dC), va obtenir el dret d'entrar al Senat de Roma.",
    mainCities: [
      { latinName: 'Lugdunum', modernName: 'Lió', role: 'Capital de les Tres Gàl·lies, centre de la xarxa de calçades i bressol de l’emperador Claudi.' },
      { latinName: 'Lutetia Parisiorum', modernName: 'París', role: 'Poblament gal-romà a l’Illa de la Cité sobre el Sena.' },
      { latinName: 'Nemausus', modernName: 'Nimes', role: 'Ciutat monumental de la Provença amb el temple més ben conservat del món romà.' },
      { latinName: 'Narbo Martius', modernName: 'Narbona', role: 'Primera colònia romana fundada a la Gàl·lia fora d’Itàlia (118 aC).' }
    ],
    keyMonuments: ['Pont del Gard (aqüeducte de 50 m d’alçada)', 'Maison Carrée de Nimes', 'Arenes de Nimes i Arle', 'Teatre romà d’Aurenja'],
    cataloniaConnection: "La Via Domícia a través de la Gàl·lia Narbonense s'enllaçava directament amb la Via Augusta als Pirineus (Panissars / Coll de Pertús), facilitant el pas cap a Girona, Barcelona i Tarragona.",
    economicValue: 'Cereals de la conca de París, vi gal, artesania de ceràmica sigil·lada i fusta de roure.',
    color: '#16a34a',
    badgeCoord: { x: 380, y: 220 },
    svgPath: 'M 335 270 L 360 215 L 430 185 L 445 235 L 400 280 L 340 275 Z'
  },
  {
    id: 'asia_menor',
    name: 'Àsia Menor (Anatòlia)',
    latinName: 'Asia, Bithynia, Galatia, Cappadocia',
    modernCountries: 'Turquia',
    phaseId: 'cesar_tardo_republica',
    conquestPeriod: '133 aC – 63 aC',
    conquestCentury: 'Segles II a I aC',
    keyFigures: 'Àtal III de Pèrgam (que va llegar el seu regne a Roma!), Sul·la, Lucul·le, Pompeu el Gran',
    keyBattles: ['Guerres Mitridàtiques contra Mitridates VI del Pont (88 – 63 aC)'],
    conquestStory: "El rei Àtal III de Pèrgam va llegar sorprenentment el seu regne en testament al Senat romà l'any 133 aC. Després de derrotar Mitridates del Pont en tres guerres consecutives, el general Pompeu el Gran va reorganitzar tot l'Orient en riques províncies tributàries.",
    romanizationLevel: 'Mitjana (Món hel·lènic)',
    romanizationDetails: "La llengua quotidiana i comercial va continuar sent el grec koiné, però l'administració, el dret i el culte imperial van transformar les ciutats en metròpolis sumptuoses d'estil romà.",
    mainCities: [
      { latinName: 'Ephesus', modernName: 'Efes', role: 'Capital de la província d’Àsia, seu del gran Temple d’Àrtemis i port comercial gegantí.' },
      { latinName: 'Pergamum', modernName: 'Pèrgam', role: 'Famosa per la seva immensa biblioteca i l’Altar de Zeus.' },
      { latinName: 'Byzantium', modernName: 'Istanbul', role: 'Colònia estratègica sobre el Bòsfor que Constantí transformaria en Constantinoble.' }
    ],
    keyMonuments: ['Biblioteca de Cels a Efes', 'Teatre gegantí d’Efes', 'Asclèpion de Pèrgam'],
    economicValue: 'Impostos astronòmics per al tresor de Roma, teixits de seda, tint de porpra, marbre i espècies.',
    color: '#0d9488',
    badgeCoord: { x: 730, y: 320 },
    svgPath: 'M 660 300 L 790 285 L 820 330 L 720 355 L 660 330 Z'
  },
  {
    id: 'siria_orient',
    name: 'Orient Mitjà (Síria, Judea i Aràbia)',
    latinName: 'Syria, Iudaea, Arabia Petraea',
    modernCountries: 'Síria, Líban, Jordània, Israel, Palestina',
    phaseId: 'cesar_tardo_republica',
    conquestPeriod: '64 aC – 106 dC',
    conquestCentury: 'Segle I aC a II dC',
    keyFigures: 'Pompeu el Gran, Marc Antoni, Tit, Trajà',
    keyBattles: ['Presa de Jerusalem per Pompeu (63 aC)', 'Gran Revolta Jueva i Destrucció del Temple per Tit (70 dC)', 'Setge de Masada (73 dC)'],
    conquestStory: "Pompeu va dissoldre les restes de l'Imperi Selèucida el 64 aC convertint Síria en un baluard fronterer contra l'Imperi Part. L'any 70 dC, l'emperador Tit va sufocar la rebel·lió jueva i va destruir el Temple de Jerusalem.",
    romanizationLevel: 'Fronterera (Limes militar)',
    romanizationDetails: "Zona multicultural de forta presència militar (legions d'Orient com la Legió X Fretensis). Va ser el bressol on va néixer i expandir-se el cristianisme per les calçades romanes.",
    mainCities: [
      { latinName: 'Antiochia', modernName: 'Antioquia', role: 'Tercera metròpoli més poblada de tot l’Imperi Romà, cruïlla entre Orient i Occident.' },
      { latinName: 'Hierosolyma', modernName: 'Jerusalem', role: 'Centre religiós de Judea, refundada posteriorment per Hadrià com Aelia Capitolina.' },
      { latinName: 'Damascus', modernName: 'Damasc', role: 'Important nus caravanesc connectat per la Via Traiana Nova.' }
    ],
    keyMonuments: ['Temple de Bacus a Baalbek (Líban)', 'Teatre romà de Bosra (Jordània)', 'Fortalesa de Masada', 'Arc de Tit a Roma (que commemora la victòria)'],
    economicValue: 'Arribada de la Ruta de la Seda i de les caravanes d’encens i mirra de l’Índia i Aràbia.',
    color: '#0284c7',
    badgeCoord: { x: 810, y: 395 },
    svgPath: 'M 770 355 L 840 350 L 860 440 L 795 440 L 780 390 Z'
  },
  {
    id: 'egipte',
    name: 'Egipte (Aegyptus)',
    latinName: 'Aegyptus',
    modernCountries: 'Egipte',
    phaseId: 'cesar_tardo_republica',
    conquestPeriod: '30 aC',
    conquestCentury: 'Segle I aC (Fi de la República)',
    keyFigures: 'Juli Cèsar, Cleopatra VII, Marc Antoni, Octavi August',
    keyBattles: ['Batalla naval d’Àccium (31 aC)', 'Presa d’Alexandria i mort de Cleopatra (30 aC)'],
    conquestStory: "L'últim gran regne hel·lenístic independent. Després del cèlebre romanç de Juli Cèsar i posteriorment de Marc Antoni amb la reina Cleopatra VII, Octavi va derrotar les seves flotes conjuntes a la batalla d'Àccium (31 aC). L'any 30 aC, Octavi va entrar a Alexandria, Cleopatra es va suïcidar i Egipte va passar a ser propietat personal exclusiva de l'Emperador de Roma.",
    romanizationLevel: 'Alta',
    romanizationDetails: "Cap senador podia posar els peus a Egipte sense autorització expressa d'August per evitar cops d'estat. L'administració romana va mantenir els rituals als déus egipcis mostrant els emperadors vestits de faraons als temples del Nil.",
    mainCities: [
      { latinName: 'Alexandria', modernName: 'Alexandria', role: 'Segona metròpoli més colossal del món antic, seu del Far d’Alexandria i de la Gran Biblioteca.' },
      { latinName: 'Memphis', modernName: 'Memfis', role: 'Antiga capital faraònica i nus fluvial del Nil.' },
      { latinName: 'Pelusium', modernName: 'Pelúsion', role: 'Port fronterer clau de la desembocadura oriental del Nil cap a Judea.' }
    ],
    keyMonuments: ['Far d’Alexandria (una de les 7 Meravelles)', 'Temple de Dendera (amb relleus de Cleopatra i Cèsar)', 'Temple de Filé'],
    economicValue: 'El vertader "Graner de Roma": les crescudes anuals del Nil aportaven el 30% de tot el blat que alimentava el milió d’habitants de la ciutat de Roma.',
    color: '#f59e0b',
    badgeCoord: { x: 745, y: 450 },
    svgPath: 'M 660 450 L 780 435 L 820 480 L 680 495 Z'
  },
  {
    id: 'britannia',
    name: 'Britànnia (Gran Bretanya)',
    latinName: 'Britannia',
    modernCountries: 'Regne Unit (Anglaterra i Gal·les)',
    phaseId: 'alt_imperi',
    conquestPeriod: '43 dC – 84 dC',
    conquestCentury: 'Segle I dC',
    keyFigures: 'Emperador Claudi, General Aulus Plauci, Reina Boudica, Agrícola, Hadrià',
    keyBattles: [
      'Invasió de Claudi (43 dC)',
      'Gran Revolta de la reina celta Boudica dels icens (60 – 61 dC)',
      'Batalla del mont Graupius a Escòcia (84 dC)'
    ],
    conquestStory: "Tot i les incursions d'exploració de Juli Cèsar (55-54 aC), la conquesta oficial la va liderar l'emperador Claudi l'any 43 dC. Després de sufocar la desesperada revolta de la reina celta Boudica, Roma va controlar Anglaterra i Gal·les, però va renunciar a les inhòspites Terres Altes d'Escòcia (Caledònia), construint el colossal Mur d'Adrià (122 dC) per frenar les tribus pictes.",
    romanizationLevel: 'Fronterera (Limes militar)',
    romanizationDetails: "La romanització va ser intensa al sud (ciutats de banys com Aquae Sulis, fòrums, viles agrícoles amb mosaics) i eminentment militar al nord al llarg de la línia del Mur.",
    mainCities: [
      { latinName: 'Londinium', modernName: 'Londres', role: 'Fundada pels romans al pas del riu Tàmesi, principal port comercial de l’illa.' },
      { latinName: 'Aquae Sulis', modernName: 'Bath', role: 'Cèlebre ciutat balneària termal dedicada a la deessa Minerva.' },
      { latinName: 'Eboracum', modernName: 'York', role: 'Principal base militar de les legions del nord; aquí van morir els emperadors Septimi Sever i Constanci.' }
    ],
    keyMonuments: ['Mur d’Hadrià (117 km de muralla de pedra de mar a mar)', 'Termes romanes de Bath', 'Fort de Vindolanda (famoses tauletes de fusta escrites amb tinta)'],
    economicValue: 'Explotació de mines d’estany a Cornualla, plom, plata, llana i exportació de gossos de caça i esclaus.',
    color: '#9333ea',
    badgeCoord: { x: 320, y: 130 },
    svgPath: 'M 290 125 L 340 100 L 350 155 L 305 165 Z'
  },
  {
    id: 'dacia',
    name: 'Dàcia (Muntanyes dels Carpats)',
    latinName: 'Dacia',
    modernCountries: 'Romania i Moldàvia',
    phaseId: 'alt_imperi',
    conquestPeriod: '101 dC – 106 dC',
    conquestCentury: 'Segle II dC (Màxima expansió de l’Imperi!)',
    keyFigures: 'Emperador Trajà (primer emperador hispà), Rei Decèbal dels dacis, Apol·lodor de Damasc',
    keyBattles: ['Batalla de Tapae (101 dC)', 'Setge de Sarmizegetusa (106 dC - mort de Decèbal)'],
    conquestStory: "Els dacis amenaçaven contínuament les províncies del Danubi. El gran emperador hispà Trajà va mobilitzar un exèrcit formidable de més de 100.000 homes. L'enginyer Apol·lodor de Damasc va construir un pont gegantí sobre el Danubi. Després de dues campanyes èpiques, Trajà va sotmetre el regne daci.",
    romanizationLevel: 'Molt alta',
    romanizationDetails: "Una de les fites més fascinants de la història: tot i que la província va ser romana durant poc més de 160 anys, la romanització va ser tan profunda que el país actual s'anomena Romania i la seva llengua és directament llatina!",
    mainCities: [
      { latinName: 'Sarmizegetusa Regia', modernName: 'Grădiștea', role: 'Capital de Decèbal conquerida per Trajà.' },
      { latinName: 'Ulpia Traiana Sarmizegetusa', modernName: 'Sarmizegetusa', role: 'Nova capital romana amb fòrum, amfiteatre i termes.' },
      { latinName: 'Apulum', modernName: 'Alba Iulia', role: 'Seu de la Legió XIII Gemina encarregada de protegir les mines d’or.' }
    ],
    keyMonuments: ['Columna de Trajà a Roma (còmic de marbre de 38 m que narra tota la conquesta)', 'Pont de Trajà sobre el Danubi', 'Tropaeum Traiani (Adamclisi)'],
    economicValue: 'El botí de guerra més fabulós de l’antiguitat: 165 tones d’or i 330 tones de plata de les mines dels Carpats van finançar el Fòrum de Trajà a Roma i 123 dies de festes i jocs públics continus.',
    color: '#7c3aed',
    badgeCoord: { x: 675, y: 220 },
    svgPath: 'M 630 195 L 720 195 L 715 250 L 635 245 Z'
  },
  {
    id: 'limes_germania',
    name: 'Frontera del Rin i Danubi (Limes Germànic)',
    latinName: 'Germania Superior, Inferior et Raetia',
    modernCountries: 'Alemanya, Països Baixos, Àustria, Suïssa',
    phaseId: 'alt_imperi',
    conquestPeriod: '12 aC – 16 dC (Frontera estabilitzada)',
    conquestCentury: 'Segle I aC a I dC',
    keyFigures: 'Drus, Germànic, August, General Varrus, Armini (líder querusc)',
    keyBattles: ['Desastre de la Selva de Teutoburg (9 dC: aniquilació de 3 legions romanes)', 'Batalla d’Idistavís (16 dC)'],
    conquestStory: "August va intentar portar la frontera fins al riu Elba. Però l'any 9 dC, el cabdill germànic Armini va emboscar i destruir tres legions romanes senceres (XVII, XVIII i XIX) comandades per Varrus a la Selva de Teutoburg. August cridava desesperat: «Quintili Varrus, torna'm les meves legions!». A partir de llavors, Roma va renunciar a la Germània profunda i va establir el Limes permanent al llarg dels rius Rin i Danubi.",
    romanizationLevel: 'Fronterera (Limes militar)',
    romanizationDetails: "La presència contínua de desenes de milers de legionaris als campaments fronterers va donar lloc a ciutats pròsperes plenes de comerç entre romans i tribus germàniques.",
    mainCities: [
      { latinName: 'Colonia Claudia Ara Agrippinensium', modernName: 'Colònia (Alemanya)', role: 'Capital de la Germània Inferior, fundada en honor a la mare de Neró.' },
      { latinName: 'Mogontiacum', modernName: 'Magúncia (Mainz)', role: 'Quarter general militar de la Germània Superior.' },
      { latinName: 'Vindobona', modernName: 'Viena (Àustria)', role: 'Gran campament militar sobre el Danubi.' },
      { latinName: 'Castra Regina', modernName: 'Ratisbona (Regensburg)', role: 'Base legionària del Danubi.' }
    ],
    keyMonuments: ['Limes Germànic fortificat (torres de vigilància, fossats i palissades de 550 km)', 'Porta Nigra de Trèveris', 'Termes de Baden-Baden'],
    economicValue: 'Frontera defensiva essencial per a la seguretat de l’Imperi, comerç d’ambre del Bàltic, pells i mercenaris.',
    color: '#6366f1',
    badgeCoord: { x: 490, y: 175 },
    svgPath: 'M 445 160 L 585 160 L 590 220 L 450 220 Z'
  }
];

export const MAP_QUIZ_QUESTIONS: MapQuizQuestion[] = [
  {
    id: 1,
    question: "On van desembarcar les legions romanes l'any 218 aC per tallar els subministraments a Anníbal durant la Segona Guerra Púnica?",
    targetRegionId: 'hispania',
    hint: "Pensa en la península on es troba Empúries i Tarraco!",
    explanation: "Correcte! Gneu Corneli Escipió va desembarcar a Empúries (Costa Brava) l'any 218 aC, iniciant més de 200 anys de conquesta d'Hispània."
  },
  {
    id: 2,
    question: "Quina regió va conquerir Juli Cèsar entre el 58 i el 51 aC després de vèncer Vercingetòrix al setge d'Alèsia?",
    targetRegionId: 'gallia',
    hint: "És el territori celta narrat a l'obra 'De Bello Gallico' i als còmics d'Astèrix!",
    explanation: "Molt bé! Juli Cèsar va sotmetre tota la Gàl·lia (actual França i Bèlgica), incorporant milions d'habitants i immensos recursos a la República."
  },
  {
    id: 3,
    question: "A quina regió l'emperador Hadrià va ordenar construir una famosa muralla de pedra de 117 km per frenar les tribus de Caledònia?",
    targetRegionId: 'britannia',
    hint: "Es tracta de la gran illa conquerida sota l'emperador Claudi l'any 43 dC.",
    explanation: "Exacte! El Mur d'Hadrià protegia la província de Britànnia de les incursions dels pictes d'Escòcia."
  },
  {
    id: 4,
    question: "Quina província va esdevenir la propietat personal exclusiva d'Octavi August i era coneguda com el 'graner de Roma' gràcies al blat del Nil?",
    targetRegionId: 'egipte',
    hint: "Pensa en el regne governat per la faraona Cleopatra VII fins a la seva mort l'any 30 aC.",
    explanation: "Excel·lent! Després de la victòria naval d'Àccium (31 aC), Egipte va passar a ser governat directament per prefectes delegats de l'emperador per garantir el blat d'annona a Roma."
  },
  {
    id: 5,
    question: "On es trobava la ciutat de Cartago, la gran rival marítima que Roma va destruir completament l'any 146 aC a la Tercera Guerra Púnica?",
    targetRegionId: 'africa_proconsular',
    hint: "Al nord d'Àfrica, davant de Sicília (actual Tunísia).",
    explanation: "Correcte! La província d'Àfrica Proconsular es va convertir en un dels territoris més rics de l'Imperi, gran exportador d'oli i blat."
  },
  {
    id: 6,
    question: "Amb la conquesta de quin territori muntanyós l'emperador Trajà va assolir la màxima expansió històrica de l'Imperi l'any 106 dC?",
    targetRegionId: 'dacia',
    hint: "Regió dels Carpats (actual Romania) famosa per les seves riquíssimes mines d'or.",
    explanation: "Brillant! Les campanyes de Dàcia van portar a Roma un botí de 165 tones d'or immortalitzat a la Columna de Trajà."
  },
  {
    id: 7,
    question: "En quina regió van ser emboscades i massacrades tres legions de Varrus l'any 9 dC a la Selva de Teutoburg, fixant el Limes permanent?",
    targetRegionId: 'limes_germania',
    hint: "La frontera nord-est delimitada pels rius Rin i Danubi.",
    explanation: "Ben vist! El desastre de Teutoburg va convèncer August de no avançar més enllà del Rin i convertir el Limes en una frontera defensiva fortificada."
  },
  {
    id: 8,
    question: "Quina va ser la primera província que Roma va conquerir fora de la península Itàlica l'any 241 aC en finalitzar la Primera Guerra Púnica?",
    targetRegionId: 'illes_mediterranies',
    hint: "La gran illa triangular del sud d'Itàlia on es troben Siracusa i l'Etna.",
    explanation: "Correcte! Sicília va ser la primera província romana de la història, seguida immediatament per Sardenya i Còrsega."
  },
  {
    id: 9,
    question: "Quin territori va ser bressol d'alguns dels monuments d'enginyeria més bells de l'Imperi com l'amfiteatre de Tàrraco o l'Aqüeducte de Segòvia?",
    targetRegionId: 'hispania',
    hint: "Península dividida en Tarraconensis, Baetica i Lusitania.",
    explanation: "Exacte! Hispània va ser un dels territoris més romanitzats i va aportar emperadors il·lustres com Trajà i Hadrià."
  },
  {
    id: 10,
    question: "A quina regió pertanyia la civilització que, tot i ser conquerida militarment l'any 146 aC, va 'captivar el seu rude vencedor' amb la seva filosofia, teatre i art?",
    targetRegionId: 'grecia_macedonia',
    hint: "La terra del Partenó, bressol de la democràcia i dels Jocs Olímpics.",
    explanation: "Molt bé! El poeta Horaci va escriure «Graecia capta ferum victorem cepit»: Grècia va conquerir culturalment Roma."
  }
];
