// Добавляем абстрактный класс. 
// Абстрактный класс нужен, чтобы в одном месте описать общую логику наших компонентов, 
// а после переиспользовать ее благодаря наследованию.

// N.B. Проверка в конструктор е на "new.target" позволит использовать абстрактный класс 
// только в качестве родительского класса. При поп ытке выполнить "new Abstract()" 
// разработчик получит ошибку.

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }
}
