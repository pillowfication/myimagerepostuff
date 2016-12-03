const path = require('path');
const express = require('express');

const app = new express.Router();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/build.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'build.js'));
});
app.get('/bootstrap.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'bootstrap.css'));
});

module.exports = app;

if (require.main === module) {
  const server = express();
  server.use('/', app);
  server.listen(process.argv[2] || 80, () => {
    console.log(`Server started on port ${process.argv[2] || 80}`);
  });
}
