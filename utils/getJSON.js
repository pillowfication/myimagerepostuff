// Parses 'B62' -> { row: 62, col: 'B' }
function parseCell(str) {
  const row = str.match(/[0-9]+$/);
  const col = str.match(/^[A-Z]+/);

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

// Creates an array of the first N columnNames until `stop` is reached
function firstColumnNames(stop) {
  let columnNames = [];
  for (let col = 1, colName = 'A'; colName !== stop; colName = toColumnName(++col))
    columnNames.push(toColumnName(col));
  columnNames.push(stop);
  return columnNames;
}

// Strips out all the extra data we don't care about
function parseSheet(sheet) {
  const bounds = parseCell(sheet['!ref'].split(':')[1]);
  const columnNames = firstColumnNames(bounds.col);
  const parsedRows = [];

  for (let row = 1; row <= bounds.row; ++row) {
    const parsedRow = {};
    let isEmpty = true;

    columnNames.forEach((col) => {
      const cell = sheet[`${col}${row}`];
      if (cell && cell.v) {
        parsedRow[col] = cell.v;
        isEmpty = false;
      }
    });

    if (!isEmpty)
      parsedRows.push(parsedRow);
  }

  return {
    _rows: bounds.row,
    _cols: columnNames.length,
    _colNames: columnNames,
    Rows: parsedRows
  };
}

module.exports = function getJSON(evakuu) {
  const json = {
    timestamp: Date.now(),
    tags: []
  };

  // First parse Sheet3 which has all the favorite tags from Sheet1
  const Sheet3 = parseSheet(evakuu.Sheets.Sheet3);
  const favorites = {};

  for (const row of Sheet3.Rows)
    favorites[row.A] = true; // everything is column A

  // Then parse Sheet1 for all non-Pixiv tags
  const Sheet1 = parseSheet(evakuu.Sheets.Sheet1);
  Sheet1.Rows.shift(); // remove the first row

  /*********************
   * !!! IMPORTANT !!! *
   *********************/
  Sheet1.Rows.forEach((row) => {
    let tagData = {
      searchtag: row.A,
      repository: row.B,
      category: row.C
    };

    if (favorites[tagData.searchtag])
      tagData.favorite = true;

    for (let col = 3; col < Sheet1._cols; ++col)
      if (row[Sheet1._colNames[col]])
        (tagData.misc || (tagData.misc = [])).push(row[Sheet1._colNames[col]])

    json.tags.push(tagData);
  });

  return json;
};
