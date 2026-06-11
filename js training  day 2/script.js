// this is comment
// stores data on browser
// localStorage.getItem
// variables
let todos = [];

let inputTodo = document.getElementById('todo');

let todoListUL = document.querySelector('ul');


function trimedInput() {
    return inputTodo.value.trim()
}


function isValid() {
    
    if(trimedInput() == "") {
        inputTodo.classList.add("errorInput")
        return false;
    } else { 
        inputTodo.classList.remove("errorInput")
        return true;
    }
}


function submit() {
    // form validation
    if (!isValid()) {
        return;
    }
    
    todos.push(trimedInput())
    updateDataOnStorage()
    

    inputTodo.value = ""
    render();
}


function render() {
    // array starts with 0

    // cleanup list 
    todoListUL.innerHTML = '';

    //loop through data and prints
    for(let index=0; index < todos.length; index++) {
        todoListUL.appendChild(renderItem(todos[index], index));
    }
}


function renderItem(data, index) {
    const liTag = document.createElement('li');
    const textSpan = document.createElement('span');
    
    textSpan.textContent = data;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";

    deleteBtn.onclick = function(index) {
        todos.splice(index, 1)
        // alert('ok');
        updateDataOnStorage()
        render();
    }

    liTag.appendChild(textSpan)
    liTag.appendChild(deleteBtn)

    textSpan.addEventListener("dblclick", function(item) {
        let updatedValue = prompt(`Edit ? + ${item.target.textContent}`)
        debugger
        
        if (updatedValue == null || updatedValue == '' || updatedValue == item.target.textContent)
            return;

        todos[index] = updatedValue;
        updateDataOnStorage()
        render()
    })
    return liTag
}


document.addEventListener("DOMContentLoaded", init())

function init() {
    updateDay();
    showClock();
    loadData();
}

function updateDay() {
    const startDate = new Date('2026-06-06')
    const today = new Date() 
    const diffinMS = Math.abs(today - startDate)
    const diffInDays = Math.floor(diffinMS / (1000*60*60*24))
    const dayCountSpan = document.getElementById('dayCount')
    dayCountSpan.textContent = diffInDays
}

const colorPallate = ["purple", "aqua", "#1F51FF", "red", "skyblue"];

function showClock() {
    const h2Tag = document.querySelector("h2")

    
    setInterval(function() {
        h2Tag.textContent = new Date().toLocaleTimeString();
        const randomValue = Math.floor(Math.random()*10);
        

        h2Tag.style.color = colorPallate[colorPallate.length%randomValue]
    }, 1000)
}


function loadData() {
    let data = localStorage.getItem('todos')
    todos = JSON.parse(data)
    render()
}

function updateDataOnStorage() {
    // save on db (capacity: 10MB)
    localStorage.setItem('todos', JSON.stringify(todos))
}