const { Markup, Extra } = require('telegraf');
const timeFormat = require('date-fns/format');
const Telegram = require('telegraf/telegram');
const format = require('../config/formats');
const { eventDateFormat } = require('./events');
const personality = require('../config/personality');
const BotService = require('../bot');

function groupedEventsToReply(groupedEvents) {
  return Object.keys(groupedEvents).map((eventName) => ({
    message: `🏆 ${eventName}`,
    matches: groupedEvents[eventName].map((event) => [
      { text: `${event.team1.name} vs ${event.team2.name} - ${format[event.format]} | ${!event.live ? `🕛 ${timeFormat(event.date, eventDateFormat(event.date))}` : ' Live 🔴'}`, callback_data: `event ${event.id}` },
    ]),
  }));
}

function sendEvents(ctx, events) {
  events.map(({ message, matches }) => ctx
    .reply(message, Extra.markdown().markup(Markup.inlineKeyboard(matches))));
}

function sendEventsByIds(events) {
  personality.map((id) => {
    events
      .map(({ message, matches }) => BotService.bot.telegram
        .sendMessage(id, message, Extra.markdown().markup(Markup.inlineKeyboard(matches))));
    return true;
  });
  return true;
}

module.exports = {
  sendEvents,
  sendEventsByIds,
  groupedEventsToReply,
};
