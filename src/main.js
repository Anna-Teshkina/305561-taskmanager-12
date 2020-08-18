const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createBoardTemplate} from "./view/board.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadBtnTemplate} from "./view/load-btn.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// console.log(tasks);
const filters = generateFilter(tasks);
// console.log(filters);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSiteFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

// Ограничим первую отрисовку по минимальному количеству,
// чтобы не пытаться рисовать 8 задач, если всего 5
for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP; // счетчик показанных задач
  render(boardElement, createLoadBtnTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  // По клику будем допоказывать задачи, опираясь на счётчик
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    // Если показаны все задачи - скроем кнопку
    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
