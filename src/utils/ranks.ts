export interface RomanRank {
  name: string;
  latinName: string;
  minXp: number;
  badge: string;
  description: string;
}

export const ROMAN_RANKS: RomanRank[] = [
  {
    name: 'Tiró (Recluta)',
    latinName: 'Tiro',
    minXp: 0,
    badge: '🗡️',
    description: 'Acabes d’arribar al campament militar del Laci. Has de conèixer les bases de Roma.'
  },
  {
    name: 'Legionari',
    latinName: 'Legionarius',
    minXp: 100,
    badge: '🛡️',
    description: 'Portes el scutum i el pilum. Coneixes els fonaments de la monarquia i la república.'
  },
  {
    name: 'Decurió',
    latinName: 'Decurio',
    minXp: 250,
    badge: '🐴',
    description: 'Comandes una esquadra de cavalleria. Domines l’expansió pel Mare Nostrum.'
  },
  {
    name: 'Centurió',
    latinName: 'Centurio',
    minXp: 450,
    badge: '🪖',
    description: 'Cap de 80 legionaris amb el casc de plomall transversal. Has derrotat Cartago!'
  },
  {
    name: 'Tribú Militar',
    latinName: 'Tribunus Militum',
    minXp: 700,
    badge: '📜',
    description: 'Oficial d’estat major. Comprens la crisi del segle I aC i els moviments socials.'
  },
  {
    name: 'Legat de la Legió',
    latinName: 'Legatus Legionis',
    minXp: 1050,
    badge: '🦅',
    description: 'Comandant suprem d’una legió sencera. Coneixes Juli Cèsar i les seves campanyes.'
  },
  {
    name: 'Cònsol',
    latinName: 'Consul',
    minXp: 1500,
    badge: '🏛️',
    description: 'Màxim magistrat de Roma. Dirigeixes els exèrcits i convoques el Senat.'
  },
  {
    name: 'Imperator Caesar',
    latinName: 'Imperator Augustus',
    minXp: 2100,
    badge: '👑',
    description: 'La corona de llorer és teva! Domines tota la història de Roma de 2n d’ESO.'
  }
];

export function getRankForXp(xp: number): RomanRank {
  for (let i = ROMAN_RANKS.length - 1; i >= 0; i--) {
    if (xp >= ROMAN_RANKS[i].minXp) {
      return ROMAN_RANKS[i];
    }
  }
  return ROMAN_RANKS[0];
}

export function getNextRank(xp: number): RomanRank | null {
  for (let i = 0; i < ROMAN_RANKS.length; i++) {
    if (xp < ROMAN_RANKS[i].minXp) {
      return ROMAN_RANKS[i];
    }
  }
  return null;
}
