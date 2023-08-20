const { rawlist } = require('@inquirer/prompts');
const GAME_TEXT = require('../gameText/gameTex');
const { combat } = require('./combat');
const { riddle } = require('../challenges/riddles');

function setDoor(mainMenu, character, startGame) {
  this.mainMenu = mainMenu;
  this.character = character;
  this.startGame = startGame;
  this.combat = combat;
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
        this.mainMenu();

        break;
      case 'investigateChest':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.investigateChest);
        console.log(GAME_TEXT.textSpacing);
        this.mainMenu();

        break;
      case 'leaveChest':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.leave);
        console.log(GAME_TEXT.textSpacing);
        this.mainMenu();
        break;
      default:
        console.log('That is not a valid option');
    }
  });
}

function dangerDoor(character) {
  this.character = character;

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
        console.log(GAME_TEXT.textSpacing);
        this.combat('skeleton');
        break;
      case 'runFromSkeleton':
        console.log(GAME_TEXT.textSpacing);
        console.log(GAME_TEXT.leave);
        console.log(GAME_TEXT.textSpacing);
        this.mainMenu();
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
