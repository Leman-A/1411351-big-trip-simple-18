import { getRandomInteger } from '../utils/utils.js';
import { getOffers } from './offers.js';
import { nanoid } from 'nanoid';

export const pointType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, pointType.length - 1);
  return pointType[randomIndex];
};

export const generateDataPoint = () => ({
  basePrice: getRandomInteger(200, 3000),
  dateFrom: new Date(getRandomInteger(2010, 2025), getRandomInteger(0, 12), getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 60)),
  dateTo: new Date(),
  destination: getRandomInteger(0, 4),
  id: nanoid(),
  offers: [],
  type: generatePointType(),
});

export const generatePoint = () => {
  const dataPoint = generateDataPoint();
  const dataType = dataPoint.type;
  const getOffersId = getOffers().find((offer) => offer.type === dataType).offers.map((offer) => offer.id);
  dataPoint.offers = getOffersId;
  dataPoint.offers.pop();
  return dataPoint;
};

