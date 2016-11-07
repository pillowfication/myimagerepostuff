const fs = require('fs');
const path = require('path');

// Copy bootstrap.css into project directory
// Copy the CSS thing
((cb) => {
  console.log('Copying `bootstrap.min.css`...');
  let cbCalled = false;
  const rd = fs.createReadStream(path.join(__dirname, '..', '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
  const wr = fs.createWriteStream(path.join(__dirname, '..', '/website/bootstrap.css'));

  rd.on('error', (err) => { done(err); });
  wr.on('error', (err) => { done(err); });
  wr.on('close', (ex) => { done(); });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
})((err) => {
  if (err) {
    console.log(err);
    throw new Error('Error occurred when copying `bootstrap.min.css`');
  } else {
    console.log('Copying successful!');
  }
});
