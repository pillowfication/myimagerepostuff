const fs = require('fs');
const path = require('path');
const async = require('async');
const request = require('request');
const XLSX = require('xlsx');
const getJSON = require('../utils/getJSON');

const admins = [
  '144761456645242880', // Pillowfication
  '179314569594929152', // Eva/Kuu
];

module.exports = (message) => {
  if (message.content === 'kuubot update') {
    const attachment = message.attachments.first();

    if (admins.indexOf(message.author.id) === -1) {
      message.channel.sendMessage('You are not authorized to use this command');
    } else if (!attachment) {
      message.channel.sendMessage('No document attached! Please attach one.');
    } else {
      message.channel.sendCode('diff',
        '  Downloading file...'
      ).then((statusMessage) => {
        request.get({
          url: attachment.url,
          encoding: null
        }, (err, res, body) => {
          if (err) {
            statusMessage.editCode('diff',
              '- Download failed!'
            );
            message.channel.sendMessage('Failed to complete update.');
          } else {
            statusMessage.editCode('diff',
              '+ Downloaded file!\n' +
              '  Parsing file...'
            ).then((statusMessage) => {
              try {
                const json = JSON.stringify(getJSON(XLSX.read(body)), null, 2) + '\n';
                async.each([
                  {path: path.join(__dirname, '../evakuu.xlsx'), data: body},
                  {path: path.join(__dirname, '../evakuu.json'), data: json}
                ], (file, cb) => {
                  fs.writeFile(file.path, file.data, cb);
                }, (err) => {
                  if (err) {
                    throw err;
                  } else {
                    statusMessage.editCode('diff',
                      '+ Downloaded file!\n' +
                      '+ Parsed file!'
                    );
                    message.channel.sendMessage('Update complete.');
                  }
                });
              } catch (err) {
                statusMessage.editCode('diff',
                  '+ Downloaded file!\n' +
                  '- Parsing failed!'
                );
                message.channel.sendMessage('Failed to complete update.');
              }
            });
          }
        });
      });
    }
  }
};
