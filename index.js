// Assign To DOM
const addItemButton = document.querySelector('.addItemButton');
const categoryContainer = document.querySelector('.categoryContainer');
const iconCategory = document.querySelectorAll('.categoryContainer i');
const input = document.querySelector('input');
const todoContainer = document.querySelector('.todoContainer ul');

// EventListener
addItemButton.addEventListener('click', ev => {
    categoryContainer.classList.toggle('add')
})
iconCategory.forEach(icon => {
    icon.addEventListener('click', ev => {
        categoryContainer.classList.toggle('add')
        const iconClass = [`${icon.classList[1]}`,`${icon.classList[2]}`]
        addItem(input.value,iconClass)
        input.value = ''
    })
});
todoContainer.addEventListener('click',optiontodo);
document.addEventListener('DOMContentLoaded',getTodo);

// Function
function addItem(text,icon,isDone,isSave = true) {
    const todoitem = document.createElement('div');
    if(isDone) todoitem.classList.add('completed')
    todoitem.classList.add('todoItem')
    todoitem.innerHTML = `
        <li>${text}</li>
        <i class='fad fa-shield-check'></i>
        <i class='fad fa-file-edit'></i>
        <i class='fad fa-trash'></i>
    `
    const catIcon = document.createElement('i')
    catIcon.classList.add('fad')
    catIcon.classList.add(icon[0])
    catIcon.classList.add(icon[1])
    todoContainer.appendChild(todoitem)
    todoitem.insertBefore(catIcon,todoitem.childNodes[1]);
    const bgcolor = getComputedStyle(catIcon).getPropertyValue('background-color');
    todoitem.style.background = bgcolor
    if(isSave) saveTodo(text,icon)
}
function optiontodo(event){
   const iconTargeted = event.target.classList[1];
   const parentTargeted = event.target.parentNode;
   const todoList = localStorage.getItem('todo') ?
   JSON.parse(localStorage.getItem("todo")) : [];
   if(iconTargeted === 'fa-shield-check'){
       parentTargeted.classList.toggle('completed');
   }
   else if(iconTargeted ===  'fa-trash') {
       todoList.forEach(item => {
           const parent = parentTargeted.innerText;
           const object = item.text;
           if(object == parent) {
               object == parentTargeted;
               const index = todoList.indexOf(item)
               todoList.splice(index,1)
            }
        })
        parentTargeted.remove()
    }
    else if(iconTargeted === 'fa-file-edit'){
        parentTargeted.childNodes[2].toggleAttribute('contenteditable')
        parentTargeted.classList.toggle('editing')
        if(parentTargeted.classList.contains('editing')){
            const todoList = localStorage.getItem('todo') ?
            JSON.parse(localStorage.getItem("todo")) : [];
            parentTargeted.childNodes[6].addEventListener('click',ev=> {
                for(var i = 0 ; i <= todoContainer.childElementCount-1 ; i++) {
                    todoList[i] == todoContainer.children[i]
                    if(parentTargeted == todoContainer.children[i]) {
                        parentTargeted == todoList[i]
                        todoList[i].text = parentTargeted.innerText
                        localStorage.setItem('todo',JSON.stringify(todoList))
                    }
                }
            })
        }
    }    
    todoList.forEach(item => {
        const parent = parentTargeted.innerText;
        const object = item.text;
        if(object == parent) {
            object == parentTargeted;
            if(parentTargeted.classList.contains('completed')) {
                item.isDone = true
            }
            else item.isDone = false
        }
    })
    localStorage.setItem('todo',JSON.stringify(todoList))
}

function saveTodo(text,icon){
    const todoList = localStorage.getItem('todo') ?
    JSON.parse(localStorage.getItem("todo")) : [];
    const todoItemLocal = {
        text,
        icon
    }
    todoList.push(todoItemLocal)   
    localStorage.setItem('todo',JSON.stringify(todoList))
}

function getTodo(){
    const todoList = localStorage.getItem('todo') ?
    JSON.parse(localStorage.getItem("todo")) : [];
    todoList.forEach(todo => {
        addItem(todo.text,todo.icon,todo.isDone,false)
    });
}
