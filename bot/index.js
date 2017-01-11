const Discord = require('discord.js');
const client = new Discord.Client();
const persist = require('./persist');
const config = require('../config.json');

const rules = [
  require('./commands/kuubot'),
  require('./commands/kuubot-update'),
  require('./commands/kuubot-sauce'),
  require('./commands/kuubot-set-game'),
  require('./commands/kuubot-xlsx')
];

client.on('ready', () => {
  console.log('Kuubot is online!');
  client.user.setGame(persist.get('set-game'));
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
