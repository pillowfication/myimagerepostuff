const cleverbot = require('cleverbot.io');
const config = require('../../config.json');

const bot = new cleverbot(config.cleverbotApiUser, config.cleverbotApiKey);
bot.setNick(`kuubot-${Math.random()}`); // adding `Math.random()` somehow fixed the "reference does not exist" error
bot.create((err, session) => {
  if (err) {
    console.log('ERROR CREATING CLEVERBOT SESSION');
    console.log(err);
  }
});

const test = RegExp.prototype.test.bind(/^<@!?265952583883948033>/);

module.exports = function talk(message) {
  if (test(message.content)) {
    const content = message.content.substring(message.content.indexOf('>')+1).trim();
    bot.ask(content, (err, res) => {
      if (err) {
        console.log('ERROR ASKING CLEVERBOT');
        console.log(res);
        return;
      }

      message.channel.sendMessage(res);
    });
  }
};
