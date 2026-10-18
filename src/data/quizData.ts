export interface QuizQuestion {
  id: string;
  topicId: number;
  topicTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'fàcil' | 'mitjà' | 'difícil';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- TEMA 1: ELS ORÍGENS I LA MONARQUIA ---
  {
    id: 't1-1',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    question: 'En quin any situa la llegenda la fundació mítica de Roma per part de Ròmul i Rem?',
    options: ['509 aC', '753 aC', '218 aC', '44 aC'],
    correctIndex: 1,
    explanation: 'Correcte! La data tradicional de la fundació de Roma al turó Palatí és el 753 aC.',
    difficulty: 'fàcil'
  },
  {
    id: 't1-2',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    question: 'Quin poble del nord d’Itàlia va influir decisivament en Roma i va aportar els seus últims tres reis?',
    options: ['Els grecs', 'Els fenicis', 'Els etruscs', 'Els ibers'],
    correctIndex: 2,
    explanation: 'Els etruscs eren mestres de l’art, l’enginyeria (arcs, clavegueres) i el comerç, i van governar Roma abans de la República.',
    difficulty: 'mitjà'
  },
  {
    id: 't1-3',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    question: 'Com s’anomenava el grup social minoritari i privilegiat que posseïa les terres i governava a l’inici de Roma?',
    options: ['Patricis', 'Plebeus', 'Esclaus', 'Cavallers'],
    correctIndex: 0,
    explanation: 'Els patricis eren les famílies aristocràtiques que es consideraven descendents directes dels fundadors de Roma.',
    difficulty: 'fàcil'
  },
  {
    id: 't1-4',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    question: 'Quin va ser l’últim rei de Roma, expulsat l’any 509 aC per la seva tirania?',
    options: ['Numa Pompili', 'Tarquini el Superb', 'Servi Tul·li', 'Ròmul'],
    correctIndex: 1,
    explanation: 'Tarquini el Superb va ser un rei cruel i despòtic; la seva expulsió va donar origen a la República.',
    difficulty: 'fàcil'
  },
  {
    id: 't1-5',
    topicId: 1,
    topicTitle: 'Els orígens i la Monarquia',
    question: 'A la vora de quin riu i sobre quins elements geogràfics es va fundar la ciutat de Roma?',
    options: ['Riu Po i 5 valls', 'Riu Danubi i 3 muntanyes', 'Riu Tíber i 7 turons', 'Riu Nil i un delta'],
    correctIndex: 2,
    explanation: 'Roma es va fundar al gual del riu Tíber sobre els famosos Set Turons (Palatí, Aventí, Capitoli, etc.).',
    difficulty: 'fàcil'
  },

  // --- TEMA 2: LA REPÚBLICA ---
  {
    id: 't2-1',
    topicId: 2,
    topicTitle: 'La República',
    question: 'Què signifiquen les cèlebres sigles republicanes SPQR?',
    options: [
      'Senatus Populusque Romanus (El Senat i el Poble Romà)',
      'Salus Populi Quotidiana Romae (La Salut Diària del Poble)',
      'Sub Potestate Quattuor Regum (Sota el Poder de Quatre Reis)',
      'Societas Patriciorum Quaerens Regnum (Societat de Patricis)'
    ],
    correctIndex: 0,
    explanation: 'SPQR vol dir "Senatus Populusque Romanus", representant la unió del Senat i la ciutadania romana com a base del govern republicà.',
    difficulty: 'fàcil'
  },
  {
    id: 't2-2',
    topicId: 2,
    topicTitle: 'La República',
    question: 'Quins eren els dos magistrats suprems de la República que dirigien l’Estat i l’exèrcit durant un any?',
    options: ['Els Pretors', 'Els Cònsols', 'Els Qüestors', 'Els Censors'],
    correctIndex: 1,
    explanation: 'Els Cònsols eren dos, governaven durant 1 any i tenien dret a veto l’un sobre l’altre per evitar abusos.',
    difficulty: 'fàcil'
  },
  {
    id: 't2-3',
    topicId: 2,
    topicTitle: 'La República',
    question: 'Quin magistrat sagrat i intocable defensava els plebeus i tenia el poder de "VETO"?',
    options: ['El Cònsol', 'El Tribú de la Plebs', 'L’Edil curul', 'El Dictador'],
    correctIndex: 1,
    explanation: 'El Tribú de la Plebs era inviolable i podia anul·lar qualsevol llei o decisió del Senat que perjudiqués els plebeus cridant "Veto!".',
    difficulty: 'mitjà'
  },
  {
    id: 't2-4',
    topicId: 2,
    topicTitle: 'La República',
    question: 'Quina va ser la primera gran conquesta legal dels plebeus exposada públicament en bronze al Fòrum?',
    options: ['La Carta Magna', 'La Llei de les XII Taules', 'L’Edicte de Caracal·la', 'El Codi de Justinià'],
    correctIndex: 1,
    explanation: 'La Llei de les XII Taules (450 aC) va ser el primer codi escrit per evitar que els patricis interpretessin les lleis a conveniència.',
    difficulty: 'mitjà'
  },
  {
    id: 't2-5',
    topicId: 2,
    topicTitle: 'La República',
    question: 'Com s’anomenava la carrera política reglada que havia de recórrer un romà des de qüestor fins a cònsol?',
    options: ['Cursus Honorum', 'Mare Nostrum', 'Pax Romana', 'Triumviratus'],
    correctIndex: 0,
    explanation: 'El Cursus Honorum ("carrera dels honors") establia l’edat i els càrrecs previs abans de poder optar al consolat.',
    difficulty: 'fàcil'
  },

  // --- TEMA 3: L’EXPANSIÓ TERRITORIAL ---
  {
    id: 't3-1',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    question: 'Quin nom van donar els romans al mar Mediterrani un cop conquerides totes les seves costes?',
    options: ['Oceanus Magnus', 'Mare Tenebrosum', 'Mare Nostrum', 'Pontus Euxinus'],
    correctIndex: 2,
    explanation: 'Mare Nostrum significa literalment "El nostre mar", ja que tots els països del voltant eren províncies romanes.',
    difficulty: 'fàcil'
  },
  {
    id: 't3-2',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    question: 'En quin any van desembarcar les primeres tropes romanes a la península Ibèrica (a Empúries)?',
    options: ['753 aC', '218 aC', '44 aC', '146 aC'],
    correctIndex: 1,
    explanation: 'L’any 218 aC, durant la Segona Guerra Púnica, Gneu Corneli Escipió va desembarcar a Empúries per tallar els subministraments a Anníbal.',
    difficulty: 'mitjà'
  },
  {
    id: 't3-3',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    question: 'Quina era la unitat tàctica bàsica de l’exèrcit romà formada per aproximadament 4.000 a 5.000 soldats?',
    options: ['La Falange', 'La Centúria', 'La Legió', 'La Cohort'],
    correctIndex: 2,
    explanation: 'La Legió era la columna vertebral de l’exèrcit romà, famosa per la seva disciplina i maniobrabilitat.',
    difficulty: 'fàcil'
  },
  {
    id: 't3-4',
    topicId: 3,
    topicTitle: 'L’expansió territorial',
    question: 'D’on prové l’expressió "victòria pírrica", que significa una victòria aconseguida amb pèrdues irreparables?',
    options: [
      'Del rei Pirros de l’Èpir lluitant contra Roma',
      'De la ciutat de Pompeia',
      'Del filòsof grec Pirró',
      'De les mines de pirita d’Hispània'
    ],
    correctIndex: 0,
    explanation: 'El rei Pirros va vèncer els romans en dues batalles però va patir tantes baixes que no va poder continuar la guerra.',
    difficulty: 'mitjà'
  },

  // --- TEMA 4: LES GUERRES PÚNIQUES ---
  {
    id: 't4-1',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    question: 'Contra quina ciutat-estat marítima del nord d’Àfrica es va enfrontar Roma en les Guerres Púniques?',
    options: ['Alexandria', 'Atenes', 'Cartago', 'Esparta'],
    correctIndex: 2,
    explanation: 'Cartago era la gran potència naval fundada pels fenicis a l’actual Tunísia.',
    difficulty: 'fàcil'
  },
  {
    id: 't4-2',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    question: 'Quin general cartaginès va travessar els Alps a l’hivern amb elefants per envair la península Itàlica?',
    options: ['Amílcar Barca', 'Anníbal Barca', 'Asdrúbal', 'Àtila'],
    correctIndex: 1,
    explanation: 'Anníbal Barca va protagonitzar la proesa de creuar els Alps el 218 aC amb desenes de milers de soldats i elefants.',
    difficulty: 'fàcil'
  },
  {
    id: 't4-3',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    question: 'A quina batalla decisiva l’any 202 aC Escipió l’Africà va derrotar definitivament Anníbal?',
    options: ['Batalla de Cannes', 'Batalla de Zama', 'Batalla d’Alèsia', 'Batalla d’Àccium'],
    correctIndex: 1,
    explanation: 'La batalla de Zama (al nord d’Àfrica, 202 aC) va posar fi a la Segona Guerra Púnica amb una victòria total de Roma.',
    difficulty: 'mitjà'
  },
  {
    id: 't4-4',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    question: 'Quin invent naval van crear els romans a la 1a Guerra Púnica per assaltar els vaixells enemics?',
    options: ['El Corvus (ganxo i pont d’abordatge)', 'El Foc Grec', 'La catapulta de vapor', 'El torpede'],
    correctIndex: 0,
    explanation: 'El Corvus ("el corb") era un pont que s’abatia sobre el vaixell cartaginès clavant una punxa de ferro, permetent passar a la infanteria.',
    difficulty: 'mitjà'
  },
  {
    id: 't4-5',
    topicId: 4,
    topicTitle: 'Les Guerres Púniques',
    question: 'Quin any va ser destruïda per complet la ciutat de Cartago a la Tercera Guerra Púnica?',
    options: ['218 aC', '146 aC', '44 aC', '27 aC'],
    correctIndex: 1,
    explanation: 'L’any 146 aC els romans van arrasar i cremar Cartago (el mateix any que van sotmetre la ciutat grega de Corint).',
    difficulty: 'mitjà'
  },

  // --- TEMA 5: LA CRISI DEL SEGLE I aC ---
  {
    id: 't5-1',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    question: 'Què van proposar els germans Tiberi i Gai Grac per ajudar els ciutadans i camperols arruïnats?',
    options: [
      'Una reforma agrària per repartir terres públiques als pobres',
      'Abolir completament el Senat',
      'Convidar els gals a governar Roma',
      'Construir un gran mur al voltant d’Itàlia'
    ],
    correctIndex: 0,
    explanation: 'Els germans Grac van intentar limitar els grans latifundis dels patricis i donar feina i terra als ciutadans sense recursos.',
    difficulty: 'fàcil'
  },
  {
    id: 't5-2',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    question: 'Qui va ser el gladiador que va liderar una gran rebel·lió de desenes de milers d’esclaus entre el 73 i el 71 aC?',
    options: ['Espàrtac', 'Vercingetòrix', 'Cincinnat', 'Ciceró'],
    correctIndex: 0,
    explanation: 'Espàrtac va fugir de l’escola de gladiadors de Càpua i va posar en escac la República durant més de dos anys.',
    difficulty: 'fàcil'
  },
  {
    id: 't5-3',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    question: 'Quina conseqüència perillosa va tenir la reforma militar de Gai Mari (creació d’un exèrcit professional a sou)?',
    options: [
      'Els soldats van deixar d’usar espases',
      'Els soldats es van fer fidels als seus generals i no a les institucions de Roma',
      'Ningú no volia anar a la guerra',
      'Roma va perdre totes les seves províncies'
    ],
    correctIndex: 1,
    explanation: 'Com que el general pagava el sou i prometia terres als veterans, els legionaris obeïen el general fins i tot si es revoltava contra el Senat.',
    difficulty: 'mitjà'
  },
  {
    id: 't5-4',
    topicId: 5,
    topicTitle: 'La crisi del segle I aC',
    question: 'Quins dos generals van protagonitzar la primera gran guerra civil entre populars i optimates al segle I aC?',
    options: ['Ròmul i Rem', 'Mari i Sul·la', 'August i Ciceró', 'Anníbal i Escipió'],
    correctIndex: 1,
    explanation: 'Gai Mari (líder dels populars) i Luci Corneli Sul·la (líder dels aristòcrates optimates) es van enfrontar cruelment pel poder a Roma.',
    difficulty: 'mitjà'
  },

  // --- TEMA 6: JULI CÈSAR ---
  {
    id: 't6-1',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    question: 'Quins tres personatges formaven el Primer Triumvirat l’any 60 aC?',
    options: [
      'Cèsar, Pompeu i Cras',
      'August, Marc Antoni i Lèpid',
      'Ciceró, Cató i Brut',
      'Ròmul, Numa i Tarquini'
    ],
    correctIndex: 0,
    explanation: 'Juli Cèsar (ambició política), Pompeu (prestigi militar) i Cras (l’home més ric de Roma) van acordar controlar el poder.',
    difficulty: 'fàcil'
  },
  {
    id: 't6-2',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    question: 'A quina regió va aconseguir Cèsar la seva gran glòria militar conquerint-la entre el 58 i el 50 aC?',
    options: ['La Gàl·lia (actual França)', 'Britània', 'Germània', 'Egipte'],
    correctIndex: 0,
    explanation: 'Cèsar va sotmetre totes les tribus gal·les i va derrotar Vercingetòrix al setge d’Alèsia el 52 aC.',
    difficulty: 'fàcil'
  },
  {
    id: 't6-3',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    question: 'Quina frase cèlebre va pronunciar Cèsar en creuar el riu Rubicó iniciant la guerra civil contra Pompeu?',
    options: [
      'Alea iacta est ("La sort està tirada")',
      'Veni, vidi, vici ("Vaig venir, vaig veure, vaig vèncer")',
      'Delenda est Carthago ("Cartago ha de ser destruïda")',
      'Carpe diem ("Aprofita el dia")'
    ],
    correctIndex: 0,
    explanation: '"Alea iacta est" va ser la frase en creuar el Rubicó l’any 49 aC, sabent que desafiava les lleis de Roma.',
    difficulty: 'fàcil'
  },
  {
    id: 't6-4',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    question: 'En quina data tràgica va ser assassinat Juli Cèsar al Senat de Roma?',
    options: ['15 de març del 44 aC (Idus de Març)', '21 d’abril del 753 aC', '1 de gener del 27 aC', '24 d’agost del 79 dC'],
    correctIndex: 0,
    explanation: 'Els Idus de Març (15 de març del 44 aC), Cèsar va rebre 23 punyalades d’un grup de senadors republicans liderats per Brut i Cassi.',
    difficulty: 'fàcil'
  },
  {
    id: 't6-5',
    topicId: 6,
    topicTitle: 'Juli Cèsar',
    question: 'Quina important reforma del mesurament del temps va introduir Juli Cèsar que encara usem avui?',
    options: ['El rellotge de sorra', 'El Calendari Julià de 365 dies i anys de traspàs', 'La setmana de deu dies', 'L’astrolabi'],
    correctIndex: 1,
    explanation: 'El calendari julià va establir l’any solar de 365 dies amb un dia extra cada quatre anys (any de traspàs).',
    difficulty: 'mitjà'
  },

  // --- TEMA 7: L’IMPERI ROMÀ I LA ROMANITZACIÓ ---
  {
    id: 't7-1',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Qui va ser el primer emperador de Roma començant el seu mandat l’any 27 aC?',
    options: ['Juli Cèsar', 'Octavi August', 'Neró', 'Marc Aureli'],
    correctIndex: 1,
    explanation: 'Octavi, fill adoptiu de Cèsar, va rebre el títol d’August l’any 27 aC, inaugurant l’Imperi Romà.',
    difficulty: 'fàcil'
  },
  {
    id: 't7-2',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Com s’anomena el període de màxima estabilitat i prosperitat de l’Imperi durant els segles I i II dC?',
    options: ['La Gran Crisi', 'La Pax Romana', 'El Segle Fosc', 'La Revolució Urbana'],
    correctIndex: 1,
    explanation: 'La Pax Romana (o Pax Augusta) va ser una etapa de dos segles de pau interna, comerç florent i floriment urbà.',
    difficulty: 'fàcil'
  },
  {
    id: 't7-3',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Què significa el concepte clau de "Romanització"?',
    options: [
      'L’obligació de vestir només amb túnica blanca',
      'El procés pel qual els pobles conquerits van adoptar la llengua (llatí), cultura, urbanisme i lleis romanes',
      'Traslladar tots els pobladors a viure a la ciutat de Roma',
      'La destrucció de tots els temples dels déus antics'
    ],
    correctIndex: 1,
    explanation: 'La romanització va ser la transformació cultural de les províncies mitjançant el llatí, el dret romà, les calçades i la vida urbana.',
    difficulty: 'fàcil'
  },
  {
    id: 't7-4',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Com s’anomenava la gran calçada romana que recorria la costa de Catalunya i el llevant peninsular fins a Cadis?',
    options: ['Via Àpia', 'Via Augusta', 'Via Flamínia', 'Camí de Sant Jaume'],
    correctIndex: 1,
    explanation: 'La Via Augusta connectava Roma amb Cadis a través de Catalunya, passant per Tàrraco i Barcino.',
    difficulty: 'fàcil'
  },
  {
    id: 't7-5',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Quin edifici romà s’utilitzava específicament per a combats de gladiadors i lluites de feres?',
    options: ['El Teatre', 'El Circ', 'L’Amfiteatre (com el Coliseu)', 'Les Termes'],
    correctIndex: 2,
    explanation: 'Els amfiteatres (de planta el·líptica) acollien els espectacles de gladiadors i feres; els circs eren per a curses de quadrigues i els teatres per a obres dramàtiques.',
    difficulty: 'mitjà'
  },
  {
    id: 't7-6',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Quines van ser les causes principals de la greu Crisi del segle III dC a l’Imperi Romà?',
    options: [
      'Amenaces i invasions bàrbares, fallida econòmica i una forta inestabilitat militar amb emperadors assassinats',
      'La manca de pedres per construir monuments',
      'L’atac dels samurais des d’Àsia',
      'La decisió voluntària dels romans d’abandonar les ciutats'
    ],
    correctIndex: 0,
    explanation: 'Al segle III dC, les legions proclamaven i assassinaven emperadors contínuament, mentre els pobles germànics trencaven el limes i l’economia col·lapsava.',
    difficulty: 'mitjà'
  },
  {
    id: 't7-7',
    topicId: 7,
    topicTitle: 'L’Imperi Romà',
    question: 'Què era el "Limes" a l’Imperi Romà?',
    options: [
      'Una fruita que menjaven els legionaris',
      'La frontera fortificada que separava l’Imperi dels territoris bàrbars no conquerits',
      'El càrrec d’assessor de l’emperador',
      'Una moneda d’or romana'
    ],
    correctIndex: 1,
    explanation: 'El Limes era la línia defensiva de fortificacions, campaments i torres de vigilància situada al llarg dels rius Rin, Danubi i la muralla d’Hadrià.',
    difficulty: 'mitjà'
  },

  // --- TEMA 8: L'ECONOMIA ROMANA I EL PRIMER CRISTIANISME ---
  {
    id: 't8-1',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Quins tres conreus essencials formaven la "trilogia mediterrània" en l’agricultura romana?',
    options: [
      'Blat, oliva i vinya',
      'Patata, tomàquet i blat de moro',
      'Arròs, soja i te',
      'Civada, poma i sègol'
    ],
    correctIndex: 0,
    explanation: 'La trilogia mediterrània estava composta pel blat (pa), l’olivera (oli d’oliva) i la vinya (vi), consumits diàriament per totes les classes socials.',
    difficulty: 'fàcil'
  },
  {
    id: 't8-2',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Quina eina agrícola arrossegada per bous i amb rella de ferro va permetre als romans llaurar més profundament?',
    options: [
      'L’arada romana',
      'El tractor mecànic',
      'La falç egípcia',
      'El trill de fusta'
    ],
    correctIndex: 0,
    explanation: 'L’arada romana combinava fusta i ferro per obrir solcs profunds, afavorint el rendiment dels camps de conreu.',
    difficulty: 'fàcil'
  },
  {
    id: 't8-3',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Quines eren les tres formes principals d’explotació dels territoris conquerits per Roma?',
    options: [
      'Esclaus (mà d’obra gratuïta), cobrament d’impostos i confiscació de béns i terres',
      'Donacions voluntàries, turisme i préstecs bancaris',
      'Treball exclusiu d’artesans lliures i sous públics',
      'Regal de diners de Roma cap a les províncies'
    ],
    correctIndex: 0,
    explanation: 'Roma obtenia riquesa de les províncies mitjançant l’esclavitud dels presoners de guerra, el cobrament d’impostos anuals i la confiscació de terres (ager publicus).',
    difficulty: 'mitjà'
  },
  {
    id: 't8-4',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Per quin motiu les autoritats romanes van perseguir els primers cristians durant tres segles?',
    options: [
      'Perquè es negaven a adorar l’emperador com a déu i a rendir culte als déus tradicionals pagans',
      'Perquè parlaven un idioma que els romans no entenien',
      'Perquè no volien menjar pa ni oli',
      'Perquè volien conquerir Roma amb armes'
    ],
    correctIndex: 0,
    explanation: 'En ser monoteistes, els cristians només adoraven Déu i rebutjaven la divinització de l’emperador, cosa que Roma considerava traïció política a l’Estat.',
    difficulty: 'mitjà'
  },
  {
    id: 't8-5',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Quin emperador va autoritzar el cristianisme i va establir la llibertat religiosa amb l’Edicte de Milà (313 dC)?',
    options: [
      'L’emperador Constantí el Gran',
      'Juli Cèsar',
      'Neró',
      'Calígula'
    ],
    correctIndex: 0,
    explanation: 'L’any 313 dC, Constantí va promulgar l’Edicte de Milà, aturant les persecucions, autoritzant la religió cristiana i convertint-se ell mateix.',
    difficulty: 'fàcil'
  },
  {
    id: 't8-6',
    topicId: 8,
    topicTitle: 'L’Economia Romana i el Primer Cristianisme',
    question: 'Quin any i sota quin emperador el cristianisme va ser declarat RELIGIÓ OFICIAL de tot l’Imperi Romà?',
    options: [
      'L’any 380 dC per l’emperador Teodosi (Edicte de Tessalònica)',
      'L’any 27 aC per Octavi August',
      'L’any 753 aC per Ròmul',
      'L’any 218 aC per Escipió'
    ],
    correctIndex: 0,
    explanation: 'L’any 380 dC, Teodosi el Gran va prohibir els cultes pagans i va convertir el cristianisme en l’única religió oficial de tot l’Estat romà.',
    difficulty: 'mitjà'
  },

  // --- TEMA 9: LA CRISI I LA FI DE L'IMPERI ROMÀ D'OCCIDENT ---
  {
    id: 't9-1',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'Quina conseqüència econòmica immediata va tenir la fi de les grans conquestes de territoris a l’Imperi?',
    options: [
      'Va haver-hi una manca d’esclaus, provocant un fort descens de la producció agrícola i minera',
      'Tots els ciutadans es van fer rics instantàniament',
      'Es van tancar totes les calçades perquè ningú les utilitzava',
      'Els romans van decidir dedicar-se només a la pesca'
    ],
    correctIndex: 0,
    explanation: 'En aturar-se les conquestes, no arribaven nous presoners de guerra. La manca d’esclaus va fer caure la producció agrícola i va provocar una greu crisi econòmica.',
    difficulty: 'mitjà'
  },
  {
    id: 't9-2',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'En quin any i quin emperador va dividir l’Imperi Romà en dos blocs: Occident (Roma) i Orient (Bizanci)?',
    options: [
      'L’any 395 dC per l’emperador Teodosi',
      'L’any 44 aC per Juli Cèsar',
      'L’any 218 aC per Anníbal',
      'L’any 106 dC per Trajà'
    ],
    correctIndex: 0,
    explanation: 'L’any 395 dC, Teodosi va repartir l’Imperi entre els seus fills: Honori (Occident amb capital a Roma) i Arcadi (Orient amb capital a Constantinoble).',
    difficulty: 'fàcil'
  },
  {
    id: 't9-3',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'Quins tres pobles germànics van envair la península Ibèrica (Hispània) l’any 409 dC?',
    options: [
      'Vàndals, alans i sueus',
      'Vikings, normands i celtes',
      'Fenicis, grecs i cartaginesos',
      'Huns, mongols i perses'
    ],
    correctIndex: 0,
    explanation: 'L’any 409 dC, els vàndals, alans i sueus van creuar els Pirineus i es van repartir les províncies hispàniques davant la impotència romana.',
    difficulty: 'mitjà'
  },
  {
    id: 't9-4',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'Quin cabdill visigot va liderar el cèlebre saqueig de la ciutat de Roma l’any 410 dC?',
    options: [
      'Alaric',
      'Espàrtac',
      'Vercingetòrix',
      'Anníbal'
    ],
    correctIndex: 0,
    explanation: 'Alaric I i els visigots van assaltar i saquejar Roma durant tres dies l’any 410 dC, deixant en xoc tot el món mediterrani.',
    difficulty: 'fàcil'
  },
  {
    id: 't9-5',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'Quin temible poble nòmada de genets de les estepes comandat per Àtila va envair Europa?',
    options: [
      'Els huns',
      'Els samnites',
      'Els cartaginesos',
      'Els etruscs'
    ],
    correctIndex: 0,
    explanation: 'Els huns, liderats per Àtila ("el flagell de Déu"), van sembrar el terror a Europa i van empènyer els pobles germànics a penetrar a les províncies romanes.',
    difficulty: 'fàcil'
  },
  {
    id: 't9-6',
    topicId: 9,
    topicTitle: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    question: 'Què va succeir l’any 476 dC que es considera la FI DE L’EDAT ANTIGA i el començament de L’EDAT MITJANA?',
    options: [
      'El bàrbar Odoacre va deposar l’últim emperador d’Occident, Ròmul Augústul, i es va coronar rei',
      'Juli Cèsar va ser assassinat al Senat',
      'Es va construir el Coliseu de Roma',
      'Roma va conquerir la ciutat d’Atenes'
    ],
    correctIndex: 0,
    explanation: 'L’any 476 dC, Odoacre va fer fora del tron al jove Ròmul Augústul: és la caiguda definitiva de l’Imperi Romà d’Occident i l’inici de l’Edat Mitjana.',
    difficulty: 'fàcil'
  }
];

