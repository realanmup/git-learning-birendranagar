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
    textSpan.ondblclick = function(event) {
        let updatedValue = prompt(`Edit ? + ${event.target.textContent}`)
        // debugger
        
        if (updatedValue == null || updatedValue == '' || updatedValue == event.target.textContent)
            return;

        todos[index] = updatedValue;
        updateDataOnStorage()
        render()
    }
    return liTag
}


document.addEventListener("DOMContentLoaded", loadData())


function loadData() {
    let data = localStorage.getItem('todos')
    todos = JSON.parse(data)
    render()
}

function updateDataOnStorage() {
    // save on db (capacity: 10MB)
    localStorage.setItem('todos', JSON.stringify(todos))
}