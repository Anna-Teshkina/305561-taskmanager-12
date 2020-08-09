// СГЕНЕРИРУЕМ МОКИ ДЛЯ ОПИСАНИЯ НАШИХ ЗАДАЧ

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// генерируем случайное описание для карточки задачи
const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

// Опишем функцию генерации даты
const generateDate = () => {
  // 0 - даты дедлайна нет - возвращаем null, 
  // 1 - дата дедлайна есть (по условию +- 7 дней от текущей). 
  // для верности приводим к булевому типу с помощью Boolean
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  // По заданию дедлайн у задачи устанавливается без учёта времеми,
  // но объект даты без времени завести нельзя,
  // поэтому будем считать срок у всех задач -
  // это 23:59:59 установленной даты
  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

// Опишем функцию для генерации дней повторения
// Дни повторения будем выбирать случайно из двух - среды и пятницы

// Если рандомизировать абсолютно все дни, такие данные не будут похожи на реальные, 
// потому что из семи случайных булевых значений почти каждый раз будет хоть одно истинное, 
// а значит почти все задачи будут повторяющимися
const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

export const generateTask = () => {
	const dueDate = generateDate();

	// если дата дедлайна отсутствует, то нужно генерировать дни повторения
	// в противном случае - не нужно, все дни false
	const repeatingDays = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeatingDays,
    color: `black`,
    isFavorite: false,
    isArchive: false,
  };
};