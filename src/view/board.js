import AbstractView from "./abstract.js";

// шаблон доски
const createBoardTemplate = () => {
  return `<section class="board container"></section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
