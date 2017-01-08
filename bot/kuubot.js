const cleverbot = require('cleverbot.io');
const config = require('../config.json');

const bot = new cleverbot(config.cleverbotApiUser, config.cleverbotApiKey);
bot.setNick('kuubot');
bot.create((err, session) => {
  if (err) {
    console.log('ERROR CREATING CLEVERBOT SESSION');
    console.log(err);
  }
});

const mentionString = `<@265952583883948033>`;

module.exports = function talk(message) {
  if (message.content.indexOf(mentionString) !== 0)
    return;

  const content = message.content.substring(mentionString.length).trim();
  bot.ask(content, (err, res) => {
    if (err) {
      console.log('ERROR ASKING CLEVERBOT');
      console.log(err);
    }

    message.channel.sendMessage(res);
  });
};
