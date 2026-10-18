export interface TimelineEvent {
  year: string;
  numericYear: number; // for sorting: negative for BC, positive for AD
  title: string;
  period: 'Monarquia' | 'República' | 'Imperi';
  description: string;
  importance: 'clau' | 'secundari';
  tag: string;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '753 aC',
    numericYear: -753,
    title: 'Fundació de Roma',
    period: 'Monarquia',
    description: 'Data mítica en què Ròmul funda Roma al turó Palatí i crea les primeres institucions i el Senat.',
    importance: 'clau',
    tag: 'Orígens'
  },
  {
    year: '509 aC',
    numericYear: -509,
    title: 'Expulsió de Tarquini el Superb i inici de la República',
    period: 'República',
    description: 'El poble romà es rebel·la contra l’últim rei etrusc. Neix la República sota el lema SPQR.',
    importance: 'clau',
    tag: 'Institucions'
  },
  {
    year: '494 aC',
    numericYear: -494,
    title: 'Vaga del Mont Sacre: Neix el Tribú de la Plebs',
    period: 'República',
    description: 'Els plebeus abandonen la ciutat fins a aconseguir magistrats propis amb dret a veto.',
    importance: 'secundari',
    tag: 'Drets socials'
  },
  {
    year: '450 aC',
    numericYear: -450,
    title: 'Llei de les XII Taules',
    period: 'República',
    description: 'Primer codi de lleis escrites i públiques de la història de Roma gravat en taules de bronze al Fòrum.',
    importance: 'clau',
    tag: 'Lleis'
  },
  {
    year: '264 – 241 aC',
    numericYear: -264,
    title: 'Primera Guerra Púnica',
    period: 'República',
    description: 'Roma s’enfronta a Cartago pel domini de Sicília; invenció del corvus i conquesta de les primeres illes.',
    importance: 'secundari',
    tag: 'Guerres Púniques'
  },
  {
    year: '218 aC',
    numericYear: -218,
    title: 'Anníbal creua els Alps i Roma arriba a Empúries',
    period: 'República',
    description: 'Inici de la 2a Guerra Púnica: Anníbal passa els Alps amb elefants i les legions romanes desembarquen a Empúries.',
    importance: 'clau',
    tag: 'Guerres Púniques'
  },
  {
    year: '216 aC',
    numericYear: -216,
    title: 'Batalla de Cannes',
    period: 'República',
    description: 'La pitjor derrota de la història romana: Anníbal encercla i venç més de 50.000 legionaris.',
    importance: 'secundari',
    tag: 'Batalles'
  },
  {
    year: '202 aC',
    numericYear: -202,
    title: 'Batalla de Zama',
    period: 'República',
    description: 'Escipió l’Africà derrota Anníbal a l’Àfrica. Cartago capitula i cedeix les seves possessions.',
    importance: 'clau',
    tag: 'Guerres Púniques'
  },
  {
    year: '146 aC',
    numericYear: -146,
    title: 'Destrucció de Cartago i conquesta de Grècia',
    period: 'República',
    description: 'Roma destrueix completament la ciutat de Cartago i Corint; el Mediterrani es converteix en el "Mare Nostrum".',
    importance: 'clau',
    tag: 'Expansió'
  },
  {
    year: '133 aC',
    numericYear: -133,
    title: 'Tribunat de Tiberi Grac i reforma agrària',
    period: 'República',
    description: 'Tiberi proposa repartir terres als ciutadans empobrits; és assassinat pels senadors patricis.',
    importance: 'secundari',
    tag: 'Crisi República'
  },
  {
    year: '107 aC',
    numericYear: -107,
    title: 'Reforma militar de Gai Mari',
    period: 'República',
    description: 'Creació de l’exèrcit professional a sou, fet que vincula la fidelitat del soldat al general.',
    importance: 'secundari',
    tag: 'Exèrcit'
  },
  {
    year: '73 – 71 aC',
    numericYear: -73,
    title: 'Revolta d’Espàrtac',
    period: 'República',
    description: 'El gladiador Espàrtac lidera la gran revolta de desenes de milers d’esclaus fins a la derrota davant Cras.',
    importance: 'clau',
    tag: 'Crisi República'
  },
  {
    year: '60 aC',
    numericYear: -60,
    title: 'Primer Triumvirat',
    period: 'República',
    description: 'Pacte secret entre Cèsar, Pompeu i Cras per controlar el govern de Roma.',
    importance: 'clau',
    tag: 'Juli Cèsar'
  },
  {
    year: '58 – 50 aC',
    numericYear: -58,
    title: 'Conquesta de la Gàl·lia per Juli Cèsar',
    period: 'República',
    description: 'Cèsar sotmet totes les tribus gal·les i venç Vercingetòrix al setge d’Alèsia (52 aC).',
    importance: 'clau',
    tag: 'Juli Cèsar'
  },
  {
    year: '49 aC',
    numericYear: -49,
    title: 'Pas del Rubicó: "Alea iacta est"',
    period: 'República',
    description: 'Cèsar creua el riu fronterer d’Itàlia amb les seves tropes i inicia la guerra civil contra Pompeu.',
    importance: 'clau',
    tag: 'Juli Cèsar'
  },
  {
    year: '44 aC (15 de març)',
    numericYear: -44,
    title: 'Idus de Març: Assassinat de Juli Cèsar',
    period: 'República',
    description: 'Senadors partidaris de la República apunyalen Juli Cèsar al Senat tement que es coroni rei.',
    importance: 'clau',
    tag: 'Juli Cèsar'
  },
  {
    year: '27 aC',
    numericYear: -27,
    title: 'Octavi rep el títol d’August: Comença l’Imperi Romà',
    period: 'Imperi',
    description: 'Octavi es converteix en el primer emperador de Roma i inicia dos segles de Pax Romana.',
    importance: 'clau',
    tag: 'Imperi'
  },
  {
    year: 'Segles I – II dC',
    numericYear: 100,
    title: 'La Pax Romana i màxima expansió amb Trajà',
    period: 'Imperi',
    description: 'Període d’esplendor, estabilitat, comerç i intensa romanització de les províncies mediterrànies.',
    importance: 'clau',
    tag: 'Imperi'
  },
  {
    year: '212 dC',
    numericYear: 212,
    title: 'Edicte de Caracal·la',
    period: 'Imperi',
    description: 'L’emperador Caracal·la concedeix la ciutadania romana a tots els habitants lliures de l’Imperi.',
    importance: 'secundari',
    tag: 'Romanització'
  },
  {
    year: '235 – 284 dC',
    numericYear: 235,
    title: 'La Crisi del segle III dC',
    period: 'Imperi',
    description: 'Cinquanta anys d’anarquia militar, invasions bàrbares, fallida econòmica i despoblament de les ciutats.',
    importance: 'clau',
    tag: 'Crisi Imperi'
  },
  {
    year: '313 dC',
    numericYear: 313,
    title: 'Edicte de Milà: Constantí legalitza el cristianisme',
    period: 'Imperi',
    description: 'L’emperador Constantí estableix la llibertat de culte a tot l’Imperi i posa fi a tres segles de persecucions cristianes.',
    importance: 'clau',
    tag: 'Cristianisme'
  },
  {
    year: '380 dC',
    numericYear: 380,
    title: 'Edicte de Tessalònica: Cristianisme religió oficial',
    period: 'Imperi',
    description: 'L’emperador Teodosi el Gran declara el cristianisme l’única religió oficial de tot l’Imperi Romà.',
    importance: 'clau',
    tag: 'Cristianisme'
  },
  {
    year: '395 dC',
    numericYear: 395,
    title: 'Divisió de l’Imperi per Teodosi: Occident i Orient',
    period: 'Imperi',
    description: 'A la seva mort, Teodosi divideix l’Imperi entre els seus dos fills: Honori (Occident amb capital a Roma) i Arcadi (Orient amb capital a Constantinoble).',
    importance: 'clau',
    tag: 'Crisi Imperi'
  },
  {
    year: '409 dC',
    numericYear: 409,
    title: 'Invasions germàniques a Hispània',
    period: 'Imperi',
    description: 'Vàndals, alans i sueus travessen els Pirineus i s’assenten a les províncies de la península Ibèrica.',
    importance: 'secundari',
    tag: 'Invasions'
  },
  {
    year: '410 dC',
    numericYear: 410,
    title: 'Saqueig de Roma per Alaric i els visigots',
    period: 'Imperi',
    description: 'El rei visigot Alaric I assalta i saqueja la ciutat imperial durant tres dies, commocionant tot el món conegut.',
    importance: 'clau',
    tag: 'Invasions'
  },
  {
    year: '476 dC',
    numericYear: 476,
    title: 'Caiguda de l’Imperi Romà d’Occident: Odoacre deposa Ròmul Augústul',
    period: 'Imperi',
    description: 'El cabdill militar bàrbar Odoacre enderroca l’últim emperador d’Occident (Ròmul Augústul). Fi de l’Edat Antiga i inici de l’Edat Mitjana.',
    importance: 'clau',
    tag: 'Caiguda Roma'
  }
];
