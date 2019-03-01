const fs = require('fs');
require('dotenv').config();

const httpPort = process.env.HTTP_PORT;
const socketPort = process.env.SOCKET_PORT;
const pluginHostUrl = process.env.PLUGIN_HOST_URL;

const manifestFilename = './manifest.json';
const manifestOptions = {
  'description': 'parzero-plugin',
  'manifest_version': 2,
  'name': 'parzero-plugin',
  'version': '0.0.1',
  'homepage_url': 'https://github.com/valera-rozuvan/parzero',
  'icons': {
    '48': 'img/logo.png'
  },
  'content_scripts': [
    {
      'matches': [`*://*.${pluginHostUrl}/*`],
      'js': ['dist/index.js']
    }
  ],
  'permissions': [
    `*://127.0.0.1:${httpPort}/*`,
    `*://127.0.0.1:${socketPort}/*`,
    '*://127.0.0.1/*',

    `*://localhost:${httpPort}/*`,
    `*://localhost:${socketPort}/*`,
    '*://localhost/*',

    `*://*.${pluginHostUrl}/*`,

    'webRequest'
  ]
};

let jsonString = null;
try {
  jsonString = JSON.stringify(manifestOptions);
} catch (err) {
  console.log('JSON.stringify ERROR');
  console.log(err);
  return;
}

try {
  fs.writeFile(manifestFilename, jsonString, () => {
    console.log('Done!');
  });
} catch (err) {
  console.log('fs.writeFile ERROR');
  console.log(err);
  return;
}
