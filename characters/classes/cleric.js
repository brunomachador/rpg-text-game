const {
  accuracy,
  damageRange,
  attack,
  damage,
} = require('../../attacks/attack');
const WEAPON = require('../../attacks/weapons');
const proficiencyModifier = 2;

const ABILITY_SCORE = {
  strength: 14,
  dexterity: 10,
  constitution: 12,
  inteligence: 10,
  wisdom: 16,
  charisma: 12,
};

const MACE = {
  name: WEAPON['mace'].name,
  atribute: WEAPON['mace'].atribute,
  description: WEAPON['mace'].description,
  accuracy: accuracy(WEAPON['mace'], ABILITY_SCORE, proficiencyModifier),
  damageRange: damageRange(WEAPON['mace'], ABILITY_SCORE),
  attack: attack(WEAPON['mace'], ABILITY_SCORE, proficiencyModifier),
  damage: damage(WEAPON['mace'], ABILITY_SCORE),
};

const ATTACKS = [MACE];

const SPELLS = {};

const ARMOR = {
  type: 'Chainmail',
  ac: 16,
};

const CLERIC = {
  baseHp: 8,
  abilityScore: ABILITY_SCORE,
  attacks: ATTACKS,
  armor: ARMOR,
  spells: SPELLS,
  proficiency: {
    turnUndead: true,
  },
};

module.exports = CLERIC;
