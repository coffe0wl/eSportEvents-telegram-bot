const flowRight = require('lodash/flowRight');
const { sendEventsByIds, groupedEventsToReply } = require('./reply');
const { compareCurrentlyFetchedWithPrevEvents, eventsByFavoritesTeams, groupEventsByTournament } = require('./events');

function onFetchEvent(prevEvent, events) {
  const comparedEvents = compareCurrentlyFetchedWithPrevEvents(prevEvent, eventsByFavoritesTeams(events));
  console.log('Compared - ', comparedEvents);
  flowRight([
    sendEventsByIds,
    groupedEventsToReply,
    groupEventsByTournament,
  ])(comparedEvents);
  return true;
}

module.exports = {
  onFetchEvent,
};
