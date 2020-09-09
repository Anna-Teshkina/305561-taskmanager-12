import AbstractView from "./abstract.js";
import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate} from "../utils.js";

// шаблон карточки
const createTaskTemplate = (task) => {
  const {color, description, dueDate, repeatingDays, isArchive, isFavorite} = task;

  // приводим дату дедлайна к заданному виду
  const date = dueDate !== null
    ? humanizeTaskDueDate(dueDate)
    : ``;

  // используем функцию isExpired для добавления класса-модификатора
  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  // используем ф-цию isRepeating для добавления класса-модификатора
  const repeatClassName = isTaskRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  return `<article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn ${archiveClassName}">
            archive
          </button>
          <button
            type="button"
            class="card__btn ${favoriteClassName}"
          >
            favorites
          </button>
        </div>
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`;
};

export default class Task extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }
}
