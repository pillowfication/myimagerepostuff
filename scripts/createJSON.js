const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const getJSON = require('../utils/getJSON');

console.log('Parsing XLSX...');

const evakuu = XLSX.readFile(path.join(__dirname, '..', 'evakuu.xlsx'));
const dest = process.argv[2] || path.join(__dirname, '..', 'evakuu.json');

const json = getJSON(evakuu);

fs.writeFileSync(dest, JSON.stringify(json, null, 2) + '\n');

console.log('Successfully created JSON file!')
console.log(dest);
console.log();
