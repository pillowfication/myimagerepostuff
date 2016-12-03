const request = require('request');
const cheerio = require('cheerio');

module.exports = {
  danbooru: function(tag, cb) {
    request.get(
      `https://danbooru.donmai.us/posts?tags=${tag}`,
      (err, res, body) => {
        if (err)
          return cb(err);

        const images = cheerio.load(body)('#posts article img');
        return cb(null, images);
      }
    );
  },

  pixiv: function(tag, cb) {
    request.get(
      `http://www.pixiv.net/member.php?id=${tag}`,
      (err, res, body) => {
        if (err)
          return cb(err);

        const images = cheerio.load(body)('.ui-brick li a img');
        console.log(images);
        return cb(null, images);
      }
    )
  },

  sankakucomplex: function(tag, cb) {
    return cb(true);
  }
};
