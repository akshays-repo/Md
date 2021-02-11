let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: todayStr,
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: todayStr + 'T12:00:00',
  // },
  {
    id: createEventId(),
    title: 'Cancelled',
    start: todayStr + 'T12:10:00',
    name: 'Sabitra Kandel',
  },
  {
    id: createEventId(),
    title: 'Unavailable',
    start: todayStr + 'T01:20:00',
    name: 'Shailesh Kandel',
  },
  {
    id: createEventId(),
    title: 'Unavailable',
    start: todayStr + 'T03:20:00',
    name: 'Shailesh Kandel',
  },
  {
    id: createEventId(),
    title: 'Booking',
    start: todayStr + 'T15:30:00',
    name: 'Shanti Kandel',
  },
  {
    id: createEventId(),
    title: 'Cancelled',
    start: todayStr + 'T12:10:00',
    name: 'Sabitra Kandel',
  },
  {
    id: createEventId(),
    title: 'Unavailable',
    start: todayStr + 'T01:20:00',
    name: 'Shailesh Kandel',
  },
  {
    id: createEventId(),
    title: 'Booking',
    start: todayStr + 'T08:20:00',
    name: 'Shailesh Kandel',
  },
  {
    id: createEventId(),
    title: 'Booking',
    start: todayStr + 'T20:30:00',
    name: 'Shanti Kandel',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
