const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');

const rules = [
  require('./kuubot-update'),
  require('./kuubot-sauce'),
  require('./kuubot-xlsx')
];

client.on('ready', () => {
  console.log('Kuubot is online!');
  client.user.setStatus('online', 'with lewd stuff');
});

client.on('message', (message) => {
  for (const rule of rules)
    rule(message);
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
