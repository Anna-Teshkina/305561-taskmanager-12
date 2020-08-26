const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import NoTaskView from "./view/no-task.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/task-edit.js";
import LoadBtnView from "./view/load-btn.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import {render, RenderPosition} from "./utils.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// console.log(tasks);
const filters = generateFilter(tasks);
// console.log(filters);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteFilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new BoardView().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);


// По условию заглушка должна показываться,
// когда нет задач или все задачи в архиве.
if (tasks.every((task) => task.isArchive)) {
  render(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

  const taskListComponent = new TaskListView();
  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  // Ограничим первую отрисовку по минимальному количеству,
  // чтобы не пытаться рисовать 8 задач, если всего 5
  for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
    renderTask(taskListComponent.getElement(), tasks[i]);
  }

  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP; // счетчик показанных задач

    const loadBtnComponent = new LoadBtnView();

    render(boardComponent.getElement(), loadBtnComponent.getElement(), RenderPosition.BEFOREEND);

    // По клику будем допоказывать задачи, опираясь на счётчик
    loadBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      // Если показаны все задачи - скроем кнопку
      if (renderedTaskCount >= tasks.length) {
        loadBtnComponent.getElement().remove();
        loadBtnComponent.removeElement();
      }
    });
  }
}
