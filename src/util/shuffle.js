function shuffle(array) {
  for (let i = array.length; i > 0;) {
    const r = Math.floor(Math.random() * i--);

    const temp = array[i];
    array[i] = array[r];
    array[r] = temp;
  }
  return array;
}

module.exports = shuffle;
