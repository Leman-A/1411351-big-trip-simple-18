// import NewPointView from '../view/new-point-view.js';
import PointsView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';
import TripListView from '../view/trip-events-list-view';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

const tripEvents = document.querySelector('.trip-events');

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), tripEvents);
    render(this.eventsList, tripEvents);
    render(new EditPointView, this.eventsList.getElement());
    render(new NewPointView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointsView(), this.eventsList.getElement());
    }
  };
}
