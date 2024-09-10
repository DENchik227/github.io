// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const listKey = urlParams.get("list"); // Получаем ключ списка

// Загружаем данные из localStorage
const listData = JSON.parse(localStorage.getItem(listKey));

if (listData) {
    // Обновляем содержимое страницы на основе данных
    document.getElementById("listName").textContent = listData.list_name;
    document.getElementById("listIcon").src = listData.list_ico;
    document.documentElement.style.setProperty('--application_background_custom', listData.list_color);



    // Получаем значение переменной --header_size из CSS
    const headerSize = getComputedStyle(document.documentElement).getPropertyValue('--header_size').trim();
    console.log(`Header size: ${headerSize}`); // Логируем значение для проверки

    // Убираем 'px' для URL, так как это значение только числа
    const sizeValue = headerSize.replace('px', '');
    console.log(`Размер изображения: ${sizeValue}`); // Логируем для отладки

    // Формируем URL для background-image с нужным размером
    const iconUrl = `https://img.icons8.com/?size=${sizeValue}&id=357&format=png&color=E0E0E0`;
    console.log(`Ссылка на изображение: ${iconUrl}`); // Логируем URL

    // Устанавливаем background-image для кнопки
    const backButton = document.getElementById('back-button');
    backButton.style.backgroundImage = `url(${iconUrl})`;



    // Добавляем функциональность кнопке "Назад"
    backButton.addEventListener('click', () => {
        window.history.back(); // Возврат на предыдущую страницу
    });
} else {
    document.body.innerHTML = "<p>Список не найден.</p>";
}




document.addEventListener("DOMContentLoaded", function () {
    const taskContainer = document.getElementById('tasks_container'); // Контейнер для задач
    const selectedList = "Работа"; // Указываем текущий список, например "Работа"
    
    // Получаем все ключи из localStorage
    const localStorageKeys = Object.keys(localStorage);
    
    // Фильтруем только ключи, которые начинаются с "task" (задачи)
    const taskKeys = localStorageKeys.filter(key => key.startsWith("task"));

    taskKeys.forEach(taskKey => {
        const taskData = JSON.parse(localStorage.getItem(taskKey));
        
        // Проверяем, что задача принадлежит выбранному списку
        if (taskData.selected_list !== selectedList) {
            return; // Пропускаем задачи, которые не принадлежат списку "Работа"
        }

        // Создаем элемент кнопки для задачи
        const taskElement = document.createElement("button");
        taskElement.className = `task ${taskKey} uncompleted`;
        taskElement.textContent = taskData.task_name;

        // Создаем контейнер для дополнительной информации
        const additionalInfo = document.createElement("div");
        additionalInfo.className = "additional_information_about_the_task";

        // 1. Добавляем элемент для названия списка (source_list) с цветом текста
        const sourceListElement = document.createElement("span");
        sourceListElement.className = "source_list";
        sourceListElement.textContent = taskData.selected_list;

        // Получаем цвет списка из localStorage (предполагаем, что списки хранятся в формате lists_имя)
        const listKey = `lists_${taskData.selected_list.replace(/\s+/g, '_')}`;
        const listData = JSON.parse(localStorage.getItem(listKey));

        if (listData && listData.list_color) {
            sourceListElement.style.color = listData.list_color; // Устанавливаем цвет текста
        }

        // 2. Добавляем элемент для даты и времени (time)
        const timeElement = document.createElement("time");
        const date = taskData.date;
        const time = taskData.time;
        timeElement.textContent = `${date} ${time}`;
        timeElement.setAttribute("datetime", `${date}T${time}`);

        // 3. Условно добавляем иконку повторяемости, если она есть
        let repeatabilityElement = null;
        if (taskData.repeatability.type === "repeatability_able") {
            repeatabilityElement = document.createElement("img");
            repeatabilityElement.src = "https://img.icons8.com/?size=19&id=11680&format=png&color=E0E0E0";
            repeatabilityElement.className = "repeatability";
        }

        // 4. Условно добавляем иконку файла, если файл существует
        let fileElement = null;
        if (taskData.file) {
            fileElement = document.createElement("img");
            fileElement.src = "https://img.icons8.com/?size=19&id=1395&format=png&color=E0E0E0";
            fileElement.className = "file";
        }

        // 5. Условно добавляем иконку местоположения, если место существует
        let locationElement = null;
        if (taskData.place) {
            locationElement = document.createElement("img");
            locationElement.src = "https://img.icons8.com/?size=19&id=2436&format=png&color=E0E0E0";
            locationElement.className = "location";
        }

        // Добавляем элементы в правильном порядке
        additionalInfo.appendChild(sourceListElement); // Сначала название списка
        additionalInfo.appendChild(timeElement);       // Затем дата и время

        // Если присутствует, добавляем иконку повторяемости
        if (repeatabilityElement) {
            additionalInfo.appendChild(repeatabilityElement);
        }

        // Если присутствует, добавляем иконку файла
        if (fileElement) {
            additionalInfo.appendChild(fileElement);
        }

        // Если присутствует, добавляем иконку местоположения
        if (locationElement) {
            additionalInfo.appendChild(locationElement);
        }

        // Вставляем информацию в элемент задачи
        taskElement.appendChild(additionalInfo);

        // Добавляем задачу в контейнер на странице
        taskContainer.appendChild(taskElement);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Функция для обновления задачи
    function updateTask(taskElement, oldTaskName) {
        // Меняем класс задачи
        taskElement.classList.remove('uncompleted');
        taskElement.classList.add('completed');
        
        // Генерируем ключ для завершённой задачи
        const newTaskKey = `completed_task_${oldTaskName}`;
        
        // Получаем данные задачи из localStorage
        const taskData = JSON.parse(localStorage.getItem(`task${oldTaskName}`));
        
        // Удаляем старый ключ
        localStorage.removeItem(`task${oldTaskName}`);
        
        // Сохраняем данные задачи с новым ключом
        localStorage.setItem(newTaskKey, JSON.stringify(taskData));
        
        // Переносим задачу в раздел завершённых задач
        const completedTasksContainer = document.getElementById('completed-tasks');
        completedTasksContainer.appendChild(taskElement);
    }
    
    // Обработка кликов по задачам
    document.querySelectorAll('.task').forEach(taskElement => {
        taskElement.addEventListener('click', function() {
            const taskName = this.textContent.trim();
            
            // Убедимся, что у задачи есть класс uncompleted
            if (this.classList.contains('uncompleted')) {
                // Обновляем задачу
                updateTask(this, taskName);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Функция для обновления задачи
    function updateTask(taskElement, oldTaskName, isCompleted) {
        // Получаем ключи для задачи
        const oldTaskKey = `task${oldTaskName}`;
        const newTaskKey = isCompleted ? `completed_task_${oldTaskName}` : oldTaskKey;
        const oppositeTaskKey = isCompleted ? oldTaskKey : `completed_task_${oldTaskName}`;

        // Меняем класс задачи
        if (isCompleted) {
            taskElement.classList.remove('uncompleted');
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
            taskElement.classList.add('uncompleted');
        }

        // Переносим задачу между разделами
        const targetContainer = isCompleted ? document.getElementById('completed-tasks') : document.querySelector('#tasks-list');
        targetContainer.appendChild(taskElement);

        // Получаем данные задачи из localStorage
        const taskData = JSON.parse(localStorage.getItem(oppositeTaskKey));

        // Удаляем старый ключ
        localStorage.removeItem(oppositeTaskKey);

        // Сохраняем данные задачи с новым ключом
        localStorage.setItem(newTaskKey, JSON.stringify(taskData));
    }

    // Обработка кликов по задачам
    function setupTaskClickHandlers() {
        document.querySelectorAll('.task').forEach(taskElement => {
            taskElement.addEventListener('click', function() {
                const taskName = this.textContent.trim();
                const isCompleted = this.classList.contains('completed');
                
                // Обновляем задачу
                updateTask(this, taskName, isCompleted);
            });
        });
    }
    
    // Настройка задачи при загрузке страницы
    setupTaskClickHandlers();
    
    // Загружаем завершённые задачи
    const completedTasksContainer = document.getElementById('completed-tasks');
    const localStorageKeys = Object.keys(localStorage);
    
    localStorageKeys.forEach(key => {
        if (key.startsWith("completed_task_")) {
            const taskData = JSON.parse(localStorage.getItem(key));
            const taskElement = document.createElement('button');
            taskElement.className = `task completed`;
            taskElement.textContent = taskData.task_name;
            
            // Дополните создание элемента задачи дополнительной информацией
            // ...

            completedTasksContainer.appendChild(taskElement);
        }
    });
});
