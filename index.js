const strObj = localStorage.getItem("toDoList");
let toDoList = strObj ? strToArr(strObj) : [];

/* <div class="todoList">
    <div>
        <input type="checkbox" name="done" id="done">
        <p>Javascript DOM to learn</p>
    </div>
    <ion-icon name="pencil-outline"></ion-icon>
    <ion-icon class="trashIcon" name="trash"></ion-icon>
</div> */

const todoListContainer = document.getElementById("todoListContainer");
const inputNode = document.getElementById("formControl");

function renderToDoList(listContainer,list){
    cleanToDoList();
    for(let i = 0; i < list.length; i++){
        const toDo = list[i];
        const toDoItem = generateToDoItem(toDo,i);
        listContainer.appendChild(toDoItem);
    }
}

function cleanToDoList(){
    let todoListContainer = document.getElementById("todoListContainer");
    while(todoListContainer.firstChild){
        todoListContainer.removeChild(todoListContainer.firstChild);
    }
}

function generateToDoItem(item,index){
    const toDoItem = document.createElement("div");
    toDoItem.className = "todoList";
    const divElement = document.createElement("div");
    divElement.className = "checkAndNoteContainer";
    divElement.style.cursor = "pointer";
    divElement.addEventListener("click", function(){
        let item = toDoList[index];
        item.check = !item.check;
        renderToDoList(todoListContainer,toDoList);
    });
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkBox";
    checkbox.style.cursor = "pointer";
    checkbox.checked = item.check;
    const pElement = document.createElement("p");
    pElement.innerText = item.note;
    const editElement = document.createElement("ion-icon");
    editElement.name = "pencil-outline";
    editElement.style.cursor = "pointer";
    editElement.style.fontSize = "1.2rem";
    editElement.style.marginRight = "3px";
    editElement.addEventListener("click", function(event){
        inputNode.focus();
        inputNode.value = item.note;
        inputNode.className = "edit" + index;
    });
    const trashElement = document.createElement("ion-icon");
    trashElement.name = "trash";
    trashElement.className = "trashIcon";
    trashElement.id = "trash" + index;
    divElement.append(checkbox,pElement);
    toDoItem.append(divElement,editElement,trashElement);
    console.log(toDoItem);
    return toDoItem;
}

function createToDo(event){
    if(event.keyCode === 13){
        const {value} = event.target;
        if(value === ""){
            return ;
        }
        if(event.target.className.includes("edit")){
            const index = event.target.className.slice(4);
            toDoList = toDoList.map((item,i) => {
                if(+index === +i){
                    return {note: value, check: item.check};
                }
                return item;
            });
            event.target.className = "";
            renderToDoList(todoListContainer,toDoList);
        }else{
            const toDoItem = {
                note: value,
                check: false,
            };
            toDoList.push(toDoItem);
            const index = toDoList.map(toDoItem => toDoItem.note).indexOf(value);
            todoListContainer.appendChild(generateToDoItem(toDoItem,index));
        }
        event.target.value = "";
    }
}

function clickDelete(index){
    toDoList.splice(index,1);
    renderToDoList(todoListContainer,toDoList);
}

document.addEventListener("click", function(event){
    if(event.target.id.includes("trash")){
        const index = event.target.id.slice(5);
        clickDelete(index);
    }
});

renderToDoList(todoListContainer,toDoList);

function saveStorage(event){
    const strToDoList = ObjArrToStr(toDoList);
    localStorage.setItem("toDoList", strToDoList)
}

function arrToObj(arr){
    let result = {};
    for(let i = 0; i < arr.length; i++){
        const item = arr[i];
        result[i] = item;
    }
    return result;
}

function ObjArrToStr(arr){
    let result = arrToObj(arr);
    return JSON.stringify(result);
}

function strToArr(str){
    const result = JSON.parse(str);
    return Object.values(result);
}

function clearTodo(){
    localStorage.clear();
    window.location.reload();
}