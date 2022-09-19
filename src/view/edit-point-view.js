import { humanizeDateTime } from '../utils/utils.js';
import { cities, DESTINATIONS } from '../mock/destinations.js';
import { getOffers } from '../mock/offers.js';
import { pointType } from '../mock/point.js';
import AbstractStatefulView from '../framework/view/Abstract-Stateful-View.js';

const offerTemplate = (offer, checked) => (
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${checked}>

    <label class="event__offer-label" for="event-offer-${offer.title}-${offer.id}" data-offer-id="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
  `
);

const getAllOffersId = (type, offersInner) => {
  const listOfAllOffers = getOffers().find((offer) => offer.type === type).offers;

  let checked = null;
  const finalListOfOffers = [];

  for (let i = 0; i < listOfAllOffers.length; i++) {
    if (offersInner[i]) {
      checked = listOfAllOffers[i].id === offersInner[i].id ? 'checked' : '';
    } else {
      checked = '';
    }
    finalListOfOffers.push(offerTemplate(listOfAllOffers[i], checked));
  }
  return finalListOfOffers.join('');
};

const offersTemplateContainer = (allOffers) => {
  if (!allOffers) {return '';}
  return (
    `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${allOffers}
        </div>
      </section>
    `
  );
};

const createPictureTemplate = (pictures) => (`<img class="event__photo" src="${pictures.src}" alt="Event photo">`);
const createPicturesTemplate = (destination) => destination.pictures.length ? destination.pictures.map(createPictureTemplate).join('') : '';

const createCityTemplate = (city) => (`<option value="${city}"></option>`);
const createCitiesTemplate = (city) => city.length ? city.map(createCityTemplate).join('') : '';

const iconsTypesMarking = (typeInner, checked) => (
  `
    <div class="event__type-item">
      <input id="event-type-${typeInner}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInner}" ${checked}>
      <label class="event__type-label  event__type-label--${typeInner}" for="event-type-${typeInner}-1" data-point-type="${typeInner}">${typeInner}</label>
    </div>
  `
);

const iconsTypesChecked = (typeInner) => {
  const iconsListMarking = [];
  let checked = '';
  for (let i = 0; i < pointType.length; i++) {
    checked = typeInner === pointType[i] ? 'checked' : '';
    iconsListMarking.push(iconsTypesMarking(pointType[i], checked));
  }
  return iconsListMarking.join('');
};

const editPointTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;

  const allOffersByType = getAllOffersId(type, offers);
  const offersContainer = offersTemplateContainer(allOffersByType);
  const picturesTemplate = destination.pictures ? createPicturesTemplate(destination) : '';
  const iconsTyped = iconsTypesChecked(type);
  const citiesTemplate = createCitiesTemplate(cities);
  const humanizedDateFrom = dateFrom ? humanizeDateTime(dateFrom) : '';
  const humanizedDateTo = dateTo ? humanizeDateTime(dateTo) : '';
  const destinationName = destination.name || '';
  const destinationDescription = destination.description || '';
  const eventType = type || '';

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="">
        
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${iconsTyped}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
              <datalist id="destination-list-1">
                ${citiesTemplate}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizedDateFrom}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizedDateTo}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>

          <section class="event__details">
            ${offersContainer}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destinationDescription}</p>
              <div class="event__photos-container">
              <div class="event__photos-tape">
                ${picturesTemplate}
              </div>
            </div>
            </section>
          </section>

        </form>
      </li>
    `
  );
};

export default class EditPointView extends AbstractStatefulView {
  #point = null;

  constructor(point) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return editPointTemplate(this._state);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__section').addEventListener('click', this.#eventActivateClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#eventDestinationClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('click', this.#iconChangeClickHandler);
  };

  #iconChangeClickHandler = (evt) => {
    evt.preventDefault();
    evt.target.parentNode.firstElementChild.checked = !evt.target.parentNode.firstElementChild.checked;
    this.updateElement({type: evt.target.dataset.pointType});
  };

  #eventDestinationClickHandler = (evt) => {
    evt.preventDefault();

    const changeDestination = DESTINATIONS.find((destination) => destination.name === evt.target.value);
    if (changeDestination) {this.updateElement({destination: changeDestination});}
  };

  #eventActivateClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') {return;}

    evt.target.parentNode.firstElementChild.checked = !evt.target.parentNode.firstElementChild.checked;

    const allOffers = getOffers().find((offer) => offer.type === EditPointView.parseStateToPoint(this._state).type).offers;
    const clickedOfferElement = allOffers.find((offer) => offer.id === Number(evt.target.dataset.offerId));

    if (EditPointView.parseStateToPoint(this._state).offers[clickedOfferElement.id - 1]) {
      delete EditPointView.parseStateToPoint(this._state).offers[clickedOfferElement.id - 1];
    } else {
      EditPointView.parseStateToPoint(this._state).offers[clickedOfferElement.id - 1] = clickedOfferElement;
    }

    this.updateElement({offers: EditPointView.parseStateToPoint(this._state).offers});
  };

  static parsePointToState = (point) => ({...point});
  static parseStateToPoint = (state) => ({...state});
}
