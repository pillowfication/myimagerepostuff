const admins = require('./admins');

const test = RegExp.prototype.test.bind(/^kuubot set-game($|\s)/);

module.exports = (message, client) => {
  if (test(message.content) && admins.includes(message.author.id)) {
    client.user.setGame(message.content.substring(15).trim());
  }
};
