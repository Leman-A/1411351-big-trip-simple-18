import {getRandomInteger, humanizeTime} from '../utils.js';

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

const generateOffers = () => {

  const offers =
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120
  };

  return offers;
};

export const generateDestination = () => ({
  id: 1,
  description: generateDescription(),
  name: generateCities(),
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building',
    }
  ]
}
);

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: humanizeTime('2019-07-10T22:55:56.845Z'),
  dateTo: humanizeTime('2019-07-11T11:22:13.375Z'),
  destination: generateDestination(),
  id: '0',
  offers: generateOffers(),
  type: generatePointType(),
});


