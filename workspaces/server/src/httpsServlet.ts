// non production server.

import fs from 'fs';
import https from 'https';
import express from 'express';

const config = require('/etc/fuku/config/global.json');

var credentials = {
  key: fs.readFileSync(config.sslpath + 'privkey.pem', 'utf8'),
  cert: fs.readFileSync(config.sslpath + 'fullchain.pem', 'utf8'),
};

const app = express();

app.use(express.static(config.httpspath));

const httpsServer = https.createServer(credentials, app).listen(4433, () => {
  console.log('Running on 4433');
});
