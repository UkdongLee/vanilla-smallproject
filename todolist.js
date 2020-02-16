const todoform = document.querySelector(".todoform");
const todoinput = todoform.querySelector("input");
const todolist = document.querySelector(".toDoList");

const KEYVAL = "TODOLIST"
let ArraytoDos = []; 


function deleteToDo (event) {
    const writtenListDelBtn = event.target;
    const writtenList = writtenListDelBtn.parentNode;
    todolist.removeChild(writtenList);
    const cleanToDos = ArraytoDos.filter(function(list) {
        return list.id !== parseInt(writtenList.id);
    });
    ArraytoDos = cleanToDos;
    saveToDos();

}

function saveToDos() {
    localStorage.setItem(KEYVAL, JSON.stringify(ArraytoDos));
}

function showToDo(text) {
    //create element for show
    const writtenList = document.createElement("li");
    const writtenListDelBtn = document.createElement("button");
    const wriitentoDo = document.createElement("span");
    const newId = ArraytoDos.length + 1;

    //insert created elements (li > button, span)
    //button - When user wants delete todolist
    //span - space to placed todolist 
    todolist.appendChild(writtenList);
    writtenList.appendChild(writtenListDelBtn);
    writtenList.appendChild(wriitentoDo);

    writtenListDelBtn.innerText = "👊";
    writtenListDelBtn.addEventListener("click", deleteToDo);
    wriitentoDo.innerText = text;
    writtenList.id = newId;
    
    const toDoObj = {
        text: text,
        id: newId
    };

    ArraytoDos.push(toDoObj);
    saveToDos();
}

function loadToDoList() {
    const loadedToDoList = localStorage.getItem(KEYVAL);
    if(loadedToDoList !== null) {
        const savedList = JSON.parse(loadedToDoList);
        savedList.forEach(function(list) {
            showToDo(list.text);
        });
    }
}

function handleSubmit (event) {
    event.preventDefault();
    const currentValue = todoinput.value;
    showToDo(currentValue);
    todoinput.value = "";
    
}

function init() {
    loadToDoList();
    todoform.addEventListener("submit", handleSubmit);
}

init ();