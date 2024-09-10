document.querySelector('.select-box').addEventListener('click', function() {
    document.querySelector('.options-container').classList.toggle('show');
});

document.querySelectorAll('.option').forEach(function(option) {
    option.addEventListener('click', function() {
        const value = option.getAttribute('data-value');
        const imgSrc = option.querySelector('img').src;
        document.getElementById('selectedIcon').querySelector('img').src = imgSrc;
        document.querySelector('.options-container').classList.remove('show');
        console.log('Selected value:', value); // Это значение можно использовать для дальнейшей обработки
    });
});

document.getElementById('color').addEventListener('input', function(event) {
    // Получаем выбранный цвет
    const selectedColor = event.target.value;
    
    // Устанавливаем его как переменную CSS для фона
    document.body.style.setProperty('--application_background_custom', selectedColor);
});




document.querySelector('.confirm').addEventListener('click', function (e) {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    const listIco = document.querySelector('.select-box img').src; // Получаем ссылку на выбранную иконку
    const listName = document.querySelector('.list_name').value.trim(); // Название списка
    const listColor = document.querySelector('.list_color input[type="color"]').value; // Цвет списка
    const listDescription = document.querySelector('.list_description').value.trim(); // Описание списка

    // Проверка на обязательное поле list_name
    if (listName === "") {
        alert("Введите название списка!"); // Сообщение об ошибке
        return;
    }

    // Замена пробелов на нижние подчеркивания
    const formattedListName = listName.replace(/\s+/g, '_');

    // Префикс для ключа
    const storageKey = `lists_${formattedListName}`;

    // Проверяем, существует ли уже список с таким именем
    if (localStorage.getItem(storageKey)) {
        alert("Список с таким именем уже существует! Пожалуйста, выберите другое имя.");
        return; // Останавливаем выполнение, если список существует
    }

    // Формируем объект списка
    const listData = {
        list_ico: listIco,
        list_name: listName,
        list_color: listColor,
        list_description: listDescription || "" // Описание может быть пустым
    };

    // Сохраняем объект в localStorage
    localStorage.setItem(storageKey, JSON.stringify(listData));

    // Генерация HTML-кода
    const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${listName}</title>
    <link rel="stylesheet" href="./styles/standard_styles.css" />
    <link rel="stylesheet" href="./styles/preset_list/current_tasks.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900&display=swap"
      rel="stylesheet"
    />
</head>
<body>
    <h1>${listName}</h1>
    <p>${listDescription}</p>
    <img src="${listIco}" alt="Иконка списка" />
</body>
</html>
`;

    // Создаем Blob с HTML контентом
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${formattedListName}.html`; // Название файла - имя списка
    link.click(); // Автоматически "кликаем" по ссылке для загрузки файла

    alert("Список сохранен и HTML-файл был создан!");
});


// Кнопка назад
document.getElementById('back-button').addEventListener('click', function () {
    history.back(); // Возвращает на предыдущую страницу
});
