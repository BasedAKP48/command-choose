function random(max = 1, min = 0, inclusive = false) {
  return Math.floor(Math.random() * (max - min + inclusive)) + min;
}

module.exports = random;
