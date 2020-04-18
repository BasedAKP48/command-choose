const random = require('../util/random');
const shuffle = require('../util/shuffle');

describe('Percentage tests', () => {
  const tests = 100;
  const results = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  const keys = Object.keys(results);

  function reset() {
    keys.forEach(key => results[key] = 0)
  }

  function print() {
    keys.slice().sort(compare).forEach((key) => {
      const percentage = 100 * results[key] / tests;
      console.log(`${key}: ${percentage}%`);
    });
  }

  function compare(a, b) {
    return results[b] - results[a];
  }

  describe('random', () => {
    before(reset);
    after(print);
    it('runs a bunch', () => {
      for (let x = 0; x < tests; x++) {
        results[random(0, keys.length, false)] += 1;
      }
    });
  });

  describe('shuffle', () => {
    before(reset);
    after(print);
    it('runs a bunch', () => {
      for (let x = 0; x < tests; x++) {
        results[shuffle(keys.slice())[0]] += 1;
      }
    });
  });
});

