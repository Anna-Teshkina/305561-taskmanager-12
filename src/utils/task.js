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
