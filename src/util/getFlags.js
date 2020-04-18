function getFlags(string = '') {
  const [message, ...rest] = string.split(' --');
  const flags = {};

  rest.forEach((text) => {
    const [name, ...rest] = text.split(' ');
    const value = rest.join(' ').trim();

    const prev = flags[name];
    if (prev && value) {
      if (Array.isArray(prev) && !prev.includes(value)) {
        prev.push(value);
      } else if (prev === true) { // Currently "true"? Set as string
        flags[name] = value;
      } else if (prev !== value) {  // Create a string array
        flags[name] = [prev, value]
      }
    } else if (!prev) {
      flags[name] = value || true;
    }
  });

  return {
    message,
    flags,
  };
}

module.exports = getFlags;
