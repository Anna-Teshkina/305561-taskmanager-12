// Функция получает текущую дату и устанавливает
// время равное концу текущего дня - 23:59:59
const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

// функция определяет просрочена ли дата дедлайна
// если дедлайна нет возвращаем - null
export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();
  return currentDate.getTime() > dueDate.getTime();
};

// функция определяет задачи которые истекают сегодня
export const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDate();

  return currentDate.getTime() === dueDate.getTime();
};

// функция определяет повторяется ли задача
export const isTaskRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

// по возрастанию
export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

// по убыванию
export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};
