import FiltersView from './view/filters-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.page-body__page-main');
const tripControlsFiltres = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();


render(new FiltersView(), tripControlsFiltres);
boardPresenter.init(siteMainElement);
