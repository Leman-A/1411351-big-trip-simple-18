import dayjs from 'dayjs';
// import flatpickr from 'flatpickr';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDate = (dueDate) => dayjs(dueDate).format('DD MMM');

export {getRandomInteger, humanizeTime, humanizeDate};
