const TASK_COUNT = 22;
// const TASK_COUNT_PER_STEP = 8;

import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// console.log(tasks);
const filters = generateFilter(tasks);
// console.log(filters);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteFilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
