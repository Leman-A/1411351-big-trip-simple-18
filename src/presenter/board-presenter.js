import { render } from '../render.js';
import PointsView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-events-list-view';
// import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import EmptyView from '../view/list-empty-view.js';

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = this.pointsModel.points;

    render(new SortView(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    // render(new NewPointView(this.boardPoints[1]), this.eventsList.element);

    if (this.boardPoints.every((point) => point.isArchive)) {
      render(new EmptyView(), this.eventsList.element);
    } else {
      for (let i = 0; i < this.boardPoints.length; i++) {
        this.#renderPoint(this.boardPoints[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointsView(point);
    const editPointComponent = new EditPointView(point);

    const replaceEditFormToPoint = () => {
      this.eventsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const replacePointToEditForm = () => {
      this.eventsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefaul();
      replaceEditFormToPoint();
    });

    render(pointComponent, this.eventsList.element);
  };
}
