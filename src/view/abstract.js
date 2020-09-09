// Добавляем абстрактный класс.
// Абстрактный класс нужен, чтобы в одном месте описать общую логику наших компонентов,
// а после переиспользовать ее благодаря наследованию.

// N.B. Проверка в конструктор е на "new.target" позволит использовать абстрактный класс
// только в качестве родительского класса. При поп ытке выполнить "new Abstract()"
// разработчик получит ошибку.

// Выносим общие методы в абстрактный класс:
// - Объявим методы getElement и removeElement
// - Объявим свойство _element
// - Метод getTemplate тоже объявим, но в качестве реализации будем бросать исключение, чтобы разработчик не забывал его переопределить

import {createElement} from "../utils.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
