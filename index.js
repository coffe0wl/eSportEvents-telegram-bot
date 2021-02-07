const express = require('express');
const config = require('./src/config');
const bot = require('./src/bot');

const app = express();

app.get('/wake_up', (req, res) => {
  console.log('Good morning!');
  res.send('WAKE UP BOT!');
});

app.get('/', (req, res) => {
  res.send(`eSportEvents bot:\n Production: ${config.isProduction}\n Port: ${config.port}\n Url: ${config.url}`);
});

app.listen(config.port, () => {
  console.log(`🚀 eSportEvents app listening on port ${config.port}!`);
});

bot({ app });

module.exports = app;
