const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

const filePath = path.join(__dirname, 'persist-data.json');

let data = {};
try {
  data = jsonfile.readFileSync(filePath);
} catch (err) {
  console.log(`File '${filePath}' not found. Creating new file.`);
}

module.exports = {
  set(key, value) {
    data[key] = value;
    jsonfile.writeFile(filePath, data, {spaces: 2}, () => {});
  },

  get(key) {
    return data[key];
  }
};
