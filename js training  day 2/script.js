// this is comment

localStorage
// variables
let todos = [];

let inputTodo = document.getElementById('todo');

let todoListUL = document.querySelector('ul');


function submit() {
    let inputValue = inputTodo.value
    todos.push(inputValue)
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
        alert('ok');
        render();
    }

    liTag.appendChild(textSpan)
    liTag.appendChild(deleteBtn)

    textSpan.addEventListener("dblclick", function(item) {
        let updatedValue = prompt(`Edit ? + ${item.target.textContent}`)
        debugger
        
        if (!(updatedValue == null || updatedValue == '' || updatedValue == item.target.textContent)) {
            todos[index] = updatedValue;
        }
        render()
    })
    return liTag
}