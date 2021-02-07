const get = require('lodash/get');
const groupBy = require('lodash/groupBy');
const isToday = require('date-fns/isToday');
const { favoriteTeams } = require('../config/teams');
const { DATE_TIME_FORMAT, TIME_FORMAT } = require('../config/date');

// team : { name: 'Na'Vi', id: 1111 },
function isFavoriteTeam(team) {
  return favoriteTeams.find((favoriteTeam) => get(team, 'id', null) === favoriteTeam.id || get(team, 'name', null) === favoriteTeam.name);
}

function isZero(events) {
  return Object.keys(events).length <= 0;
}

function eventDateFormat(eventDate) {
  const eDate = new Date(eventDate);
  if (isToday(eDate)) return TIME_FORMAT;
  return DATE_TIME_FORMAT;
}

function eventsByFavoritesTeams(events) {
  return events.filter((event) => isFavoriteTeam(event.team1) || isFavoriteTeam(event.team2));
}

function groupEventsByTournament(events) {
  return groupBy(events, 'event.name');
}

function todaysEvents(events) {
  return events.filter((event) => isToday(new Date(event.date)));
}

function getNewEvents(prevEvents, fetchedEvents) {
  const newEvents = [];
  console.log(prevEvents, fetchedEvents);
  fetchedEvents.forEach((event) => {
    const isExist = !!prevEvents.find((prevEvent) => prevEvent.id === event.id);
    if (isExist) newEvents.push(event);
  });
  return newEvents;
}

function compareCurrentlyFetchedWithPrevEvents(prevEvents, events) {
  const newEvents = getNewEvents(prevEvents, events);
  return newEvents;
}

module.exports = {
  compareCurrentlyFetchedWithPrevEvents,
  eventsByFavoritesTeams,
  isZero,
  todaysEvents,
  groupEventsByTournament,
  eventDateFormat,
};
