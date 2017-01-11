const admins = require('../admins');
const persist = require('../persist');

const test = RegExp.prototype.test.bind(/^kuubot set-game($|\s)/);

module.exports = (message, client) => {
  if (test(message.content) && admins.includes(message.author.id)) {
    const game = message.content.substring(15).trim() || undefined;
    persist.set('set-game', game);

    client.user.setGame(game);
  }
};
