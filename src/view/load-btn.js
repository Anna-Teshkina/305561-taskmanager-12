import AbstractView from "./abstract.js";

// шаблон кнопки загрузки
export const createLoadBtnTemplate = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class LoadBtn extends AbstractView {
  getTemplate() {
    return createLoadBtnTemplate();
  }
}
