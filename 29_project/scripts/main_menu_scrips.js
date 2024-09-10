document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".list_create"); // Элемент, после которого будут добавлены списки
  const localStorageKeys = Object.keys(localStorage);
  
  // Фильтруем только ключи, которые начинаются с "lists_"
  const listKeys = localStorageKeys.filter(key => key.startsWith("lists_"));

  listKeys.forEach(key => {
    const listData = JSON.parse(localStorage.getItem(key));
    const listName = listData.list_name;
    const listColor = listData.list_color;

    // Создаём новый элемент для каждого списка
    const newListElement = document.createElement("a");
    newListElement.href = `./list_viewer.html?list=${key}`; // Передаём ключ через URL
    newListElement.className = `tasks_list ${listName.replace(/\s/g, "_")}`;
    newListElement.textContent = listName;

    // Применяем цвет через создание нового стиля
    const style = document.createElement('style');
    style.textContent = `
      .${listName.replace(/\s/g, "_")} {
        border-bottom: 4px solid ${listColor};
      }
    `;
    document.head.appendChild(style);

    // Вставляем новый элемент на страницу перед кнопкой создания нового списка
    container.parentNode.insertBefore(newListElement, container);
  });
});

  