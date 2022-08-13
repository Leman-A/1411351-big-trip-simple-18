import {render} from '../render.js';
import PointsView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-events-list-view';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new SortView(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EditPointView, this.eventsList.getElement());
    render(new NewPointView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointsView(), this.eventsList.getElement());
    }
  };
}
