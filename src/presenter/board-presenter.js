import {render} from '../render.js';
import PointsView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-events-list-view';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = [...this.pointsModel.getPoint()];

    render(new SortView(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EditPointView(this.boardPoints[0]), this.eventsList.getElement());
    render(new NewPointView(), this.eventsList.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointsView(this.boardPoints[i]), this.eventsList.getElement());
    }
  };
}
