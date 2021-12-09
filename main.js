let taskArray = [];
let addButton = document.querySelector(".add-button");
let sortButton = document.querySelector(".sortButton");
let createTemplateParent = document.querySelector(".task-wrapper");
let flag = "down";
let cardDoList = document.querySelector('.card-do-list');


// taskArray = Array.from(taskInputText);

//добавляем новую задачу в массив:
function addTask(newTask) {
    taskArray.push(newTask);
    console.log(taskArray);
};

//при нажатии на кнопку добавить:
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    let newTask = "";
    createArray();// забираем все данные из инпутов и создаем из них массив
    displayTasks();//выводим массив на экран
    cardDoList.innerHTML += createTemplate2(newTask);
    addTask(newTask);
});

//эта функция воводит на экран пустые ячейки, создаваемые впервые кнопкой добавить
const createTemplate = () => {
    return (`
    <div class = 'task-place' draggable="true">
          <input class = 'task-input' value = "">
           <button class='delete'></button>
    </div>
   `);
};

//эта функция воводит на экран уже заполненные ячейки
const createTemplate2 = (item) => {
    return (`
    <div class = 'task-place' draggable="true">
          <input class = 'task-input' value = "${item}">
           <button class='delete'></button>
    </div>
   `);
};

//выводим массив на экран:
const displayTasks = () => {
    cardDoList.innerHTML = "";
    if (taskArray.length > 0) {
        taskArray.forEach((item) => {
            cardDoList.innerHTML += createTemplate2(item);
        });
    };
};

//забираем данные из инпутов и создаем из них массив:
function createArray() {
    let elemArray = document.querySelectorAll('.task-input');
    taskArray = [];
    elemArray.forEach((item) => {
        taskArray.push(item.value);
    });
    console.log(taskArray);
}

//сортируем по возрастанию:
function SortTasks() {
    createArray();
    taskArray.sort();
    displayTasks();
    console.log("после сортировки вверх" + taskArray);
    sortButton.style.backgroundImage = "url('images/sortCbaGray.svg')";
    flag = "up";

    //вместо hover при наведении:
    sortButton.addEventListener("mouseover", function () {
        sortButton.style.backgroundImage = "url('images/sortCba.svg')";
    });
    sortButton.addEventListener("mouseout", function () {
        sortButton.style.backgroundImage = "url('images/sortCbaGray.svg')";
    });

};

//сортируем по убыванию:
function SortTasksReverse() {
    createArray();
    taskArray.reverse();
    displayTasks();
    console.log("после сортировки вниз" + taskArray);
    sortButton.style.backgroundImage = "url('images/sortAbcGray.svg')";
    flag = "down";

    //вместо hover при наведении:
    sortButton.addEventListener("mouseover", function () {
        sortButton.style.backgroundImage = "url('images/sortAbc.svg')";
    });
    sortButton.addEventListener("mouseout", function () {
        sortButton.style.backgroundImage = "url('images/sortAbcGray.svg')";
    });
};


//при нажатии кнопки сортировки в зависимости от исходного 
// порядка вызываем или сортировку по возрастанию или по убыванию
sortButton.addEventListener("click", function (event) {
    if (flag == "down") {
        event.preventDefault();
        SortTasks();
    } else if (flag == "up") {
        event.preventDefault();
        SortTasksReverse();
    }
});

// удаляем одно задание
document.addEventListener("click", event => {
    let deleteButton = event.target.closest('.delete');
    if (deleteButton) {
        deleteButton.parentElement.remove();
        let deletedTask = deleteButton.previousElementSibling.value;
        taskArray = taskArray.filter(item => item !== deletedTask);
    }
});



//drag-and-drop
//делаем перемещаемый элемент прозрачным
cardDoList.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
})

cardDoList.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});


//реализуем логику перетаскивания
cardDoList.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();

    const activeElement = cardDoList.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`task-place`);

    if (!isMoveable) {
        return;
    }

    //evt.clientY — вертикальная координата курсора в момент,
    // когда сработало событие
    const nextElement = getNextElement(evt.clientY, currentElement);

    // Проверяем, нужно ли менять элементы местами
    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
        return;
    }

    cardDoList.insertBefore(activeElement, nextElement);
});


//учитываем положение курсора относительно центра
const getNextElement = (cursorPosition, currentElement) => {
    // Получаем объект с размерами и координатами
    const currentElementCoord = currentElement.getBoundingClientRect();
    // Находим вертикальную координату центра текущего элемента
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    // Если курсор выше центра элемента, возвращаем текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};