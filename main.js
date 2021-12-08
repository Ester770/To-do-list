let taskArray = [];
let addButton = document.querySelector(".add-button");
let taskplace2 = document.querySelector(".task-place2");
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
    <div class = 'task-place'>
          <input class = 'task-input' value = ""></input>
           <button class='delete'></button>
    </div>
   `);
};

//эта функция воводит на экран уже заполненные ячейки
const createTemplate2 = (item) => {
    return (`
    <div class = 'task-place'>
          <input class = 'task-input' value = "${item}"></input>
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
function createArray(){
    let elemArray = document.querySelectorAll('.task-input');
    taskArray = [];
    elemArray.forEach((item) =>{
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
    } else if(flag == "up"){
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

