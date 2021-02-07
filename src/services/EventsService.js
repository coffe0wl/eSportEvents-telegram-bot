const { HLTV } = require('hltv');
const format = require('date-fns/format');
const config = require('../../confing');
const { onFetchEvent } = require('../utils/eventServiceHelper');

class EventsService {
  constructor() {
    this.events = [];
    this.init();
  }

  init() {
    this.fetchEvents();
    setInterval(this.fetchEvents.bind(this), config.updateEventsInterval);
    console.log('Events Service initialized - TRUE');
  }

  async fetchEvents() {
    await HLTV.getMatches().then((events) => {
      console.log(`Fetched: ${events.length} events - ${format(new Date(), 'PP, HH:mm')}`);
      onFetchEvent(this.events, events);
      this.setEvents(events);
    });
    // console.log(a);
  }

  setEvents(events) {
    this.events = events;
  }

  getEvents() {
    return this.events;
  }

  async getAsyncEvents() {
    const events = await this.fetchEvents();
    return events;
  }
}

module.exports = new EventsService();
