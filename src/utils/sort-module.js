import dayjs from 'dayjs';

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};


const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

export const sortPointDay = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.dateFrom, dataB.dateFrom);
  return weight ?? dayjs(dataB.dateFrom).diff(dayjs(dataA.dateFrom));
};

export const sortPointEvent = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.type, dataB.type);
  return weight ?? dataA.type > dataB.type;
};

export const sortPointTime = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.dateFrom, dataB.dateFrom);
  return weight ?? dayjs(dataB.dateFrom).diff(dayjs(dataA.dateFrom));
};

export const sortPointPrice = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.basePrice, dataB.basePrice);
  return weight ?? dataA.basePrice - dataB.basePrice;
};

export const sortPointOffers = (dataA, dataB) => {
  const weight = getWeightForNullData(dataA.offers, dataB.offers);
  return weight ?? dataA.offers < dataB.offers;
};
