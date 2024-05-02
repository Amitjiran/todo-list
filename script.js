let todo=JSON.parse(localStorage.getItem("todo")) ||[];

const todoInput=document.getElementById("todoInput");
const todoList=document.getElementById("todoList");
const todoCount=document.getElementById("todoCount");
const addButton=document.querySelector("#btn");
const deleteButton=document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded",function(){  // works after dom content is loaded , defer donot need to be used if we wirte connection of script at top header part of html file

    addButton.addEventListener("click",addTask);

    todoInput.addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            event.preventDefault();// prevent default enter behaviour
            addTask();
        }
    });

    deleteButton.addEventListener("click",deleteAllTasks);
    displayTasks();
});

function addTask(){
    //some logic
    const newTask=todoInput.value.trim();
    if(newTask!==""){
        todo.push({text:newTask, disabled:false,});
        saveToLocalStorage(); // we saved to local storage and emptied textinput value in textbox
        todoInput.value="";
        displayTasks();
    }
}


function displayTasks(){

    //some logic
    todoList.innerHTML="";
   todo.forEach((item,index)=>{
    const p= document.createElement("p");
    p.innerHTML=`
    <div class="todo-container"> 
    <input type="checkbox" class="todo-checkbox" 
    id="input-${index}" ${item.disabled ? "checked" :""}>
    
    <p id="todo-${index}" class="${item.disabled ? "disabled" :""}"
    onclick="editTask(${index}"> ${item.text} </p>
    </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
    toggleTask(index)
  );
  todoList.appendChild(p);
});
todoCount.textContent = todo.length;
}





// copied

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
  
    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();
  
    inputElement.addEventListener("blur", function () {
      const updatedText = inputElement.value.trim();
      if (updatedText) {
        todo[index].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    });
  }
  
  function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
  }
  
  function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }



function saveToLocalStorage() {
    localStorage.setItem("todo",JSON.stringify(todo));
}

