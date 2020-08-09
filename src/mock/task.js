// СГЕНЕРИРУЕМ МОКИ ДЛЯ ОПИСАНИЯ НАШИХ ЗАДАЧ
export const generateTask = () => {
  return {
    description: null,
    dueDate: null,
    repeating: {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    },
    color: `black`,
    isArchive: false,
    isFavorite: false
  };
};