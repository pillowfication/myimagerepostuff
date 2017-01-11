const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const moment = require('moment');

module.exports = (message) => {
  if (message.content === 'kuubot xlsx') {
    // WHY IS THIS SYNC
    const json = jsonfile.readFileSync(path.join(__dirname, '../../evakuu.json'));
    const xlsx = fs.readFileSync(path.join(__dirname, '../../evakuu.xlsx'));

    message.channel.sendFile(xlsx, 'evakuu.xlsx',
      `Updated ${moment(json.timestamp).format('MMMM Do YYYY, h:mm:ss a')}`);
  }
};
