async function getAllFunction() {
    try {
        const res = await fetch(`http://localhost:3000/classes`, {
        method: 'GET',
           headers:
           {
                "Content-type": "application/json; charset=UTF-8"
           }
        });
           const data = await res.json();
   
           if(!res.ok)
           {
               console.log(data.description);
               return;
           }
   
           return data;
       }
       catch(error)
       {
           console.log(error);
       }
}
async function postFunction(test) {
    try {
        const res = await fetch(`http://localhost:3000/classes`, {
           method: 'POST',
           headers:
           {
                "Content-type": "application/json; charset=UTF-8"
           },
           body: test,
        });
           const data = await res.json();
   
           if(!res.ok)
           {
               console.log(data.description);
               return;
           }
   
           return data;
       }
       catch(error)
       {
           console.log(error);
       }
}

async function putFunction(test, id) {
    try {
        const res = await fetch(`http://localhost:3000/classes/${id}`, {
           method: 'PUT',
           headers:
           {
                "Content-type": "application/json; charset=UTF-8"
           },
           body:test,
        });
           const data = await res.json();
   
           if(!res.ok)
           {
               console.log(data.description);
               return;
           }
   
           return data;
       }
       catch(error)
       {
           console.log(error);
       }
}

async function deleteFunction(id) {
    try {
        const res = await fetch (`http://localhost:3000/classes/${id}`, {
          method: 'DELETE'
        });
           const data =await res.json();
   
           if(!res.ok)
           {
               console.log(data.description);
               return;
           }
   
           return data;
       }
       catch(error)
       {
           console.log(error);
       }
}

let classes = [];
const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
let cellId = "";
let previousCellId = "";
let table = document.getElementById("orarend");
let inputLabel = document.getElementById("inputLabel");
let classNameInput = document.getElementById("classNameInput");
let addButton = document.getElementById("classAddButton");
let deleteButton = document.getElementById("classDeleteButton");
let updateButton = document.getElementById("classUpdateButton");
let message = document.getElementById("message");

window.onload =async function () {
classes = await getAllFunction();
createTable();
}

function createTable()
{
    let tableString = "";
    tableString += "<thead><tr><th>"
    for(let i = 0; i < 13; i++)
    {
        tableString += `<th>${i}. óra</th>`;
    }
    tableString += "</tr></thead><tbody>";


    for(let i = 1; i < 6; i++)
    {
        tableString += "<tr>";
        tableString += `<th> ${days[i-1]}</th>`
        for(let j = 0; j < 13;j++)
        {
            tableString += `<td day='${i}' hour='${j+1}' Id='c${i}-${j+1}'></td>`
        }
        tableString += "</tr>";
    }
        tableString += "</tbody>"
    table.innerHTML = tableString
    addEventListenerToTd()
    fillCells()
}

function addEventListenerToTd()
{
    const cells = document.getElementsByTagName("td")
    for (let i = 0; i <cells.length; i++)
    {
        cells[i].addEventListener("click", (event) => { cellId = event.target.id })
        cells[i].addEventListener("click", addOrUpdateLesson)
    }
}

function fillCells()
{
    let id = "";
    for(let i = 0; i< classes.length; i++) 
        {
        id = `c${classes[i].day}-${classes[i].time}`
        document.getElementById(id).innerHTML = classes[i].name
    };
}

async function addOrUpdateLesson()
{
    if(document.getElementsByClassName("selected").length != 0)
    {
        document.getElementById(previousCellId).className = "";
        addButton.style.display = "none"
        displaySetToNoneForUpdate()
    }

    let selectedCell = document.getElementById(cellId)
    previousCellId = cellId

    selectedCell.className = "selected"

    inputLabel.style.display="block"
    classNameInput.style.display="block"

    if(selectedCell.innerHTML == "")
    {
        addButton.style.display="block"
    }
    else
    {
        classNameInput.value = document.getElementById(cellId).innerText
        deleteButton.style.display="block"
        updateButton.style.display="block"
    }
}

function getLessonId(day, time) {
    for (let i = 0; i <= classes.length; i++)
    {
        if(classes[i].day == day && classes[i].time == time)
        {
            return classes[i].id
        }
    }
}

async function addLesson()
{
    let datas = cellId.replace("c", "").split("-");
    if(classNameInput.value != undefined && classNameInput.value.trim().length > 0)
    {
        let test = {
            "name":`${classNameInput.value.trim()}`,
            "day":parseInt(datas[0]),
            "time":parseInt(datas[1])
        }
        await postFunction(JSON.stringify(test));
        classes = await getAllFunction();
        document.getElementById(cellId).innerHTML = `${classNameInput.value.trim()}`;
        classNameInput.value="";
        document.getElementById(cellId).className = "";
        classNameInput.style.display = "none";
        addButton.style.display = "none";
        inputLabel.style.display = "none";
        message.innerHTML = "";
       
    }
    else
    {
         message.innerHTML = "Adjon meg egy tantárgy nevet!"
    }
}

async function deleteLesson()
{
    let datas = cellId.replace("c", "").split("-");
    let id = getLessonId(datas[0], datas[1])
        await deleteFunction(id);
        classes = await getAllFunction();
        classNameInput.value="";
        document.getElementById(cellId).className = "";
        document.getElementById(cellId).innerHTML = ``;
        displaySetToNoneForUpdate()
}

async function updateLesson()
{
    let datas = cellId.replace("c", "").split("-");
    if(classNameInput.value != undefined && classNameInput.value.trim().length > 0)
    {
        let test = {
            "name":`${classNameInput.value.trim()}`,
            "day":datas[0],
            "time":datas[1]
        }
        let id = getLessonId(datas[0], datas[1])
        await putFunction(JSON.stringify(test), id);
        classes =await getAllFunction();
        document.getElementById(cellId).innerHTML = `${classNameInput.value.trim()}`;
        classNameInput.value="";
        document.getElementById(cellId).className = "";
        displaySetToNoneForUpdate()
       
    }
    else
    {
         message.innerHTML = "Adjon meg egy tantárgy nevet!"
    }
}

function displaySetToNoneForUpdate()
{
    classNameInput.style.display = "none";
    updateButton.style.display = "none";
    deleteButton.style.display = "none";
    inputLabel.style.display = "none";
    message.innerHTML = "";
}

