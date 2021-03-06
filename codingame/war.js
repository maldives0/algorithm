//https://www.codingame.com/ide/puzzle/winamax-battle
// const n = parseInt(readline());// the number of cards for player 1
// let game = { p1: [], p2: [] };
// for (let i = 0; i < n; i++) {
//     const cardp1 = readline();
//      game.p1.push(cardp1);// the n cards of player 1
// }
// const m = parseInt(readline()); // the number of cards for player 2
// for (let i = 0; i < m; i++) {
//     const cardp2 = readline();
//      game.p2.push(cardp2); // the m cards of player 2
// }

const card = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K', 'A'];

// case1) just battle

// const n = 5,
//   m = 5;
// const game = {
//   p1: ['7C', 'KD', 'AH', 'QH', '2S'],
//   p2: ['8D', '2D', '3H', '4D', '3S'],
// };

// // case2-1) war

// const n = 5,
//   m = 5;
// const game = {
//   p1: ['8C', 'KD', 'AH', 'QH', '2S'],
//   p2: ['8D', '2D', '3H', '4D', '3S'],
// };

// // case2-2) war

// const n = 5,
//   m = 5;
// const game = {
//   p1: ['8C', 'KD', 'AH', 'QH', '3S', '5C', 'indexD', '3H', '2H'],
//   p2: ['8D', '2D', '3H', '4D', '3S', '1S', 'KD', 'AH', 'QH'],
// };

// case3) one battle, one war

const n = 26,
  m = 26;
const game = {
  p1: [
    '10H',
    'KD',
    '6C',
    '10S',
    '8S',
    'AD',
    'QS',
    '3D',
    '7H',
    'KH',
    '9D',
    '2D',
    'JC',
    'KS',
    '3S',
    '2S',
    'QC',
    'AC',
    'JH',
    '7D',
    'KC',
    '10D',
    '4C',
    'AS',
    '5D',
    '5S',
  ],
  p2: [
    '2H',
    '9C',
    '8C',
    '4S',
    '5C',
    'AH',
    'JD',
    'QH',
    '7C',
    '5H',
    '4H',
    '6H',
    '6S',
    'QD',
    '9H',
    '10C',
    '4D',
    'JS',
    '6D',
    '3H',
    '8H',
    '3C',
    '7S',
    '9S',
    '8D',
    '2C',
  ],
};

// //case4) long game

// const n = 26,
//   m = 26;
// const game = {
//   p1: [
//     'AH',
//     '4H',
//     '5D',
//     '6D',
//     'QC',
//     'JS',
//     '8S',
//     '2D',
//     '7D',
//     'JD',
//     'JC',
//     '6C',
//     'KS',
//     'QS',
//     '9D',
//     '2C',
//     '5S',
//     '9S',
//     '6S',
//     '8H',
//     'AD',
//     '4D',
//     '2H',
//     '2S',
//     '7S',
//     '8C',
//   ],
//   p2: [
//     '10H',
//     '4C',
//     '6H',
//     '3C',
//     'KC',
//     'JH',
//     '10C',
//     'AS',
//     '5H',
//     'KH',
//     '10S',
//     '9H',
//     '9C',
//     '8D',
//     '5C',
//     'AC',
//     '3H',
//     '4S',
//     'KD',
//     '7C',
//     '3S',
//     'QH',
//     '10D',
//     '3D',
//     '7H',
//     'QD',
//   ],
// };

let count = 0,
  answer = '',
  used_cards = [];

function push_used_cards(index) {
  let a = 0,
    b = 0;

  while (a <= index) {
    used_cards.push(game.p1[a]);
    a++;
  }
  while (b <= index) {
    used_cards.push(game.p2[b]);
    b++;
  }

  console.log('used_cards:', used_cards);
  return used_cards;
}

function battle(index) {
  if (game.p1[index] !== undefined && game.p2[index] !== undefined) {
    // console.log(
    //   'p1:',
    //   game.p1,
    //   '\n',
    //   'game.p1[i]:',
    //   game.p1[i],
    //   i,

    //   '\n',
    //   'p2:',
    //   game.p2,
    //   '\n',
    //   'game.p2[index]:',
    //   game.p2[index],
    //   index,
    //   '\n',
    //   'count:',
    //   count,

    //   '----------------------------------------------------------------------------',
    //   '\n',
    // );
    if (card.indexOf(game.p1[index][0]) > card.indexOf(game.p2[index][0])) {
      push_used_cards(index);
      game.p1.splice(0, index + 1);
      game.p2.splice(0, index + 1);
      game.p1.push(...used_cards);
      used_cards = [];
      count++;
      battle(0);
    } else if (card.indexOf(game.p1[index][0]) < card.indexOf(game.p2[index][0])) {
      push_used_cards(index);
      game.p1.splice(0, index + 1);
      game.p2.splice(0, index + 1);
      game.p2.push(...used_cards);
      used_cards = [];
      count++;
      battle(0);
    } else if (card.indexOf(game.p1[index][0]) === card.indexOf(game.p2[index][0])) {
      if (index + 4 < game.p1.length && index + 4 < game.p2.length) {
        battle(index + 4);
      } else {
        return (answer = 'PAT');
      }
    }
  } else {
    if (game.p1.length > game.p2.length) {
      return (answer = `1 ${count}`);
    } else if (game.p1.length < game.p2.length) {
      return (answer = `2 ${count}`);
    } else if (game.p1.length === game.p2.length) {
      return (answer = 'PAT');
    }
  }
}

battle(0);
console.log(answer);
