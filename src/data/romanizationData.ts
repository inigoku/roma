export interface RomanBuilding {
  id: string;
  name: string;
  latinName: string;
  category: 'Espectacles' | 'Enginyeria' | 'Vida Pública' | 'Habitatge';
  description: string;
  features: string[];
  localExample: string;
  iconType: string;
}

export const ROMAN_BUILDINGS: RomanBuilding[] = [
  {
    id: 'aqueducte',
    name: 'Aqüeducte',
    latinName: 'Aquaeductus',
    category: 'Enginyeria',
    description:
      'Canalització d’enginyeria per transportar aigua dolça des de deus i rius llunyans fins a les ciutats per gravetat, salvant valls mitjançant fileres d’arcs superposats.',
    features: [
      'Pendent constant mil·limètric calculat amb el corobates.',
      'Ús massiu de l’arc de mig punt i el formigó romà (opus caementicium).',
      'Abastia les fonts públiques, termes i palaus de la ciutat.'
    ],
    localExample: 'Aqüeducte de les Ferreres o Pont del Diable (Tarragona / Tàrraco)',
    iconType: 'waves'
  },
  {
    id: 'calcada',
    name: 'Calçada Romana',
    latinName: 'Via Romana',
    category: 'Enginyeria',
    description:
      'Xarxa d’autopistes de l’antiguitat: vies empedrades construïdes amb diverses capes de grava, sorra i lloses que permetien el pas ràpid de legions i mercaderies per tot l’imperi.',
    features: [
      'Capes sòlides de fonamentació que evitaven el fang i l’aigua.',
      'Senyalitzades amb "mil·liaris" (columnes de pedra que indicaven les milles de distància).',
      'Més de 80.000 km de calçades van vertebrar tot el Mediterrani.'
    ],
    localExample: 'La Via Augusta (travessa Catalunya des de la Jonquera fins al riu Sénia)',
    iconType: 'navigation'
  },
  {
    id: 'amfiteatre',
    name: 'Amfiteatre',
    latinName: 'Amphitheatrum',
    category: 'Espectacles',
    description:
      'Edifici de planta el·líptica (doble teatre) dissenyat expressament per als espectacles de lluites de gladiadors (munera) i caceres de feres salvatges (venationes).',
    features: [
      'Graderia inclinada (cavea) organitzada segons la classe social dels espectadors.',
      'Sorra central (arena) sota la qual hi havia galeries subterrànies (fossae) amb gàbies i trampoles.',
      'Toldos gegants (velarium) per protegir el públic del sol.'
    ],
    localExample: 'Amfiteatre Romà de Tàrraco (Tarragona, davant del mar)',
    iconType: 'shield'
  },
  {
    id: 'teatre',
    name: 'Teatre',
    latinName: 'Theatrum',
    category: 'Espectacles',
    description:
      'Edifici semicircular destinat a representacions d’obres teatrals (tragèdies i comèdies), pantomimes i cors.',
    features: [
      'Orquestra semicircular per al cor o autoritats.',
      'Escena monumental (scaenae frons) decorada amb columnes de marbre i estàtues.',
      'Acústica perfecta que permetia sentir la veu dels actors des de l’última fila.'
    ],
    localExample: 'Teatre Romà de Tàrraco i Teatre de Mèrida (Emèrita Augusta)',
    iconType: 'masks'
  },
  {
    id: 'termes',
    name: 'Termes Públiques',
    latinName: 'Thermae',
    category: 'Vida Pública',
    description:
      'Complexos de banys públics que eren el centre neuràlgic de la vida social, la higiene, l’esport i la conversa per a romans de totes les classes socials.',
    features: [
      'Circuit de tres sales: Caldarium (aigua calenta), Tepidarium (tèbia) i Frigidarium (aigua freda).',
      'Sistema de calefacció sota el terra (hipocaust) amb aire calent procedent de forns.',
      'Palaestra (pati d’exercici físic), biblioteca i zones de massatges.'
    ],
    localExample: 'Termes romanes de Caldes de Malavella o de Sant Boi de Llobregat',
    iconType: 'thermometer'
  },
  {
    id: 'forum',
    name: 'El Fòrum',
    latinName: 'Forum',
    category: 'Vida Pública',
    description:
      'Plaça pública central de tota ciutat romana, encreuament del Cardo i el Decumanus, on es concentraven els edificis polítics, religiosos i comercials més importants.',
    features: [
      'Temple dedicat a la Tríada Capitolina (Júpiter, Juno i Minerva).',
      'Basílica (edifici cobert per a la justícia i els negocis).',
      'Cúria (lloc de reunió del govern municipal) i mercats coberts (macellum).'
    ],
    localExample: 'Fòrum de la Colònia i Fòrum Provincial de Tàrraco',
    iconType: 'landmark'
  },
  {
    id: 'habitatge',
    name: 'Domus vs. Ínsula',
    latinName: 'Domus et Insulae',
    category: 'Habitatge',
    description:
      'Els dos tipus principals d’habitatge romà que reflectien la gran divisió social:',
    features: [
      'Domus: Casa unifamiliar luxosa de patricis i rics amb pati central (àtrium), estany d’aigua de pluja (impluvium) i jardí posterior amb columnes (peristil).',
      'Insula (Ínsules): Blocs de pisos de lloguer de fusta i maó de fins a 5 plantes on vivia amuntegada la plebs, amb alt risc d’incendi i esfondrament.'
    ],
    localExample: 'Domus trobades a Bàrcino (sota la plaça del Rei a Barcelona) i Empúries',
    iconType: 'home'
  }
];

export interface WordEvolution {
  latin: string;
  meaning: string;
  catala: string;
  castella: string;
  frances: string;
  italia: string;
}

export const LATIN_EVOLUTIONS: WordEvolution[] = [
  { latin: 'AQUA', meaning: 'aigua', catala: 'Aigua', castella: 'Agua', frances: 'Eau', italia: 'Acqua' },
  { latin: 'NOCTEM', meaning: 'nit', catala: 'Nit', castella: 'Noche', frances: 'Nuit', italia: 'Notte' },
  { latin: 'PATER', meaning: 'pare', catala: 'Pare', castella: 'Padre', frances: 'Père', italia: 'Padre' },
  { latin: 'SCHOLA', meaning: 'escola', catala: 'Escola', castella: 'Escuela', frances: 'École', italia: 'Scuola' },
  { latin: 'LIBER', meaning: 'llibre', catala: 'Llibre', castella: 'Libro', frances: 'Livre', italia: 'Libro' },
  { latin: 'PONTEM', meaning: 'pont', catala: 'Pont', castella: 'Puente', frances: 'Pont', italia: 'Ponte' },
  { latin: 'OCULUS', meaning: 'ull', catala: 'Ull', castella: 'Ojo', frances: 'Œil', italia: 'Occhio' },
  { latin: 'TERRA', meaning: 'terra', catala: 'Terra', castella: 'Tierra', frances: 'Terre', italia: 'Terra' }
];

export interface LawPrinciple {
  latinQuote: string;
  catalanTitle: string;
  explanation: string;
  modernImpact: string;
}

export const ROMAN_LAW_PRINCIPLES: LawPrinciple[] = [
  {
    latinQuote: 'In dubio pro reo',
    catalanTitle: 'Presumpció d’innocència',
    explanation: 'En cas de dubte, la justícia sempre ha d’afavorir l’acusat; no es pot condemnar ningú sense proves clares.',
    modernImpact: 'Base fonamental de tots els sistemes judicials democràtics moderns.'
  },
  {
    latinQuote: 'Iustitia est constans et perpetua voluntas ius suum cuique tribuendi',
    catalanTitle: 'Donar a cadascú allò que li correspon',
    explanation: 'La justícia ha de ser imparcial, constant i donar a cada persona segons la llei establerta.',
    modernImpact: 'Principi de neutralitat dels jutges i tribunals.'
  },
  {
    latinQuote: 'Nullum crimen, nulla poena sine lege',
    catalanTitle: 'Cap càstig sense una llei prèvia',
    explanation: 'Cap acte no pot ser castigat com a delicte si abans no estava expressament escrit en una llei pública.',
    modernImpact: 'Protegeix els ciutadans dels abusos i càstigs arbitraris del poder.'
  }
];
