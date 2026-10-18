export interface StudyTopic {
  id: number;
  slug: string;
  romanNumeral: string;
  title: string;
  subtitle: string;
  chronology: string;
  period: 'Monarquia' | 'República' | 'Imperi';
  summary: string;
  color: string;
  keyPoints: {
    title: string;
    description: string;
    details?: string[];
  }[];
  examTips: string[];
  didYouKnow: string;
  keyFigures: {
    name: string;
    role: string;
    description: string;
  }[];
  keyConcepts: {
    term: string;
    definition: string;
  }[];
  interactiveComparison?: {
    title: string;
    leftTitle: string;
    leftItems: string[];
    rightTitle: string;
    rightItems: string[];
  };
}

export const STUDY_TOPICS: StudyTopic[] = [
  {
    id: 1,
    slug: 'origens-monarquia',
    romanNumeral: 'I',
    title: 'Els orígens de Roma i la Monarquia',
    subtitle: 'Pobles preromans, mite de Ròmul i Rem, i els 7 reis de Roma',
    chronology: '753 aC – 509 aC',
    period: 'Monarquia',
    color: '#8b1e24',
    summary:
      "Roma neix al segle VIII aC a la riba del riu Tíber. Segons la llegenda, va ser fundada pels bessons Ròmul i Rem l'any 753 aC. Històricament, diverses tribus de pastors llatins i sabins es van agrupar als set turons per defensar-se. Durant dos segles i mig, Roma va estar governada per set reis (primer d'origen llatí-sabí i després etruscs), fins a la caiguda de Tarquini el Superb.",
    keyPoints: [
      {
        title: '1. Els pobles preromans de la península Itàlica',
        description:
          "Abans de l'ascens de Roma, la península Itàlica estava habitada per diferents pobles amb cultures molt variades:",
        details: [
          'Itàlics (centre): Pobles indoeuropeus com els llatins (al Laci) i els sabins.',
          'Etruscs (nord): Civilització avançada, grans comerciants, mestres de l’art, l’enginyeria i la metal·lúrgia. Van influir decisivament en Roma.',
          'Grecs (sud i Sicília): La Magna Grècia, amb polis pròsperes que van transmetre l’alfabet, la moneda, el teatre i la mitologia.'
        ]
      },
      {
        title: '2. La fundació de Roma: Mite vs. Realitat Històrica',
        description:
          "Dues explicacions per al naixement d'una de les civilitzacions més poderoses de la història:",
        details: [
          'El mite (753 aC): Els déus Mart i Rea Sílvia van engendrar Ròmul i Rem. Llançats al Tíber en una cistella, van ser alletats per la lloba Luperca. Ròmul va traçar el perímetre sagrat al turó Palatí, va matar Rem per desobeir i va fundar Roma.',
          'La realitat arqueològica: Cap al segle VIII aC, petits poblats de pastors llatins i sabins van establir cabanes sobre els turons (sobretot el Palatí) per fugir de les zones pantanoses i vigilar el pas comercial del riu Tíber (el gual de l’Illa Tiberina).'
        ]
      },
      {
        title: '3. L’etapa de la Monarquia (753 – 509 aC)',
        description:
          "Roma va tenir 7 reis. El rei concentrava el poder militar, judicial i religiós, assessorat pel Senat (consell d'ancians nobles):",
        details: [
          '4 primers reis llatins i sabins: Ròmul (fundador i institucions), Numa Pompili (religió i calendari), Tul·li Hostili (conquestes militars) i Anc Marci (port d’Òstia).',
          '3 últims reis etruscs: Tarquini el Vell (claveguera màxima, Circ Màxim), Servi Tul·li (primeres muralles i cens) i Tarquini el Superb (un tirà cruel).',
          'Fi de la monarquia: L’any 509 aC, el poble i els patricis es van revoltar contra la tirania de Tarquini el Superb i van proclamar la República.'
        ]
      },
      {
        title: '4. La societat romana primitiva: Patricis i Plebeus',
        description:
          'Des dels orígens, la societat romana va quedar dividida de manera molt desigual:',
        details: [
          'Patricis: Minoria rica, propietaris de les terres ("gens"). Es consideraven descendents dels primers fundadors. Posseïen tots els drets polítics i religiosos.',
          'Plebeus: La majoria de la població (pagesos, artesans, comerciants). Eren lliures i pagaven impostos, però no tenien drets polítics ni podien casar-se amb patricis.',
          'Esclaus: Presoners de guerra o persones amb deutes, no considerats persones sinó propietats.'
        ]
      }
    ],
    examTips: [
      'Recorda la data mítica de la fundació: 753 aC.',
      'Recorda la data de la fi de la monarquia: 509 aC.',
      'Diferència clau: Els etruscos van transformar el poblat de cabanes en una veritable ciutat emmurallada.',
      'Saber qui eren els patricis (nobles fundadors) i els plebeus (poble corrent sense drets polítics inicials).'
    ],
    didYouKnow:
      "La famosa lloba de la llegenda s'anomena Luperca. En llatí antic, la paraula 'lupa' significava lloba, però també era una expressió col·loquial per a una prostituta; alguns historiadors creuen que qui va rescatar els nadons podria haver estat l'esposa d'un pastor anomenada Àccia Laurència!",
    keyFigures: [
      {
        name: 'Ròmul',
        role: 'Primer rei i fundador mític',
        description: 'Va traçar el solc sagrat al turó Palatí i va crear el primer Senat romà de 100 membres.'
      },
      {
        name: 'Tarquini el Superb',
        role: 'Últim rei de Roma (etrusc)',
        description: 'La seva tirania va provocar la revolta popular del 509 aC que va posar fi a la monarquia per sempre.'
      }
    ],
    keyConcepts: [
      {
        term: 'Patricis',
        definition: 'Famílies aristocràtiques descendents dels fundadors de Roma amb plens drets polítics.'
      },
      {
        term: 'Plebeus',
        definition: 'Membres del poble lliure (camperols, artesans) que inicialment no tenien representació política.'
      },
      {
        term: 'Turó Palatí',
        definition: 'El turó central de Roma on van aparèixer les primeres cabanes del segle VIII aC.'
      },
      {
        term: 'Senat (Senatus)',
        definition: 'De "senex" (vell), consell d’ancians caps de les famílies patrícies que aconsellaven el rei.'
      }
    ],
    interactiveComparison: {
      title: 'Societat a la Roma primitiva',
      leftTitle: 'Patricis (Aristocràcia)',
      leftItems: [
        'Propietaris de les millors terres (latifundis)',
        'Descendents dels primers pobladors de Roma',
        'Ocupaven tots els càrrecs del Senat i sacerdocis',
        'Tenien el monopoli de les lleis (costums orals)'
      ],
      rightTitle: 'Plebeus (Poble comú)',
      rightItems: [
        'Camperols, artesans, pastors i petits comerciants',
        'Població lliure que pagava tributs a l’Estat',
        'Obligats a servir com a soldats a l’exèrcit',
        'Sense vot ni poder d’escollir els governants'
      ]
    }
  },
  {
    id: 2,
    slug: 'la-republica',
    romanNumeral: 'II',
    title: 'La República Romana i les seves institucions',
    subtitle: 'El Cursus Honorum, el Senat i la lluita pels drets dels plebeus',
    chronology: '509 aC – 27 aC',
    period: 'República',
    color: '#9e1f27',
    summary:
      'Proclamada la República (509 aC), el lema va ser SPQR ("Senatus Populusque Romanus"). El poder ja no requeia en una sola persona, sinó en magistratures col·legiades i anuals, el Senat i les assemblees populars (Comicis). Durant segles, els plebeus van protagonitzar greus conflictes per aconseguir la igualtat de drets cívics i polítics amb els patricis.',
    keyPoints: [
      {
        title: '1. Com funcionava la República romana?',
        description:
          'El govern republicà es basava en tres grans pilars:',
        details: [
          'Els Comicis: Assemblees de ciutadans que votaven les lleis i elegien els magistrats.',
          'Les Magistratures: Càrrecs de govern temporals (normalment 1 any) i col·legiats (mínim 2 persones amb dret a veto mutu per evitar tiranies). La carrera política s’anomenava "Cursus Honorum".',
          'El Senat: La institució amb més poder real. Format per antics magistrats vitalicis (uns 300). Dirigia la política exterior, controlava les finances de l’Estat i aconsellava les lleis.'
        ]
      },
      {
        title: '2. El Cursus Honorum (La cursa dels honors)',
        description:
          'L’escala d’ascens polític que tot magistrat romà havia de seguir obligatòriament:',
        details: [
          'Qüestor (primer esglaó): Administrava els diners públics i recaptava impostos.',
          'Edil: S’encarregava del manteniment de la ciutat, l’ordre als carrers i l’organització dels jocs públics.',
          'Pretor: Administrava la justícia i podia dirigir petits cossos d’exèrcit.',
          'Cònsol (màxim honor): N’hi havia dos. Eren els caps suprems de l’Estat i comandaven els grans exèrcits.',
          'Censor (càrrec especial cada 5 anys): Elaborava el cens de ciutadans i vigilava la moral pública.',
          'Dictador (només en cas d’emergència extrema): Poders absoluts durant un màxim de 6 mesos.'
        ]
      },
      {
        title: '3. El conflicte patricis vs. plebeus: la conquesta de drets',
        description:
          'Com que els plebeus anaven a la guerra però no podien governar, es van rebel·lar:',
        details: [
          'La vaga del Mont Sacre (494 aC): Els plebeus van abandonar Roma i es van negar a lluitar fins que no se’ls concedissin drets.',
          'El Tribú de la Plebs: Creació de dos magistrats plebeus amb la capacitat sagrada de "VETO" (prohibir qualsevol llei patrícia que perjudiqués el poble). La seva persona era intocable (inviolable).',
          'La Llei de les XII Taules (450 aC): Primer codi de lleis escrites de Roma, exposat al Fòrum perquè ningú no fos jutjat arbitràriament.',
          'Matrimonis mixtos i accés al consolat: Més tard es van permetre els casaments entre patricis i plebeus i un dels dos cònsols va passar a ser obligatòriament plebeu.'
        ]
      }
    ],
    examTips: [
      'SPQR significa: "Senatus Populusque Romanus" (El Senat i el Poble Romà).',
      'Recorda que els magistrats duraven NOMÉS UN ANY i eren MÍNIM DOS (col·legialitat) per evitar la tornada de la monarquia.',
      'Saber la funció clau del Tribú de la Plebs i el dret de VETO ("Prohibeixo").',
      'La importància de la Llei de les XII Taules: primeres lleis escrites per garantir la igualtat.'
    ],
    didYouKnow:
      "La paraula 'veto' ve directament del llatí i significa literalment 'm'hi oposo' o 'ho prohibeixo'. Quan un Tribú de la Plebs cridava 'Veto!' davant del Senat, qualsevol decisió dels patricis quedava immediatament paralitzada!",
    keyFigures: [
      {
        name: 'Meneni Agripa',
        role: 'Senador mediador',
        description: 'Va convèncer els plebeus de tornar del Mont Sacre explicant la faula del cos humà: si els braços (plebeus) no alimenten l’estómac (Senat), tot el cos mor.'
      },
      {
        name: 'Cincinnat',
        role: 'Dictador romà modèlic',
        description: 'Va ser cridat per salvar Roma d’una invasió. Va acceptar la dictadura, va vèncer l’enemic en 16 dies i va tornar immediatament a llaurar el seu petit camp.'
      }
    ],
    keyConcepts: [
      {
        term: 'Cursus Honorum',
        definition: 'La carrera política reglada que els ciutadans romans havien de seguir esglaó a esglaó.'
      },
      {
        term: 'Tribú de la Plebs',
        definition: 'Magistrat sagrat que defensava els ciutadans comuns i tenia poder absolut de veto.'
      },
      {
        term: 'Cònsol',
        definition: 'Els dos magistrats suprems que governaven la República i manaven les legions.'
      },
      {
        term: 'Llei de les XII Taules',
        definition: 'Primer codi de lleis escrites de la història de Roma (450 aC), gravades en bronze.'
      }
    ],
    interactiveComparison: {
      title: 'Les Institucions Republicanes',
      leftTitle: 'Magistrats',
      leftItems: [
        'Cònsols: Cap suprem i exèrcit (2 membres)',
        'Pretors: Justícia i jutjats',
        'Edils: Serveis de la ciutat i festes',
        'Qüestors: Tresoreria i finances',
        'Tribuns de la Plebs: Defensors del poble'
      ],
      rightTitle: 'Senat i Assemblees',
      rightItems: [
        'Senat: ~300 membres vitalicis amb gran autoritat',
        'Controlava la política exterior i les declaracions de guerra',
        'Comicis: Assemblees de ciutadans',
        'Votaven les lleis proposades pels magistrats',
        'Elegien els càrrecs públics cada any'
      ]
    }
  },
  {
    id: 3,
    slug: 'expansio-territorial',
    romanNumeral: 'III',
    title: "L'expansió territorial de la República",
    subtitle: 'La conquesta d’Itàlia i la formació del Mare Nostrum',
    chronology: 'Segles V aC – I aC',
    period: 'República',
    color: '#7b1a20',
    summary:
      "Durant la República, Roma va passar de ser una petita ciutat-estat del centre d'Itàlia a convertir-se en l'ama absoluta de la conca mediterrània. Primer va sotmetre la península Itàlica; després d'enfrontar-se a Cartago, va conquerir el Mediterrani occidental i, finalment, els regnes hel·lenístics de l'orient, fins a anomenar el mar Mediterrani 'Mare Nostrum' (el nostre mar).",
    keyPoints: [
      {
        title: '1. Fase 1: La conquesta de la península Itàlica (segles V – III aC)',
        description:
          'A través de guerres dures i continus pactes, Roma va anar guanyant terreny als pobles veïns:',
        details: [
          'Guerres contra els etruscs i llatins: Destrucció de la ciutat etrusca de Veies (396 aC).',
          'La invasió dels gals (390 aC): Els gals van saquejar Roma. Els romans van aprendre la lliçó i van millorar les seves muralles i exèrcit.',
          'Guerres Samnites: Tres guerres sagnants contra els ferotges muntanyesos del centre d’Itàlia (recordades per la humiliació de les Forques Caudines).',
          'Conquesta de la Magna Grècia (sud d’Itàlia): Victòria sobre el rei Pirros de l’Èpir. Roma dominava ja tota la península des del riu Rubicó fins a l’extrem sud.'
        ]
      },
      {
        title: '2. Fase 2: El Mediterrani Occidental (segles III – II aC)',
        description:
          'L’enfrontament colossal contra Cartago (les Guerres Púniques) va obrir les portes a nous territoris:',
        details: [
          'Sicília, Còrsega i Sardenya: Primeres províncies romanes d’ultramar.',
          'Hispània (la península Ibèrica): Els romans van desembarcar a Empúries el 218 aC per tallar els subministraments cartaginesos, començant dos segles de conquesta.',
          'Nord d’Àfrica: Destrucció de Cartago (146 aC) i creació de la província d’Àfrica.'
        ]
      },
      {
        title: '3. Fase 3: El Mediterrani Oriental (segles II – I aC)',
        description:
          'Roma va dirigir les seves legions cap a l’est ric i civilitzat:',
        details: [
          'Macedònia i Grècia: Conquistades el 146 aC (mateix any de la destrucció de Cartago i de Corint).',
          'Àsia Menor i Síria: Annexió dels antics regnes successors d’Alexandre el Gran.',
          'Egipte: Va resistir com a aliat fins a la mort de Cleopatra l’any 30 aC, quan va esdevenir província personal d’August.'
        ]
      },
      {
        title: '4. L’exèrcit romà: la clau de l’èxit militar',
        description:
          'L’organització i la disciplina fèrria de les legions:',
        details: [
          'La Legió: Unitat fonamental de l’exèrcit, composta per uns 4.000 - 5.000 homes armats (legionaris).',
          'Armament eficaç: Pilum (llança per inutilitzar l’escut enemic), Gladius (espasa curta per apunyalar de prop), Scutum (escut rectangular gran) i Lorica segmentata (armadura metàl·lica).',
          'Campaments militars (Castrum): Camps fortificats idèntics construïts cada vespre, origen de ciutats modernes (lleó, campament, fòrum).'
        ]
      }
    ],
    examTips: [
      'Concepte de "Mare Nostrum": Els romans consideraven el Mediterrani un mar interior propi envoltat per les seves províncies.',
      'Data crucial a la península Ibèrica: Arribada dels romans a Empúries l’any 218 aC.',
      'Saber com dividien els territoris conquerits: en Províncies, governades per un procònsol o propretor.',
      'Una "victòria pírrica" prové del rei Pirros: guanyar una batalla patint tantes baixes que gairebé equival a perdre.'
    ],
    didYouKnow:
      "La famosa expressió 'victòria pírrica' prové de la guerra de Roma contra el rei Pirros al sud d'Itàlia. Pirros va guanyar dues batalles als romans, però va perdre tants soldats que va exclamar: 'Una altra victòria com aquesta i estic perdut!'",
    keyFigures: [
      {
        name: 'Pirros de l’Èpir',
        role: 'Rei grec i gran estrateg',
        description: 'Va acudir a defensar la Magna Grècia amb elefants de guerra. Va derrotar els romans, però a un cost insostenible.'
      },
      {
        name: 'Camil·le (Furius Camillus)',
        role: 'General i heroi romà',
        description: 'Considerat el segon fundador de Roma per reconstruir la ciutat després del saqueig gal del 390 aC.'
      }
    ],
    keyConcepts: [
      {
        term: 'Mare Nostrum',
        definition: '"El nostre mar", expressió romana per referir-se al mar Mediterrani completament sota el seu control.'
      },
      {
        term: 'Legió',
        definition: 'Unitat tàctica bàsica de l’exèrcit romà, organitzada en centúries i cohorts.'
      },
      {
        term: 'Província',
        definition: 'Territori conquerit fora d’Itàlia administrat per un governador romà i sotmès a tributs.'
      },
      {
        term: 'Castrum',
        definition: 'Campament militar romà amb carrers ortogonals (Cardo i Decumanus), patró de moltes ciutats.'
      }
    ]
  },
  {
    id: 4,
    slug: 'guerres-puniques',
    romanNumeral: 'IV',
    title: 'Les Guerres Púniques (Roma vs. Cartago)',
    subtitle: 'El duel de titans pel domini del mar: Anníbal, els Alps i Escipió',
    chronology: '264 aC – 146 aC',
    period: 'República',
    color: '#a81c24',
    summary:
      'Cartago era una rica potència marítima d’origen fenici al nord d’Àfrica que dominava el comerç mediterrani. El xoc amb Roma va desencadenar tres guerres dramàtiques (anomenades "púniques" pel mot llatí Poeni / fenicis). Va ser la prova més perillosa per a Roma, que va estar a punt de ser destruïda per la genialitat d’Anníbal Barca abans d’aixafar Cartago per complet.',
    keyPoints: [
      {
        title: '1. La Primera Guerra Púnica (264 – 241 aC)',
        description:
          'Disputa pel control de l’illa de Sicília:',
        details: [
          'Roma no tenia flota de guerra i Cartago era la reina dels mars.',
          'L’invent del "Corvus": Els romans van instal·lar ponts mòbils amb un ganxo de ferro als seus vaixells. Quan s’enganxaven als vaixells cartaginesos, transformaven la batalla naval en un combat cos a cos.',
          'Resultat: Victòria romana. Cartago va haver de cedir Sicília, pagar una enorme indemnització i més tard va perdre Còrsega i Sardenya.'
        ]
      },
      {
        title: '2. La Segona Guerra Púnica (218 – 202 aC): La més cèlebre',
        description:
          'L’intent cartaginès de revenja liderat per la família Barca:',
        details: [
          'La base a Hispània: Amílcar Barca i després el seu fill Anníbal van conquerir gran part d’Hispània per obtenir or, plata i mercenaris.',
          'El setge de Sagunt (218 aC): Anníbal va atacar Sagunt, ciutat aliada de Roma. Això va encendre la declaració de guerra.',
          'El pas increïble dels Alps: Anníbal va sorprendre el món travessant els Pirineus i els Alps amb un exèrcit de desenes de milers de soldats i gairebé 40 elefants de guerra a l’hivern.',
          'Desastres romans: Anníbal va envair Itàlia i va aniquilar els exèrcits romans a les batalles de Trèbia, Trasimè i, sobretot, Cannes (216 aC, on van morir més de 50.000 legionaris).',
          'La resposta d’Escipió l’Africà: Roma no es va rendir. Va enviar tropes a Hispània (desembarcament a Empúries) i després Publi Corneli Escipió va portar la guerra directament a Àfrica.',
          'Batalla de Zama (202 aC): Escipió va derrotar definitivament Anníbal. Cartago es va rendir.'
        ]
      },
      {
        title: '3. La Tercera Guerra Púnica (149 – 146 aC)',
        description:
          'La destrucció definitiva de la ciutat rival:',
        details: [
          'El senador Cató el Vell repetia al final de cada discurs: "Delenda est Carthago" (Cartago ha de ser destruïda).',
          'L’any 146 aC, els romans van assaltar Cartago, van cremar la ciutat durant 17 dies, van esclavitzar els supervivents i van arrasar-la per complet.'
        ]
      }
    ],
    examTips: [
      'Identificar clarament els dos personatges claus de la 2a Guerra Púnica: Anníbal Barca (general cartaginès) i Escipió l’Africà (general romà).',
      'Saber el motiu de l’arribada dels romans a la península Ibèrica: el 218 aC a Empúries per tallar el pas d’Anníbal.',
      'Saber el nom de la batalla decisiva: Batalla de Zama (202 aC).',
      'Saber l’origen dels cartaginesos: eren d’origen fenici (d’aquí el nom "púnics").'
    ],
    didYouKnow:
      "Per travessar els Alps glaçats, les cròniques diuen que Anníbal va haver d'escalfar grans roques que bloquejaven el camí fent-hi fogueres a sobre i després ruixar-les amb vinagre per fer-les esquerdar i poder-les trencar a cops de pic!",
    keyFigures: [
      {
        name: 'Anníbal Barca',
        role: 'General suprem de Cartago',
        description: 'Un dels genis militars més grans de la història universal. Va jurar odi etern a Roma des de petit i gairebé la destrueix.'
      },
      {
        name: 'Escipió l’Africà',
        role: 'General romà vencedor',
        description: 'Va conquerir Cartago Nova (Cartagena), va expulsar els cartaginesos d’Hispània i va vèncer Anníbal a Zama.'
      }
    ],
    keyConcepts: [
      {
        term: 'Corvus (Corb)',
        definition: 'Passarel·la d’abordatge naval inventada per Roma per aprofitar la seva infanteria al mar.'
      },
      {
        term: 'Sagunt',
        definition: 'Ciutat ibèrica aliada de Roma; el seu setge per Anníbal el 218 aC va iniciar la 2a Guerra Púnica.'
      },
      {
        term: 'Cannes (216 aC)',
        definition: 'La pitjor derrota militar de la història de Roma, on Anníbal va encerclar i massacrar les legions.'
      },
      {
        term: 'Zama (202 aC)',
        definition: 'Batalla final a l’actual Tunísia on Escipió va derrotar Anníbal i va acabar la guerra.'
      }
    ]
  },
  {
    id: 5,
    slug: 'crisi-segle-i-ac',
    romanNumeral: 'V',
    title: 'La crisi del segle I aC',
    subtitle: 'Desigualtat social, els germans Grac, Mari i Sul·la, i la revolta d’Espàrtac',
    chronology: '133 aC – 44 aC',
    period: 'República',
    color: '#541418',
    summary:
      "L'expansió territorial va portar immenses riqueses a Roma, però va trencar l'equilibri social. Els rics patricis i comerciants (cavallers) es van fer immensament rics amb les terres conquerides i milers d'esclaus, mentre els camperols lliures es van arruïnar en tornar de la guerra. Els intents pacífics de reforma van fracassar amb sang, obrint pas a exèrcits privats, revoltes com la d'Espàrtac i guerres civils.",
    keyPoints: [
      {
        title: '1. Les causes de la crisi: la fractura social',
        description:
          'Per què va trontollar una república tan poderosa?',
        details: [
          'Ruïna dels camperols: Els soldats-pagesos passaven anys lluitant lluny. En tornar, trobaven els camps abandonats i no podien competir amb els grans latifundis treballats per esclaus gratuïts.',
          'Èxode rural a Roma: Milers de famílies van emigrar a Roma, convertint-se en una massa pobra i desocupada ("proletariat urbà"), que depenia dels repartiments de gra de l’Estat.',
          'Enriquiment desmesurat de l’oligarquia patrícia i els cavallers (comerciants rics).'
        ]
      },
      {
        title: '2. L’intent frustrat de reforma: Els germans Grac',
        description:
          'Dos tribuns de la plebs que van intentar salvar la situació de forma pacífica:',
        details: [
          'Tiberi Grac (133 aC): Va proposar la "Llei Agrària" per limitar la quantitat de terra pública que podien posseir els rics i repartir petites parcel·les als ciutadans pobres. Els senadors patricis el van assassinar a cops de fusta al capitoli.',
          'Gai Grac (123 aC): El seu germà petit va intentar aprovar la llei del blat barat i concedir la ciutadania als aliats itàlics. També va ser perseguit pel Senat i va morir l’any 121 aC.'
        ]
      },
      {
        title: '3. La reforma militar de Gai Mari (107 aC)',
        description:
          'Un canvi que va alterar per sempre la fidelitat de les armes:',
        details: [
          'Abans: L’exèrcit només admetia ciutadans amb terres pròpies que es pagaven les seves armes.',
          'Després de Mari: Es va crear un exèrcit professional. Qualsevol ciutadà pobre podia allistar-se; l’Estat li pagava un sou i li donava l’equip.',
          'La conseqüència perillosa: Els soldats ja no eren fidels a la República ni a les lleis, sinó al seu general, que era qui els prometia botí de guerra i terres en retirar-se.'
        ]
      },
      {
        title: '4. La revolta d’Espàrtac (73 – 71 aC)',
        description:
          'L’enorme nombre d’esclaus va generar una bomba de rellotgeria:',
        details: [
          'Espàrtac, un gladiador traci, va liderar una fuga de l’escola de gladiadors de Càpua.',
          'Va reunir un exèrcit de més de 70.000 esclaus fugitius que van derrotar diversos exèrcits romans durant dos anys.',
          'Finalment va ser vençut pel general Marc Licini Cras. Més de 6.000 esclaus supervivents van ser crucificats al llarg de la Via Àpia des de Càpua fins a Roma com a escarment.'
        ]
      },
      {
        title: '5. Guerres civils entre generals: Mari vs. Sul·la',
        description:
          'La lluita pel poder va enfrontar dos blocs polítics:',
        details: [
          'Populars (defensaven reformes a favor del poble, encapçalats per Gai Mari).',
          'Optimates (aristòcrates que defensaven els privilegis del Senat, encapçalats per Luci Corneli Sul·la).',
          'Sul·la va marxar amb les seves legions sobre la mateixa ciutat de Roma, va instaurar una dictadura sanguinària i va publicar "llistes de proscripció" per executar els seus rivals.'
        ]
      }
    ],
    examTips: [
      'Els germans Tiberi i Gai Grac van intentar reformes agràries per ajudar els camperols sense feina, però el Senat els va eliminar violentament.',
      'La reforma militar de Gai Mari va crear un exèrcit professional, fent que els soldats fossin fidels al general i no al Senat.',
      'Espàrtac va ser el gladiador que va liderar la revolta d’esclaus més important de la història de Roma (73-71 aC).',
      'Distinció clau: Populars (reforms pel poble) vs. Optimates (defensa dels privilegis del Senat).'
    ],
    didYouKnow:
      "A l'època de la crisi del segle I aC, a la ciutat de Roma hi havia tants esclaus que el Senat va discutir posar-los un uniforme per identificar-los fàcilment. Al final van rebutjar la idea perquè es van adonar que, si els esclaus veien quants eren en realitat, s'adonarien de la seva força i es rebel·larien tots!",
    keyFigures: [
      {
        name: 'Tiberi i Gai Grac',
        role: 'Tribuns de la Plebs reformistes',
        description: 'Germans patricis que van defensar els drets dels pobres i la reforma agrària; van pagar amb la vida les seves idees.'
      },
      {
        name: 'Espàrtac',
        role: 'Líder de la gran rebel·lió d’esclaus',
        description: 'Gladiador rebel que va posar en escac la República romana durant dos anys desafiant les legions.'
      }
    ],
    keyConcepts: [
      {
        term: 'Latifundi',
        definition: 'Gran propietat agrària en mans d’un sol ric patrici treballada massivament per mà d’obra esclava.'
      },
      {
        term: 'Exèrcit professional',
        definition: 'Exèrcit de soldats a sou (mercenaris ciutadans) fidels al seu general per davant de les lleis de la ciutat.'
      },
      {
        term: 'Optimates i Populars',
        definition: 'Els dos partits o faccions enfrontades a la República romana final.'
      },
      {
        term: 'Proscripció',
        definition: 'Llistes públiques creades per Sul·la amb els noms d’enemics que podien ser assassinats sense judici.'
      }
    ]
  },
  {
    id: 6,
    slug: 'juli-cesar',
    romanNumeral: 'VI',
    title: 'Juli Cèsar: De la conquesta de la Gàl·lia a la dictadura',
    subtitle: 'El Primer Triumvirat, "Alea iacta est" i els Idus de Març',
    chronology: '100 aC – 44 aC',
    period: 'República',
    color: '#87181e',
    summary:
      'Gai Juli Cèsar és la figura més famosa de la Roma Antiga. Militar brillant, polític hàbil i orador de gran carisma, va conquerir tota la Gàl·lia per a Roma. Quan el Senat li va ordenar desarmar-se, va creuar el riu Rubicó desencadenant la guerra civil contra Pompeu. Victoriós, es va nomenar dictador perpètua, fins que un grup de senadors republicans el va apunyalar mortalment als Idus de Març del 44 aC.',
    keyPoints: [
      {
        title: '1. El Primer Triumvirat (60 aC)',
        description:
          'Pacte secret entre els tres homes més poderosos de Roma per repartir-se el control del poder:',
        details: [
          'Gai Juli Cèsar: Jove polític ambiciós i líder de la facció popular, necessitava suport militar i diners.',
          'Gneu Pompeu Magne: El general més victoriós de l’època, volia terres per als seus veterans de guerra.',
          'Marc Licini Cras: L’home més ric de tot Roma, volia influència política i conquestes militars.',
          'Cèsar aconsegueix ser escollit cònsol l’any 59 aC i posteriorment se li atorga el comandament de les tropes a la Gàl·lia.'
        ]
      },
      {
        title: '2. La conquesta de la Gàl·lia (58 – 50 aC)',
        description:
          'Cèsar va demostrar la seva extraordinària capacitat estratègica:',
        details: [
          'Va conquerir tot el territori de la França, Bèlgica i Suïssa actuals, duplicant la seva glòria i guanyant la lleialtat cega de les seves legions.',
          'Va creuar el Rin cap a Germània i va desembarcar per primer cop a Britània.',
          'El setge d’Alèsia (52 aC): El capitost gal Vercingetòrix va unir totes les tribus gal·les contra Roma. Cèsar va construir una doble línia de muralles al voltant de la fortalesa d’Alèsia per assetjar-los i protegir-se dels reforços gals a la vegada. Vercingetòrix es va rendir.'
        ]
      },
      {
        title: '3. El pas del Rubicó i la Guerra Civil (49 – 45 aC)',
        description:
          'El punt de no retorn que va destruir la República tradicional:',
        details: [
          'Mort de Cras a la batalla de Carres (53 aC): El triumvirat es trenca.',
          'Pompeu s’alia amb el Senat i els optimates per por al poder de Cèsar, i el Senat ordena a Cèsar dissoldre les seves legions.',
          'Alea iacta est ("La sort està tirada"): El gener del 49 aC, Cèsar creua amb la Legió XIII el riu Rubicó (el límit sagrat que cap general amb armes podia traspassar). Això significava declarar la guerra civil.',
          'Batalla de Farsàlia (48 aC): Cèsar derrota Pompeu a Grècia. Pompeu fuig a Egipte, on és assassinat pels consellers del jove faraó Ptolemeu.'
        ]
      },
      {
        title: '4. La dictadura de Cèsar i les reformes',
        description:
          'Amo indiscutible de Roma, Cèsar va aplicar reformes de gran impacte:',
        details: [
          'Nomenat Dictador perpètua l’any 44 aC.',
          'Reforma del calendari: Crea el Calendari Julià de 365 dies i anys de traspàs (la base del nostre calendari actual).',
          'Repartiment de terres a milers de veterans i pobres de Roma a les províncies.',
          'Va concedir la ciutadania romana a habitants de la Gàl·lia i va ampliar el Senat a 900 membres amb gent provincial.'
        ]
      },
      {
        title: '5. Els Idus de Març (15 de març del 44 aC): El magnicidi',
        description:
          'La fi tràgica d’un home que acumulava massa poder:',
        details: [
          'Més de 60 senadors, liderats per Marc Juni Brut i Cassi, van conspirar contra ell tement que volgués proclamar-se Rei.',
          'Durant una reunió del Senat al Teatre de Pompeu, el van envoltar i li van clavar 23 punyalades.',
          'La famosa frase tràgica a Brut: "Tu també, fill meu?" (Kai su, teknon?).',
          'Els conspiradors creien que restauraven la República, però en realitat van provocar una nova guerra civil que acabaria amb ella.'
        ]
      }
    ],
    examTips: [
      'Els membres del Primer Triumvirat: Cèsar, Pompeu i Cras (60 aC).',
      'Significat de la frase del Rubicó: "Alea iacta est" (La sort està tirada / Els daus estan tirats), que marca el començament de la guerra civil.',
      'Saber qui era Vercingetòrix: el cabdill que va unir les tribus gal·les i va ser vençut a Alèsia.',
      'Data de la mort de Cèsar: 15 de març del 44 aC (els Idus de Març), assassinat al Senat.'
    ],
    didYouKnow:
      "El mes de juliol es diu així en honor a Juli Cèsar! Com que havia nascut en aquest mes (abans anomenat Quintilis en llatí), el Senat va decidir canviar el nom del mes a 'Iulius' per recordar la seva gran reforma del calendari.",
    keyFigures: [
      {
        name: 'Gai Juli Cèsar',
        role: 'Conqueridor de la Gàl·lia i dictador perpètua',
        description: 'Líder carismàtic que va transformar el destí de Roma i va inaugurar el camí cap a l’Imperi.'
      },
      {
        name: 'Vercingetòrix',
        role: 'Cabdill arvern i heroi de la resistència gal·la',
        description: 'Va liderar la rebel·lió de tots els pobles gals fins a la seva rendició a Alèsia el 52 aC.'
      },
      {
        name: 'Marc Juni Brut',
        role: 'Senador i cap dels conspiradors',
        description: 'Fill adoptiu de confiança de Cèsar que va clavar-li la punyalada creient salvar la República.'
      }
    ],
    keyConcepts: [
      {
        term: 'Triumvirat',
        definition: 'Govern de tres homes amb poders extraordinaris (el Primer: Cèsar, Pompeu i Cras).'
      },
      {
        term: 'Alea iacta est',
        definition: '"La sort està tirada", frase pronunciada per Cèsar en travessar el riu Rubicó l’any 49 aC.'
      },
      {
        term: 'Idus de Març',
        definition: 'El 15 de març del calendari romà, dia del famós assassinat de Cèsar l’any 44 aC.'
      },
      {
        term: 'Calendari Julià',
        definition: 'Calendari solar de 365 dies i un any de traspàs cada quatre anys impulsat per Cèsar.'
      }
    ]
  },
  {
    id: 7,
    slug: 'imperi-roma',
    romanNumeral: 'VII',
    title: "L'Imperi Romà: D'August a la crisi del segle III",
    subtitle: 'Octavi August, la Pax Romana, la romanització i la crisi del segle III dC',
    chronology: '27 aC – 284 dC',
    period: 'Imperi',
    color: '#2d0d0f',
    summary:
      "Després de l'assassinat de Cèsar i noves guerres civils, Octavi (fill adoptiu de Cèsar) es va convertir en el primer emperador de Roma l'any 27 aC amb el títol d'August. Va mantenir les aparences republicanes però va concentrar tot el poder suprem. Els segles I i II dC van viure l'època daurada de la 'Pax Romana' i la profunda romanització de les províncies, abans que la greu crisi del segle III dC posés l'Imperi a la vora del col·lapse.",
    keyPoints: [
      {
        title: '1. El naixement de l’Imperi: Octavi August (27 aC – 14 dC)',
        description:
          'Com va organitzar August el nou sistema polític?',
        details: [
          'Concentració de poders: August va ser Príncep (primer dels ciutadans), Imperator (cap suprem de l’exèrcit), Pontífex Màxim (màxima autoritat religiosa) i tenia el poder tribunici (inviolabilitat i veto).',
          'Control del Senat: No va dissoldre el Senat, sinó que el va omplir de partidaris seus i li va deixar la gestió de les províncies pacífiques, reservant-se per a ell les províncies frontereres amb legions.',
          'Creació de la Guàrdia Pretoriana: Cos militar d’elit encarregat de protegir la persona de l’emperador a Roma.',
          'Dita cèlebre d’August: "Vaig trobar una Roma de maons i us deixo una ciutat de marbre".'
        ]
      },
      {
        title: '2. La Pax Romana (segles I i II dC)',
        description:
          'L’etapa de màxima estabilitat, comerç i esplendor de l’Imperi:',
        details: [
          'Més de dos segles de pau interior i prosperitat econòmica.',
          'Màxima extensió territorial amb l’emperador Trajà (nascut a Hispània): L’imperi anava des de Britània fins al golf Pèrsic i des del Rin fins al desert del Sàhara.',
          'Gran xarxa comercial protegida pel "Mare Nostrum" lliure de pirates i les calçades romanes.'
        ]
      },
      {
        title: '3. La Romanització: La transformació de les províncies',
        description:
          'Procés pel qual els pobles conquerits van assimilar la llengua, cultura, lleis i estil de vida romà:',
        details: [
          'La llengua: El llatí es va convertir en la llengua comuna i administrativa, donant lloc a les llengües romàniques (com el català!).',
          'El Dret Romà: Sistema jurídic escrit avançat amb principis vigents avui com "tothom és innocent fins que es demostri el contrari".',
          'L’urbanisme i les ciutats: Construcció de fòrums, termes, teatres, amfiteatres (Coliseu), circs i aqüeductes (com el Pont del Diable a Tàrraco).',
          'Xarxa de calçades: Més de 80.000 km de vies empedrades (com la Via Augusta que travessa Catalunya) que connectaven tot l’Imperi.',
          'Edicte de Caracal·la (212 dC): Concessió de la ciutadania romana a tots els homes lliures de l’Imperi.'
        ]
      },
      {
        title: '4. La Crisi del segle III dC (235 – 284 dC)',
        description:
          'Per què va trontollar l’Imperi cinquanta anys?',
        details: [
          'Inestabilitat militar: Més de 25 emperadors en 50 anys, la majoria assassinats per les seves pròpies tropes ("anarquia militar").',
          'Amenaça a les fronteres (limes): Els pobles bàrbars (germànics: francs, alamans, gots) van començar a trencar les fronteres del Rin i Danubi; a l’est, l’Imperi Persa Sassànida atacava.',
          'Crisi econòmica i inflació: La fi de les grans conquestes va tallar l’arribada d’or i esclaus. Les monedes es van devaluar i el comerç es va col·lapsar.',
          'Ruralització: Els ciutadans van fugir de les ciutats insegures cap als camps emmurallats, donant lloc als primers orígens del feudalisme.'
        ]
      }
    ],
    examTips: [
      'Octavi August va ser el PRIMER emperador de Roma (l’any 27 aC comença l’Imperi).',
      'Definir amb exactitud "Romanització": Adopció de la cultura, la llengua (llatí), les lleis (dret romà) i la vida urbana romana pels pobles conquerits.',
      'Saber exemples de monuments romans a Catalunya (com l’amfiteatre i aqüeducte de Tàrraco, la Via Augusta, muralles de Bàrcino).',
      'Les causes clau de la crisi del segle III: invasions bàrbares, fallida econòmica i inestabilitat militar (emperadors assassinats pels seus legionaris).'
    ],
    didYouKnow:
      "La famosa Via Augusta, que recorria tot el llevant de la península Ibèrica des dels Pirineus fins a Cadis, té més de 1.500 km. Avui en dia, la carretera N-340 i gran part de l'autopista AP-7 segueixen exactament el mateix traçat que van dissenyar els enginyers romans fa més de dos mil anys!",
    keyFigures: [
      {
        name: 'Octavi August',
        role: 'Primer emperador de Roma',
        description: 'Va pacificar l’estat, va remodelar la ciutat de Roma i va inaugurar dos segles de Pax Romana.'
      },
      {
        name: 'Trajà',
        role: 'Emperador nascut a Hispània (Itàlica)',
        description: 'Sota el seu regnat (98-117 dC), l’Imperi Romà va assolir la seva màxima extensió territorial de la història.'
      },
      {
        name: 'Dioclecià',
        role: 'Emperador que posa fi a la crisi del s. III',
        description: 'L’any 284 dC va crear la Tetrarquia (govern de quatre) i va dividir l’imperi per facilitar-ne la defensa.'
      }
    ],
    keyConcepts: [
      {
        term: 'Pax Romana',
        definition: 'Període de pau i màxima prosperitat econòmica de l’Imperi durant els segles I i II dC.'
      },
      {
        term: 'Romanització',
        definition: 'Procés d’assimilació de la llengua llatina, el dret romà i la vida urbana per part dels pobles sotmesos.'
      },
      {
        term: 'Limes',
        definition: 'Frontera fortificada de l’Imperi Romà defensada per legions i torres de vigilància (Rin, Danubi, mur de Hadrià).'
      },
      {
        term: 'Guàrdia Pretoriana',
        definition: 'Cos militar d’elit encarregat de protegir l’emperador a Roma, amb gran influència política.'
      }
    ],
    interactiveComparison: {
      title: 'Les Tres Etapes de la Història de Roma',
      leftTitle: 'Monarquia & República',
      leftItems: [
        'Monarquia (753 - 509 aC): 7 reis amb Senat consultiu',
        'República (509 - 27 aC): Govern col·legiat i anual',
        'Magistratures compartides (2 cònsols, pretors, edils)',
        'Els ciutadans votaven lleis als Comicis'
      ],
      rightTitle: 'L’Imperi Romà (27 aC endavant)',
      rightItems: [
        'Imperi (27 aC - 476 dC a Occident)',
        'Un sol Emperador concentra tot el poder militar i religiós',
        'El Senat perd poder real i esdevé un òrgan honorífic',
        'Època de Pax Romana, romanització i expansió màxima'
      ]
    }
  },
  {
    id: 8,
    slug: 'economia-i-primer-cristianisme',
    romanNumeral: 'VIII',
    title: 'L’Economia Romana i el Primer Cristianisme',
    subtitle: 'Agricultura, comerç, explotació de províncies i del martiri a religió oficial',
    chronology: 'Segle I aC – Segle IV dC (380 dC)',
    period: 'Imperi',
    color: '#0d9488',
    summary:
      "La prosperitat de Roma es fonamentava en una agricultura productiva (la trilogia mediterrània de blat, oliva i vinya amb l'arada romana i regadiu), una xarxa de calçades que unia tot l'Imperi i una moneda sòlida. A més, Roma explotava els territoris conquerits obtenint mà d'obra esclava, impostos i béns confiscats. En aquest context neix a Judea el cristianisme amb Jesús de Natzaret; tot i les persecucions inicials per negar la divinitat imperial, l'Edicte de Milà (313) i l'Edicte de Teodosi (380) el van transformar en la religió oficial de tot l'Imperi.",
    keyPoints: [
      {
        title: '1. L’Agricultura Romana',
        description: 'La base fonamental de l’economia i alimentació del món romà:',
        details: [
          'Trilogia mediterrània: El cultiu bàsic de tres productes essencials: Blat (per fer la farina i el pa de cada dia), Oliva (oli per cuinar, conservar i enllumenar llànties) i Vinya (producció de vi consumit per totes les classes socials).',
          'Agricultura de regadiu: Ús de canals, aqüeductes, sínies i séquies per augmentar la producció d’hortalisses i fruiters.',
          'Arada romana: Eina agrícola de fusta amb rella de ferro arrossegada per bous que permetia llaurar més profundament i airejar la terra.'
        ]
      },
      {
        title: '2. El Comerç i la Xarxa de Transports',
        description: 'Un mercat gegantí que connectava tres continents:',
        details: [
          'Xarxa de calçades: Més de 80.000 km de vies de pedra (com la Via Augusta que travessa Catalunya) que permetien el pas ràpid de legions i de mercaderies.',
          'Moneda sòlida: Ús generalitzat del denari de plata i el sesterci de bronze, acceptats i utilitzables arreu de totes les províncies de l’Imperi.',
          'Comerç marítim: Flotes d’ànfores que transportaven blat d’Egipte, oli de la Bètica i vi de la Tarraconense cap al port d’Òstia a Roma.'
        ]
      },
      {
        title: '3. L’Explotació dels Territoris Conquerits',
        description: 'Com Roma aprofitava la riquesa de les províncies sotmeses:',
        details: [
          'Esclaus: Captura de milers de presoners de guerra com a mà d’obra gratuïta per a les mines, els grans latifundis i el servei domèstic.',
          'Impostos: Tributs anuals obligatoris en moneda i en espècie per finançar l’exèrcit i les despeses de l’Estat romà.',
          'Confiscació de béns: Expropiació de les millors terres i tresors dels pobles venuts a favor de Roma (ager publicus).'
        ]
      },
      {
        title: '4. El Primer Cristianisme: Orígens i Doctrina',
        description: 'El naixement d’una nova fe monoteista a l’Orient de l’Imperi:',
        details: [
          'Orígens: Sorgeix a Judea (Orient Mitjà) al segle I dC a partir de la predicació de Jesús de Natzaret.',
          'Bases doctrinals: Els ensenyaments es recullen en el Nou Testament (els quatre Evangelis, les cartes de sant Pau i els Fets dels Apòstols).',
          'Missatge revolucionari: Defensava la igualtat de tots els éssers humans davant de Déu (inclosos esclaus, dones i pobres) i la vida eterna.'
        ]
      },
      {
        title: '5. Roma i els Cristians: De les Persecucions a Religió Oficial',
        description: 'L’evolució del cristianisme dins de l’Imperi Romà:',
        details: [
          'Negació de la divinitat de l’emperador: Els cristians eren monoteistes i es negaven a rendir culte als déus tradicionals i a adorar l’emperador com un déu.',
          'Persecució i martiri: Durant tres segles, molts emperadors (com Neró o Dioclecià) els van culpar de deslleialtat i els van condemnar a morir a l’arena del circ; es reunien clandestinament a les catacumbes.',
          'Edicte de Milà (313 dC): L’emperador Constantí autoritza la nova religió cristiana, decreta la llibertat de culte i ell mateix s’acaba convertint al cristianisme.',
          'Teodosi (380 dC): Mitjançant l’Edicte de Tessalònica, l’emperador Teodosi el Gran converteix el cristianisme en l’única religió oficial de tot l’Imperi Romà.'
        ]
      }
    ],
    examTips: [
      'Els tres cultius de la trilogia mediterrània: Blat, oliva i vinya.',
      'Saber les 3 formes d’explotació dels territoris conquerits: Esclaus, impostos i confiscació de béns.',
      'Per què perseguien els cristians: Perquè negaven la divinitat de l’emperador i el culte als déus pagans.',
      'Dues dates fonamentals per a l’examen: Any 313 (Edicte de Milà de Constantí que autoritza la religió) i Any 380 (Teodosi la fa religió oficial).'
    ],
    didYouKnow:
      "Per alimentar el milió d'habitants de Roma, arribaven cada any més de 20 milions d'ànfores d'oli d'oliva procedents d'Hispània (la Bètica). Quan es buidaven, les trencaven i les acumulaven en un abocador gegant que encara existeix avui a Roma: el Mont Testaccio, un turó artificial de 50 metres d'alçada format exclusivament per trossos de ceràmica romana!",
    keyFigures: [
      {
        name: 'Jesús de Natzaret',
        role: 'Fundador del cristianisme',
        description: 'Va predicar a Galilea i Judea un missatge d’amor, perdó i salvació que va donar origen a la fe cristiana.'
      },
      {
        name: 'Constantí el Gran',
        role: 'Emperador romà (306 - 337 dC)',
        description: 'Va promulgar l’Edicte de Milà l’any 313 dC, aturant les persecucions i legalitzant el cristianisme a tot l’Imperi.'
      },
      {
        name: 'Teodosi I el Gran',
        role: 'Emperador romà (379 - 395 dC)',
        description: 'L’any 380 dC va declarar el cristianisme religió oficial de l’Imperi i el 395 el va dividir entre els seus dos fills.'
      }
    ],
    keyConcepts: [
      {
        term: 'Trilogia mediterrània',
        definition: 'Els tres conreus essencials de l’agricultura romana: blat, olivera (oli) i vinya (vi).'
      },
      {
        term: 'Arada romana',
        definition: 'Eina agrícola de fusta amb punta de ferro arrossegada per bous que permetia obrir solcs profunds a la terra.'
      },
      {
        term: 'Edicte de Milà (313)',
        definition: 'Decret de l’emperador Constantí que aturava les persecucions i establia la llibertat religiosa a l’Imperi Romà.'
      },
      {
        term: 'Religió oficial (380)',
        definition: 'Proclamació de l’emperador Teodosi que convertia el cristianisme en l’única fe legal de l’Imperi Romà.'
      }
    ],
    interactiveComparison: {
      title: 'El Cristianisme a Roma: Abans i Després',
      leftTitle: 'Segles I – III (Persecucions)',
      leftItems: [
        'Religió il·legal i clandestina',
        'Reunions secretes a les catacumbes de Roma',
        'Negativa a adorar l’emperador com a déu',
        'Martiri i condemnes a morir a l’arena del circ'
      ],
      rightTitle: 'Segle IV endavant (Legal i Oficial)',
      rightItems: [
        'Any 313: Edicte de Milà de Constantí (Legalització)',
        'Construcció de grans basíliques cristianes',
        'Any 380: Teodosi el declara Religió Oficial',
        'Els bisbes i l’Església adquireixen gran poder social'
      ]
    }
  },
  {
    id: 9,
    slug: 'crisi-i-fi-imperi-occident',
    romanNumeral: 'IX',
    title: 'La Crisi i la Fi de l’Imperi Romà d’Occident',
    subtitle: 'Decadència econòmica, invasions germàniques, divisió del 395 i caiguda el 476 dC',
    chronology: 'Segle III dC – 476 dC',
    period: 'Imperi',
    color: '#7f1d1d',
    summary:
      "A partir del segle III, la fi de les grans conquestes va provocar una forta manca d'esclaus i el descens de la producció agrícola i del comerç. Les invasions bàrbares van generar gran inseguretat i van obligar a encarir l'exèrcit. L'any 395 dC, Teodosi va dividir l'Imperi entre Occident (Roma) i Orient (Bizanci). Els pobles germànics (vàndals, alans, sueus, visigots) i els huns d'Àtila van penetrar a les províncies, Alaric va saquejar Roma el 410 dC i, finalment, el 476 dC el cabdill Odoacre va deposar Ròmul Augústul: l'Imperi d'Occident s'enfonsava, finalitzant l'Edat Antiga i començant l'Edat Mitjana.",
    keyPoints: [
      {
        title: '1. La Decadència Política i Econòmica',
        description: 'Les causes internes que van debilitar l’Imperi:',
        details: [
          'S’acaba la conquesta de nous territoris: Al no expandir-se més, s’atura l’arribada de nous botins de guerra.',
          'Manca d’esclaus: La societat romana depenia dels presoners esclaus; en no haver-n’hi, es produeix un greu descens de la producció agrícola i minera.',
          'Invasions bàrbares i inseguretat: Les fronteres del Rin i Danubi són forçades constantment per tribus germàniques.',
          'Augment de despeses militars: Cal reclutar més tropes i apujar impostos a una població arruïnada per intentar defensar les fronteres.',
          'Reducció del comerç i tall de les comunicacions: Les calçades i rutes marítimes esdevenen insegures pels atacs, s’arruïnen els comerciants i la gent fuig de les ciutats cap al camp (ruralització).'
        ]
      },
      {
        title: '2. La Divisió de l’Imperi per l’Emperador Teodosi (395 dC)',
        description: 'La separació definitiva de dos destins històrics:',
        details: [
          'Divisió el 395 dC: A la seva mort, l’emperador Teodosi reparteix l’Imperi entre els seus dos fills per facilitar-ne la defensa i el govern.',
          'Imperi Romà d’Occident: Capital a Roma (i després Milà i Ravenna), per al seu fill Honori. Menys poblat, empobrit, amb fronteres extenses i molt vulnerable a les invasions.',
          'Imperi Romà d’Orient: Capital a Bizanci / Constantinoble, per al seu fill Arcadi. Molt més ric, amb gran activitat comercial i que resistirà mil anys més (fins al 1453).'
        ]
      },
      {
        title: '3. Les Invasions Germàniques a l’Occident',
        description: 'L’arribada dels pobles bàrbars que travessen les fronteres:',
        details: [
          'Hispània ocupada (409 dC): Els pobles germànics dels vàndals, alans i sueus trenquen la frontera dels Pirineus i es reparteixen la península Ibèrica.',
          'Saqueig de Roma per Alaric (410 dC): El rei dels visigots, Alaric, entra a la ciutat de Roma i la saqueja durant tres dies, provocant una commoció mundial.',
          'Invasió dels huns comandats per Àtila: Els huns, guerrers nòmades procedents de l’Àsia central liderats per Àtila, sembren el terror i empenyen els pobles germànics a envair Roma.'
        ]
      },
      {
        title: '4. La Deposició de l’Emperador Ròmul Augústul (476 dC)',
        description: 'La caiguda de Roma i el naixement d’una nova era:',
        details: [
          'L’any 476 dC: El cabdill militar bàrbar Odoacre es rebel·la i deposa el jove emperador d’Occident, Ròmul Augústul (de només 15 anys).',
          'Odoacre es corona rei: En lloc de nomenar un nou emperador romà, Odoacre envia les insígnies imperials a Constantinoble i es corona rei de Roma i d’Itàlia.',
          'El canvi d’època històrica: L’any 476 dC simbolitza la fi de l’Imperi Romà d’Occident, la FI DE L’EDAT ANTIGA i el començament de L’EDAT MITJANA a Europa.'
        ]
      }
    ],
    examTips: [
      'Cadena de causes de la crisi: Fi de conquestes → Manca d’esclaus → Descens producció agrícola → Tall de comunicacions i comerç.',
      'Saber qui va dividir l’Imperi i quan: Teodosi l’any 395 dC (Occident i Orient).',
      'Pobles que van ocupar Hispània: Vàndals, alans i sueus (409 dC).',
      'La data més important de tot el temari: Any 476 dC (Deposició de Ròmul Augústul per Odoacre = Fi de l’Edat Antiga i inici de l’Edat Mitjana).'
    ],
    didYouKnow:
      "És una curiosa ironia de la història: el primer fundador i rei de Roma l'any 753 aC es deia RÒMUL, el primer emperador de Roma l'any 27 aC es deia AUGUST, i l'últim emperador romà deposat el 476 dC es deia exactament... RÒMUL AUGÚSTUL (que significa 'petit August')!",
    keyFigures: [
      {
        name: 'Teodosi I',
        role: 'Últim emperador de l’Imperi unificat',
        description: 'L’any 395 dC va dividir l’Imperi Romà entre els seus dos fills Honori (Occident) i Arcadi (Orient).'
      },
      {
        name: 'Alaric I',
        role: 'Rei dels visigots',
        description: 'L’any 410 dC va protagonitzar el famós saqueig de la ciutat de Roma, trencant el mite de la invulnerabilitat de la capital.'
      },
      {
        name: 'Àtila',
        role: 'Rei dels huns ("El flagell de Déu")',
        description: 'Líder militar que va assolar Europa i va empènyer els pobles germànics a refugiar-se dins de les fronteres de l’Imperi.'
      },
      {
        name: 'Ròmul Augústul',
        role: 'Últim emperador romà d’Occident',
        description: 'Jove emperador deposat l’any 476 dC pel cap bàrbar Odoacre, tancant més de 1.200 anys d’història romana a Occident.'
      },
      {
        name: 'Odoacre',
        role: 'Cabdill militar hèrul/germànic',
        description: 'Va enderrocar Ròmul Augústul l’any 476 dC i es va proclamar rei de Roma i d’Itàlia.'
      }
    ],
    keyConcepts: [
      {
        term: 'Divisió de Teodosi (395)',
        definition: 'Repartiment de l’Imperi Romà en dos blocs: l’Imperi Romà d’Occident (Roma) i l’Imperi Romà d’Orient (Bizanci).'
      },
      {
        term: 'Invasions germàniques',
        definition: 'Moviment de pobles bàrbars (visigots, vàndals, sueus, alans) que van traspassar les fronteres romanes i es van establir a les províncies.'
      },
      {
        term: 'Saqueig de Roma (410)',
        definition: 'Assalt i saqueig de la ciutat de Roma per part dels visigots liderats pel seu rei Alaric.'
      },
      {
        term: 'Any 476 dC',
        definition: 'Deposició de l’últim emperador romà d’Occident, Ròmul Augústul, per Odoacre. Marca la fi de l’Edat Antiga i l’inici de l’Edat Mitjana.'
      }
    ],
    interactiveComparison: {
      title: 'La Divisió de l’Imperi Romà (395 dC)',
      leftTitle: 'Imperi Romà d’Occident (Capital: Roma)',
      leftItems: [
        'Assignat al fill d’Honori l’any 395 dC',
        'Economia empobrida i ciutats despoblades',
        'Fronteres extenses constantment forçades per germànics',
        'Cau l’any 476 dC amb la deposició de Ròmul Augústul'
      ],
      rightTitle: 'Imperi Romà d’Orient (Capital: Bizanci)',
      rightItems: [
        'Assignat al fill d’Arcadi l’any 395 dC',
        'Economia rica basada en el comerç i rutes de l’Orient',
        'Exèrcit fort i muralles inexpugnables a Constantinoble',
        'Supervivència de 1.000 anys més (fins a la caiguda el 1453)'
      ]
    }
  }
];

