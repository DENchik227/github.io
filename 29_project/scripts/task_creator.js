document.getElementById('back-button').addEventListener('click', function() {
    history.back();
});

// Находим элемент с классом repeatability_disable
const repeatabilityElement = document.querySelector('.repeatability_disable');

// Добавляем обработчик события на клик
repeatabilityElement.addEventListener('click', function() {
    // Меняем класс с repeatability_disable на repeatability_able
    this.classList.remove('repeatability_disable');
    this.classList.add('repeatability_able');

    // Находим элемент с классом repeatability_count внутри нажатого элемента
    const inputElement = this.querySelector('.repeatability_count');
    
    // Устанавливаем фокус на input и выделяем текст внутри
    inputElement.focus();
    inputElement.select();
});


document.addEventListener("DOMContentLoaded", function () {
    // Выбираем все элементы с классом 'movable_length'
    const inputs = document.querySelectorAll(".movable_length");

    function adjustInputWidth(input, extraChars) {
        const length = input.value.length;
        // Устанавливаем ширину на основе длины значения в input
        input.style.width = `${length + extraChars}ch`;
    }

    // Настраиваем начальную ширину для каждого input
    inputs.forEach(input => {
        if (input.classList.contains("dynamic-input")) {
            adjustInputWidth(input, 0);
        } else if (input.classList.contains("repeatability_count")) {
            adjustInputWidth(input, 1);
        }
    });

    // Добавляем слушатель событий на изменение значения в input
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.classList.contains("dynamic-input")) {
                adjustInputWidth(input, 0);
            } else if (input.classList.contains("repeatability_count")) {
                adjustInputWidth(input, 1);
            }
        });
    });
});


// Получаем все кнопки с классом 'chin task'
const buttons = document.querySelectorAll(".chin.task");
// Добавляем обработчик события на каждую кнопку
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Переключаем классы между 'completed' и 'uncompleted'
        if (this.classList.contains("completed")) {
            this.classList.remove("completed");
            this.classList.add("uncompleted");
        } else {
            this.classList.remove("uncompleted");
            this.classList.add("completed");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const taskContainer = document.querySelector(".steps"); // Контейнер для задач
    const newTaskInput = taskContainer.querySelector('input[placeholder="Создать подзадачу"]'); // Поле для создания подзадачи

    // Функция для удаления пустых задач, исключая элемент с классом under_step_creator
    function removeEmptyTasks() {
        const tasks = taskContainer.querySelectorAll('.task');
        tasks.forEach(task => {
            const input = task.querySelector('input');
            // Удаляем только если input пустой и элемент не содержит класс under_step_creator
            if (input.value.trim() === "" && !task.classList.contains('under_step_creator')) {
                task.remove();
            }
        });
    }

    // Обработчик события для создания новой задачи
    newTaskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && newTaskInput.value.trim() !== "") {
            // Получаем количество уже существующих шагов
            const existingSteps = taskContainer.querySelectorAll('.task').length;

            // Создаём новый элемент задачи
            const newTaskDiv = document.createElement("div");
            newTaskDiv.classList.add("chin", "task", "uncompleted", `step${existingSteps}`); // Добавляем класс step с номером

            // Создаём input для новой задачи
            const newTaskTextInput = document.createElement("input");
            newTaskTextInput.type = "text";
            newTaskTextInput.value = newTaskInput.value;
            newTaskDiv.appendChild(newTaskTextInput);

            // Добавляем новый элемент задачи перед полем "Создать подзадачу"
            taskContainer.insertBefore(newTaskDiv, newTaskInput.parentElement);

            // Очищаем поле ввода
            newTaskInput.value = "";

            // Добавляем обработчик для переключения состояния задачи
            newTaskDiv.addEventListener("click", function () {
                if (newTaskDiv.classList.contains("completed")) {
                    newTaskDiv.classList.remove("completed");
                    newTaskDiv.classList.add("uncompleted");
                } else {
                    newTaskDiv.classList.remove("uncompleted");
                    newTaskDiv.classList.add("completed");
                }
            });

            // Добавляем обработчик для удаления пустых задач при потере фокуса
            newTaskTextInput.addEventListener("blur", removeEmptyTasks);
        }
    });

    // Обработчик события для удаления пустых задач при потере фокуса
    taskContainer.addEventListener("blur", function (e) {
        if (!e.target.matches('.task input')) {
            removeEmptyTasks();
        }
    }, true);

    // Обработчик события для удаления пустых задач при нажатии Enter в любом input
    taskContainer.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            removeEmptyTasks();
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('task_crewor');
    const confirmButton = document.querySelector('.confirm');
    
    confirmButton.addEventListener('click', function() {
        // Получаем данные из формы
        const taskNameInput = form.querySelector('.task_name');
        const taskName = taskNameInput.value.trim();
        
        // Проверяем, что поле task_name не пустое
        if (taskName === "") {
            alert("Название задачи обязательно для заполнения.");
            return;
        }
        
        // Создаем объект задачи
        const task = {
            task_name: taskName,
            steps: {},
            difficult: form.querySelector('.dynamic-input').value.trim() || "",
            selected_list: form.querySelector('#selected_list').value || "",
            date: form.querySelector('#date').value || "",
            time: form.querySelector('#time').value || "",
            repeatability: {
                type: document.querySelector('.repeatability_able') ? "repeatability_able" : "repeatability_disable",
                count: form.querySelector('.repeatability_count').value.trim() || "",
                unit: form.querySelector('#time-unit').value || ""
            },
            file: form.querySelector('#bg_img').files[0] ? form.querySelector('#bg_img').files[0].name : "",
            place: form.querySelector('.place').value.trim() || "",
            description: form.querySelector('#list_description').value.trim() || ""
        };
        
        // Получаем все шаги и добавляем их в объект steps
        const steps = form.querySelectorAll('.steps .task');
        steps.forEach((step, index) => {
            const input = step.querySelector('input');
            if (input && input.value.trim() !== "" && !step.classList.contains('under_step_creator')) {
                task.steps[`step${index + 1}`] = input.value.trim();
            }
        });
        
        // Генерируем уникальное имя для нового объекта задачи
        let taskNumber = 1;
        while (localStorage.getItem(`task${taskNumber}`)) {
            taskNumber++;
        }
        const taskNameKey = `task${taskNumber}`;
        
        // Сохраняем объект в localStorage
        localStorage.setItem(taskNameKey, JSON.stringify(task));
        
        // Опционально: Очищаем форму после сохранения
        form.reset();
        document.querySelectorAll('.task').forEach(task => task.remove());
    });
});