import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils/task.js";

const taskToFilterMap = {
  all: (tasks) => tasks.length,
  overdue: (tasks) => tasks
    .filter((task) => isTaskExpired(task.dueDate)).length,
  today: (tasks) => tasks
    .filter((task) => isTaskExpiringToday(task.dueDate)).length,
  favorites: (tasks) => tasks
    .filter((task) => task.isFavorite).length,
  repeating: (tasks) => tasks
    .filter((task) => isTaskRepeating(task.repeatingDays)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length,
};

export const generateFilter = (tasks) => {
  // фильтры применяются для всех НЕВЫПОЛНЕННЫХ задач (= все задачи которые НЕ В АРХИВЕ)
  // заведем массив notArchivedTasks, в который занесем все невыполненные задачи
  // а затем применим ф-цию taskToFilterMap для генерации кол-ва задач для каждого фильтра

  const notArchivedTasks = tasks.filter((task) => !task.isArchive);

  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: filterName === `archive` ? countTasks(tasks) : countTasks(notArchivedTasks),
    };
  });
};
