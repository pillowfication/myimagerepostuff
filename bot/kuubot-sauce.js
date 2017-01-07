const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');

const test = RegExp.prototype.test.bind(/^kuubot sauce($|\s)/);

module.exports = (message) => {
  if (test(message.content)) {
    const url = message.content.split(/\s+/)[2];

    request.get({
      url: 'https://saucenao.com/search.php',
      qs: {
        api_key: config.saucenaoApiKey,
        db: 999,
        output_type: 2,
        testmode: 1,
        numres: 1,
        url: url
      }
    }, (err, res, body) => {
      if (err) {
        message.channel.sendMessage('Something went wrong');
        return;
      }

      body = JSON.parse(body);
      const result = body.results && body.results[0];

      if (!result) {
        message.channel.sendMessage('laksdjfjflsdjlkfds');
      } else {
        const embed = new Discord.RichEmbed();
        embed.setColor(0x147FF3);
        embed.setThumbnail(result.header.thumbnail);
        embed.setTitle(`(${result.header.similarity}) ${result.header.index_name}`);
        embed.setDescription(
          `Artist: ${result.data.creator || result.data.member_name}` +
          createLinks(result.data)
        );
        embed.setFooter(JSON.stringify(result.data, null, 2));
        message.channel.sendEmbed(embed);
      }
    });
  }
};

function createLinks(data) {
  return (
    (data.danbooru_id ? `\nDanbooru: https://danbooru.donmai.us/posts/${data.danbooru_id}` : '') +
    (data.pixiv_id ? `\nPixiv: http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${data.pixiv_id}` : '') +
    (data.sankaku_id ? `\nSankaku: https://chan.sankakucomplex.com/post/show/${data.sankaku_id}` : '')
  )
}
