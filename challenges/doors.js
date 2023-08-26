const { rawlist } = require('@inquirer/prompts');
const GAME_TEXT = require('../gameText/gameText');
const { combat } = require('./combat');
const { riddle } = require('../challenges/riddles');
const { gameOver } = require('../gameText/gameStatus');
const { trapAttack, trapAttackDescription } = require('../attacks/trapAttack');
const TRAPS = require('./traps');
const { characterStatusShort } = require('../characters/character');
const { removeChestTrap } = require('./treasureChest');

function setDoor(mainMenu, character, startGame, removeChestTrap) {
  this.mainMenu = mainMenu;
  this.character = character;
  this.startGame = startGame;
  this.combat = combat;
  this.removeChestTrap = removeChestTrap;
}

function treasureDoor(character) {
  this.character = character;
  rawlist({
    message: 'Pick one:',
    choices: [
      {
        name: 'Open treasure chest',
        value: 'openChest',
      },
      {
        name: 'Investigate treasure chest',
        value: 'investigateChest',
      },
      {
        name: 'Leave the treasure chest untouched',
        value: 'leaveChest',
      },
    ],
  }).then(function (option) {
    switch (option) {
      case 'openChest':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.openChest);
        console.log(GAME_TEXT.textSpacing);

        trapAttackDescription(TRAPS.arrow);
        const attack = trapAttack(TRAPS.arrow).attack();
        console.log('Attack: ' + attack);
        if (attack >= this.character.ac) {
          const damage = trapAttack(TRAPS.arrow).damage();
          this.character.hp -= damage;

          if (this.character.hp <= 0) {
            gameOver();
          }
          console.log('Damage:' + damage);
          characterStatusShort();
        }
        this.startGame();
        break;
      case 'investigateChest':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.investigateChest);
        console.log(GAME_TEXT.textSpacing);
        removeChestTrap(TRAPS.arrow);

        break;
      case 'leaveChest':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.leave);
        console.log(GAME_TEXT.textSpacing);
        this.startGame();
        break;
      default:
        console.log('That is not a valid option');
    }
  });
}

function dangerDoor(character) {
  this.character = character;
  this.dangerDoor = dangerDoor;

  rawlist({
    message: 'Pick one:',
    choices: [
      {
        name: 'Fight the skeleton!',
        value: 'atackSkeleton',
      },
      {
        name: 'Run away from the skeleton.',
        value: 'runFromSkeleton',
      },
      {
        name: 'Talk to the skeleton.',
        value: 'talkToTheSkeleton',
      },
    ],
  }).then(function (option) {
    switch (option) {
      case 'atackSkeleton':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.attack);
        combat('skeleton');
        break;
      case 'runFromSkeleton':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.leave);
        console.log(GAME_TEXT.textSpacing);
        this.startGame();
        break;
      case 'talkToTheSkeleton':
        riddle();
        break;
      default:
        console.log('That is not a valid option');
    }
  });
}

module.exports = { treasureDoor, dangerDoor, setDoor };
