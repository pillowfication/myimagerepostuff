const path = require('path');
const express = require('express');

const app = new express.Router();

app.get('/evakuu.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../evakuu.json'));
});
app.get('/evakuu.xlsx', (req, res) => {
  res.sendFile(path.join(__dirname, '../evakuu.xlsx'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/bundle.js'));
});
app.get('/bundle.js.map', (req, res) => {
  res.sendFile(path.join(__dirname, '../website/bundle.js.map'));
});

module.exports = app;

if (require.main === module) {
  const server = express();
  const port = +process.argv[2] || 80;

  server.use('/', app);
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
