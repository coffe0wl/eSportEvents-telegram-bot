const { Telegraf } = require('telegraf');
const config = require('./config');
const { MainMenu } = require('./config/keyboards');
const {
  startPhrase, onZeroUpcomingMatches, onZeroMatches, aboutBot, error,
} = require('./config/botPhrases');
const { upcomingEvents, allEvents } = require('./services/events');
const { sendEvents } = require('./utils/reply');
const { isZero } = require('./utils/events');

const TOKEN = config.isProduction ? config.botToken : config.devBotToken;

function BotService({ app }) {
  const bot = new Telegraf(TOKEN);

  BotService.bot = bot;

  bot.catch((err, ctx) => {
    ctx.reply(error);
    console.log(`BOT-ERROR-LOG: Encountered an error for ${ctx.updateType}`, err);
  });

  bot.start((ctx) => {
    ctx.reply(startPhrase, MainMenu);
    ctx.reply(aboutBot, { parse_mode: 'Markdown' });
  });

  bot.hears('⏰ Upcoming matches', async (ctx) => {
    const replyEventsList = await upcomingEvents();
    if (isZero(replyEventsList)) {
      ctx.reply(onZeroUpcomingMatches);
      return;
    }
    sendEvents(ctx, replyEventsList);
  });

  bot.hears('🗓 Matches', async (ctx) => {
    const replyEventsList = await allEvents();
    if (isZero(replyEventsList)) {
      ctx.reply(onZeroMatches);
      return;
    }
    sendEvents(ctx, replyEventsList);
  });

  bot.hears('📊 HLTV Stats 🏆', (ctx) => ctx.reply('HLTV Stats'));
  bot.hears('ℹ️ About', (ctx) => ctx.reply(aboutBot, { parse_mode: 'Markdown' }));

  if (config.isProduction) {
    bot.telegram.setWebhook(`${config.url}/bot${config.botToken}`);
    app.use(bot.webhookCallback(`/bot${config.botToken}`));
  } else {
    bot.startPolling();
  }
}

module.exports = BotService;
