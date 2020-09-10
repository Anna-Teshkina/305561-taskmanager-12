const TASK_COUNT = 22;
// const TASK_COUNT_PER_STEP = 8;

import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
// import BoardView from "./view/board.js";
// import SortView from "./view/sort.js";
// import TaskListView from "./view/task-list.js";
// import NoTaskView from "./view/no-task.js";
// import TaskView from "./view/task.js";
// import TaskEditView from "./view/task-edit.js";
// import LoadBtnView from "./view/load-btn.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import {render, RenderPosition} from "./utils/render.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// console.log(tasks);
const filters = generateFilter(tasks);
// console.log(filters);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// const renderTask = (taskListElement, task) => {
//   const taskComponent = new TaskView(task);
//   const taskEditComponent = new TaskEditView(task);

//   const replaceCardToForm = () => {
//     replace(taskEditComponent, taskComponent);
//   };

//   const replaceFormToCard = () => {
//     replace(taskComponent, taskEditComponent);
//   };

//   const onEscKeyDown = (evt) => {
//     if (evt.key === `Escape` || evt.key === `Esc`) {
//       evt.preventDefault();
//       replaceFormToCard();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };

//   taskComponent.setEditClickHandler(() => {
//     replaceCardToForm();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });

//   taskEditComponent.setFormSubmitHandler(() => {
//     replaceFormToCard();
//     document.removeEventListener(`keydown`, onEscKeyDown);
//   });

//   render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
// };

// const renderBoard = (boardContainer, boardTasks) => {
//   const boardComponent = new BoardView();
//   const taskListComponent = new TaskListView();

//   render(boardContainer, boardComponent, RenderPosition.BEFOREEND);
//   render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);

//   По условию заглушка должна показываться,
//   когда нет задач или все задачи в архиве.
//   if (boardTasks.every((task) => task.isArchive)) {
//     render(boardComponent, new NoTaskView(), RenderPosition.AFTERBEGIN);
//     return;
//   }

//   render(boardComponent, new SortView(), RenderPosition.AFTERBEGIN);

//   boardTasks
//     .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
//     .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

//   Ограничим первую отрисовку по минимальному количеству,
//   чтобы не пытаться рисовать 8 задач, если всего 5
//   for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
//     renderTask(taskListComponent.getElement(), tasks[i]);
//   }

//   if (boardTasks.length > TASK_COUNT_PER_STEP) {
//     let renderedTaskCount = TASK_COUNT_PER_STEP; // счетчик показанных задач
//     const loadBtnComponent = new LoadBtnView();
//     render(boardComponent.getElement(), loadBtnComponent.getElement(), RenderPosition.BEFOREEND);

//     // По клику будем допоказывать задачи, опираясь на счётчик
//     loadBtnComponent.setClickHandler(() => {
//       boardTasks
//         .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
//         .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

//       renderedTaskCount += TASK_COUNT_PER_STEP;

//       // Если показаны все задачи - скроем кнопку
//       if (renderedTaskCount >= boardTasks.length) {
//         remove(loadBtnComponent);
//       }
//     });
//   }
// };

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteFilterView(filters), RenderPosition.BEFOREEND);

// renderBoard(siteMainElement, tasks);
