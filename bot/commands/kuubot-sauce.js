const Discord = require('discord.js');
const request = require('request');
const config = require('../../config.json');

const test = RegExp.prototype.test.bind(/^kuubot sauce($|\s)/);

const indices = [
  {key: 0, name: 'h-magazines'},
  {key: 1, name: 'h-anime'},
  {key: 2, name: 'h-game'},
  {key: 3, name: 'doujinshi'},
  {key: 5, name: 'pixiv'},
  {key: 6, name: 'pixiv-historical'},
  {key: 7, name: 'anime'},
  {key: 8, name: 'nico-nico-seiga'},
  {key: 9, name: 'danbooru'},
  {key: 10, name: 'drawr'},
  {key: 11, name: 'nijie'},
  {key: 12, name: 'yandere'},
  // {key: 15, name: 'shutterstock'},
  {key: 999, name: 'all'}
];

const indicesByKey = {};
const indicesByName = {};
indices.forEach((index) => {
  indicesByKey[index.key] = index;
  indicesByName[index.name] = index;
});

function parseDb(db) {
  const index = indicesByKey[db] || indicesByName[db];
  return index ? index.key : undefined;
}

module.exports = (message) => {
  if (test(message.content)) {

    if (message.content === 'kuubot sauce help') {
      message.channel.sendCode('markdown',
        'Usage: kuubot sauce [attachment | url]\n' +
        '       kuubot sauce [db] [attachment | url]\n' +
        '\n' +
        'Indexes:\n' +
        indices.map(index => `${('     '+index.key).slice(-5)}: ${index.name}`).join('\n')
      );
      return;
    }

    const tokens = message.content.trim().split(/\s+/);
    const attachment = message.attachments.first();

    let db, url;
    if (attachment) {
      url = attachment.url;
      db = tokens.length >= 3 ? parseDb(tokens[2]) : 999;
    } else if (tokens.length >= 4) {
      url = tokens[3];
      db = parseDb(tokens[2]);
    } else {
      url = tokens[2];
      db = 999;
    }

    if (!url) {
      message.reply('No image specified!');
      return;
    }
    if (!db) {
      message.reply('Unknown database specified!');
      return;
    }

    request.get({
      url: 'https://saucenao.com/search.php',
      qs: {
        output_type: 2,
        api_key: config.saucenaoApiKey,
        testmode: 1,
        numres: 1,
        db: db,
        url: url
      }
    }, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        message.reply('Network error. Try yelling at Pillow.');
        return;
      }

      let results;
      try {
        results = JSON.parse(body).results;
      } catch (e) {
        message.reply('Bad response. The image URL might be bad.');
        return;
      }

      if (!results) {
        message.reply('No results found!');
        return;
      }

      const result = results[0];
      const embed = new Discord.RichEmbed();
      embed.setColor(0x147FF3);
      embed.setThumbnail(result.header.thumbnail);
      embed.setTitle(`(${result.header.similarity}) ${result.header.index_name}`);
      embed.setDescription(createDescription(result));
      message.channel.sendEmbed(embed);
    });
  }
};

function createDescription(result) {

  // !!!!!
  AAAAAAA(result);
  // !!!!!

  switch (result.header.index_id) {
    case 5: // pixiv
      return descriptify(
        ['Title', null, result.data.title],
        ['Pixiv ID', 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=', result.data.pixiv_id],
        ['Member Name', null, result.data.member_name],
        ['Member ID', 'http://www.pixiv.net/member_illust.php?id=', result.data.member_id]
      );
    case 9: // danbooru
      return descriptify(
        ['Creator', null, result.data.creator],
        ['Source', null, result.data.source],
        ['Danbooru ID', 'https://danbooru.donmai.us/posts/', result.data.danbooru_id],
        ['Gelbooru ID', 'http://www.gelbooru.com/index.php?page=post&s=view&id=', result.data.gelbooru_id],
        ['Sankaku ID', 'https://chan.sankakucomplex.com/post/show/', result.data.sankaku_id]
      );
    case 15: // shutterstock
      return descriptify(
        ['Shutterstock ID', 'https://www.shutterstock.com/pic-', result.data.shutterstock_id],
        ['Contributor ID', 'https://m.shutterstock.com/contributor/', result.data.contributor_id], // Mobile site redirects correctly
        ['Date', null, result.data.date]
      );
    default:
      return JSON.stringify(result.data, null, 2);
  }
}

function descriptify(...lines) {
  let description = '';
  for (const line of lines) {
    const [name, baseUrl, suffix] = line;
    const display = suffix && `${name}: ${baseUrl ? `[${suffix}](${baseUrl}${suffix})` : `${suffix}`}`;
    if (display)
      description += display + '\n';
  }
  return description;
}




//////////////
const AAAAAA = {
  5: ['title', 'pixiv_id', 'member_name', 'member_id'],
  9: ['creator', 'source', 'danbooru_id', 'sankaku_id']
};
function AAAAAAA(result) {
  const tracked = AAAAAA[result.header.index_id];
  if (!tracked) {
    console.log('UNKNOWN THINGGY');
    console.log(JSON.stringify(result));
  }
  for (field in result.data)
    if (!tracked.includes(field)) {
      console.log('UNKNOWN THINGGY');
      console.log(JSON.stringify(result));
      return;
    }
}
