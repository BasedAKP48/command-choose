const utils = require('@basedakp48/plugin-utils');
const random = require('./src/util/random');
const getFlags = require('./src/util/getFlags');

const plugin = new utils.Plugin({ dir: __dirname });

const prefix = '.'; // Pre-CommandProcessor
const commandData = {
  description: 'Pick a random word/item.',
  usage: '{prefix}{command} item1 item2 item3',
  aliases: ['choose', 'pick'],
  flags: {
    split: ' ',
  },
};
let commandProcessorExists = false;

plugin.presenceSystem();

plugin.messageSystem().on('message/command', (msg) => {
  commandProcessorExists = true;
  sendMessage(msg, handleCommand(msg.data))
});

function sendMessage(msg, text) {
  if (!text) return;

  // Maybe?
  plugin.messageSystem().sendText(text, msg);
}

function handleCommand({ command = '', text = '', flags = {} }) {
  if (!commandData.aliases.includes(command)) return '';

  const array = text.split(getOptions(flags).split);

  return array[random(array.length)].trim();
}

function getOptions(overrides) {
  return Object.assign({}, commandData.flags, overrides)
}

// Pre-CommandProcessor
plugin.messageSystem().on('message-in', (msg) => {
  if (commandProcessorExists || msg.type !== 'text' || !(msg.text.startsWith(prefix) || msg.data.isPM)) return;

  const {message, flags} = getFlags(msg.text);

  const args = message.split(' ');

  // Trim space between prefix and command
  if (args[0] === prefix) args.shift();

  sendMessage(msg, handleCommand({
    flags,
    command: getCommand(args.shift()).toLowerCase().trim(),
    text: args.join(' ').trim(),
  }));
});

function getCommand(text = '') {
  if (text.startsWith(prefix)) {
    return text.substring(prefix.length);
  }
  return text;
}
