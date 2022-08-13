import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFiltres = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();


render(new FiltersView(), tripControlsFiltres);
boardPresenter.init(tripEventsSection);
