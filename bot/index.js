const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');

const rules = [
  require('./kuubot'),
  require('./kuubot-update'),
  require('./kuubot-sauce'),
  require('./kuubot-set-game'),
  require('./kuubot-xlsx')
];

client.on('ready', () => {
  console.log('Kuubot is online!');
  client.user.setGame('with lewd stuff');
});

client.on('message', (message) => {
  for (const rule of rules)
    rule(message, client);
});

module.exports = {
  client: client,
  start() {
    client.login(config.discordToken);
  }
};

if (require.main === module) {
  module.exports.start();
}
