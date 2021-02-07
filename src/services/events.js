const flowRight = require('lodash/flowRight');
const EventsService = require('./EventsService');
const { groupedEventsToReply } = require('../utils/reply');
const {
  eventsByFavoritesTeams, todaysEvents, groupEventsByTournament,
} = require('../utils/events');

async function upcomingEvents() {
  return flowRight(
    [groupedEventsToReply, groupEventsByTournament, todaysEvents, eventsByFavoritesTeams],
  )(EventsService.getEvents());
}

async function allEvents() {
  return flowRight(
    [groupedEventsToReply, groupEventsByTournament, eventsByFavoritesTeams],
  )(EventsService.getEvents());
}

module.exports = {
  upcomingEvents,
  allEvents,
};
