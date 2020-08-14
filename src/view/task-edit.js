// функция определяет просрочена ли дата дедлайна
// если дедлайна нет возвращаем - null
const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  return currentDate > dueDate.getTime();
};

//функция определяет повторяется ли задача
const isRepeating = (repeatingDays) => {
  // Object.values(repeating).some(Boolean) ? console.log('Есть повторение') : console.log('Нет повторения');
  return Object.values(repeatingDays).some(Boolean);
};

// если дата дедлайна есть выводим date: yes, в строке ниже указываем дату в заданном формате
// если дедлайн не задан, выставляем date: no.
const createTaskEditDateTemplate = (dueDate) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>
    ${dueDate !== null ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})}"
        />
      </label>
    </fieldset>` : ``}
  `;
};

// если задача поторяется, выводим repeat: yes, ниже формируем лист дней недели с указанием в какие дни происходит повторение задачи
// если не повторяется, выводим repeat: no.
const createTaskEditRepeatingTemplate = (repeatingDays) => {
  return `<button class="card__repeat-toggle" type="button">
    repeat:<span class="card__repeat-status">${isRepeating(repeatingDays) ? `yes` : `no`}</span>
  </button>
  ${isRepeating(repeatingDays) ? `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.entries(repeatingDays).map(([day, repeat]) => `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}"
        name="repeat"
        value="${day}"
        ${repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}"
        >${day}</label
      >`).join(``)}
    </div>
  </fieldset>` : ``}`;
};

// шаблон редактирования карточки
export const createTaskEditTemplate = (task = {}) => {
  const {
    color = `black`,
    description = ``,
    dueDate = null,
    repeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    }
  } = task;

  // используем функцию isExpired для добавления класса-модификатора
  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  // формируем шаблон даты дедлайна  
  const dateTemplate = createTaskEditDateTemplate(dueDate);

  // используем ф-цию isRepeating для добавления класса-модификатора
  const repeatingClassName = isRepeating(repeatingDays)
    ? `card--repeat`
    : ``;

  // формируем шаблон блока с указанием дней повторения задачи
  const repeatingTemplate = createTaskEditRepeatingTemplate(repeatingDays);  

  return `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              ${dateTemplate}
              ${repeatingTemplate}
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-4"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
              />
              <label
                for="color-black-4"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-4"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
                checked
              />
              <label
                for="color-yellow-4"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-4"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
              />
              <label
                for="color-blue-4"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-4"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
              />
              <label
                for="color-green-4"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-4"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
              />
              <label
                for="color-pink-4"
                class="card__color card__color--pink"
                >pink</label
              >
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};
