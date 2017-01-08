const path = require('path');
const prompt = require('prompt');
const jsonfile = require('jsonfile');

const FILE_LOCATION = path.join(__dirname, '../config.json');

let currSettings;
try {
  currSettings = jsonfile.readFileSync(FILE_LOCATION);
} catch (err) {
  currSettings = {};
}

const schema = [{
  name: 'discordToken',
  description: 'Discord Bot Token',
  default: currSettings.discordToken
}, {
  name: 'saucenaoApiKey',
  description: 'SauceNAO API Key',
  default: currSettings.saucenaoApiKey
}, {
  name: 'cleverbotApiUser',
  description: 'Cleverbot API User',
  default: currSettings.cleverbotApiUser
}, {
  name: 'cleverbotApiKey',
  description: 'Cleverbot API Key',
  default: currSettings.cleverbotApiKey
}];

prompt.start();

prompt.get(schema, (error, result) => {
  try {
    jsonfile.writeFileSync(FILE_LOCATION, result, {spaces: 2});
    console.log();
    console.log('Config file created!');
    console.log(FILE_LOCATION);
    console.log();
  } catch (error) {
    console.log(`Error creating '${FILE_LOCATION}'. Please try again.`);
    console.log(error);
  }
});
