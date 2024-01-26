// mockApi.js
const events = [];

const createEvent = (eventData) => {
  const newEvent = {
    id: events.length + 1,
    ...eventData,
  };

  events.push(newEvent);

  return newEvent;
};

const getAllEvents = () => {
  return events;
};

export { createEvent, getAllEvents };