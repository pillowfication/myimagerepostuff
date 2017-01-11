const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

const filePath = path.join(__dirname, 'persist-data.json');
const data = jsonfile.readFileSync(filePath);

module.exports = {
  set(key, value) {
    data[key] = value;
    jsonfile.writeFile(filePath, data, {spaces: 2}, () => {});
  },

  get(key) {
    return data[key];
  }
};
