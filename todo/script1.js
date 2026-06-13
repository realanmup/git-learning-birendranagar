// let newtodoItem = { checked: false, text: "" } 

let newtodoItemFn = function(inputText) { 

    this.text = inputText
    this.checked = false
}



let newTodos = [];

// newTodos.submit = function(text) {
//     newTodos.push(new newtodoItemFn(text))
// }




function render() {
       const todolistTag = document.querySelector('.todolist')
        todolistTag.innerHTML = ""
       for(let index = 0; index < newTodos.length; index++) {

           const todoListItemTag = document.createElement('div')
    
           const checkBoxTag = document.createElement('input')
           checkBoxTag.type = "checkbox"
           checkBoxTag.dataId = index
           checkBoxTag.checked = newTodos[index].checked
           checkBoxTag.onclick = function(event) {
            //    debugger
                // todo
                newTodos[this.dataId].checked = this.checked
                saveData(newTodos)
           }
           const spanTag = document.createElement('span')
           spanTag.textContent = newTodos[index].text;
    
           todoListItemTag.appendChild(checkBoxTag)
           todoListItemTag.appendChild(spanTag)
    
           todolistTag.appendChild(todoListItemTag)
       }

       
}

function isValid() {

}

function submit() {
    const todo = document.querySelector('input')
    
    newTodos.push(new newtodoItemFn(todo.value))
    // newTodos.submit(todo.value)
    saveData(newTodos)
    render();
}

function saveData(data) {
    localStorage.setItem('newTodos', JSON.stringify(data))
}

function getData() {
    return JSON.parse(localStorage.getItem('newTodos'))
}


newTodos = getData() ?? []
render()
console.log(newTodos)