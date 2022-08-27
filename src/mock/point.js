import { getRandomInteger } from '../utils.js';
import { getOffers } from './offers.js';

const generateCities = () => {

  const cities = [
    'London',
    'Dubai',
    'Kazan',
    'Los Angeles'
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDescription = () => {

  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePointType = () => {

  const pointType = [
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

  const randomIndex = getRandomInteger(0, pointType.length - 1);

  return pointType[randomIndex];
};
const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(0, 10); i++) {
    pictures.push({
      src: `http://picsum.photos/300/200?r=0.076256300516331${getRandomInteger(0, 9)}`,
      description: generateDescription()
    });
  }
  return pictures;
};

const generateDestination = (idValue) => ({
  id: idValue,
  description: generateDescription(),
  name: generateCities(),
  pictures: generatePictures()
}
);

export const destinations = [];
for (let i = 0; i < 10; i++) {
  destinations.push(generateDestination(i));
}

export const generateDataPoint = () => ({
  basePrice: getRandomInteger(200, 3000),
  dateFrom: new Date(getRandomInteger(2010, 2022), getRandomInteger(0, 12), getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 60)),
  dateTo: new Date(),
  destination: getRandomInteger(0, 9),
  id: '0',
  offers: [],
  type: generatePointType(),
});

export const generatePoint = () => {
  const dataPoint = generateDataPoint();
  const dataType = dataPoint.type;
  const getOffersId = function() {
    for (let i = 0; i <= getOffers().length; i++) {
      if (dataType === getOffers()[i].type) {
        return getOffers()[i].offers;
      }
    }
  };
  const OffersId = () => getOffersId().map((offer) => offer.id);
  dataPoint.offers = OffersId();

  return dataPoint;
};
