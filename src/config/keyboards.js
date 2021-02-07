const { Telegraf } = require('telegraf');

const MainMenu = Telegraf.Extra
  .markdown()
  .markup((m) => m.keyboard([
    [
      m.callbackButton('⏰ Upcoming matches'),
    ],
    [
      m.callbackButton('🗓 Matches'),
    ],
    [
      m.callbackButton('📊 HLTV Stats 🏆'),
      m.callbackButton('ℹ️ About'),
    ],
  ])
    .resize());

module.exports = {
  MainMenu,
};
