const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const evakuu = XLSX.readFile(path.join(__dirname, '..', 'evakuu.xlsx'));
const Sheet1 = evakuu.Sheets.Sheet1;

// Output Destination
const dest = process.argv[2] || path.join(__dirname, '..', 'evakuu.json');

// Parses 'B62' -> { row: 62, col: 'B' }
function parseCell(str) {
  const row = str.match(/[0-9]+$/);
  const col = str.match(/^[A-Z]+/);

  if (row && col)
    return {
      row: Number(row[0]),
      col: col[0]
    };
}

// Converts 1, 2, 3, ... -> 'A', 'B', 'C', ... , 'Z', 'AA', 'AB', 'AC', ...
function toColumnName(num) {
  let dividend = num;
  let columnName = '';
  let modulo;

  while (dividend > 0) {
    modulo = (dividend - 1) % 26;
    columnName = (String.fromCharCode(65 + modulo)) + columnName;
    dividend = (dividend - modulo) / 26 | 0;
  }

  return columnName;
}

// Get size of `Sheet1`
const ref = Sheet1['!ref'].split(':'); // [ 'A1', 'E300' ]
const boundMax = parseCell(ref[1]);

// Define what each column will translate to in JSON
// Any undefined columns will be pushed into a `misc` array
const map = {
  'A': 'searchtag',
  'B': 'repository',
  'C': 'category'
};

// Parse each row
const json = [];

for (let row = 1; row < boundMax.row; ++row) {
  let column = 1;
  let columnName;
  let cellData;

  while (columnName !== boundMax.col) {
    columnName = toColumnName(column);
    const cell = Sheet1[`${columnName}${row}`];

    if (cell) {
      cellData = cellData || {}; // Initialize `cellData` if necessary
      const value = cell.v;
      const mappedName = map[columnName];

      if (mappedName)
        cellData[mappedName] = value;
      else {
        cellData.misc = cellData.misc || []; // Initialize `misc` field if necessary
        cellData.misc.push(value);
      }
    }

    ++column;
  }

  if (cellData)
    json.push(cellData);
}

// Write the JSON data to file
fs.writeFileSync(dest, JSON.stringify(json, null, 2) + '/n');

console.log('Successfully created JSON file!')
console.log(dest);
console.log();
