const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const async = require('async');
const moment = require('moment');

module.exports = (message) => {
  if (message.content === 'kuubot xlsx') {
    async.parallel({
      json: jsonfile.readFile.bind(null, path.join(__dirname, '../../evakuu.json')),
      xlsx: fs.readFile.bind(null, path.join(__dirname, '../../evakuu.xlsx'))
    }, (err, res) => {
      if (err) {
        message.reply('Something went wrong grabbing the files. Yell for Pillow.');
        return;
      }

      message.channel.sendFile(res.xlsx, 'evakuu.xlsx',
        `Updated ${moment(res.json.timestamp).format('MMMM Do YYYY, h:mm:ss a')}`);
    });
  }
};
