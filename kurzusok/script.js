let working = document.getElementById("workingField");
let chooseButtons = document.getElementsByName("studentCourseChoose");
let chosenType = 0;

chooseButtons.forEach(element => {
    element.addEventListener("change", () => {
        for (let i = 0; i < chooseButtons.length; i++) {
            if (chooseButtons[i].checked) {
                chosenType = i;
                working.innerHTML == "";
                working.style.display = "none";
            }
        }
    })
});


async function getFunction(id, type) {
    try {
        const res = await fetch(`https://vvri.pythonanywhere.com/api/${type}/${id}`);
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

async function getAllFunction(type) {
    try {
        const res = await fetch(`https://vvri.pythonanywhere.com/api/${type}`);
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

async function postFunction(test, type) {
    try {
        const res = await fetch(`https://vvri.pythonanywhere.com/api/${type}`, {
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

async function putFunction(test, id, type) {
    try {
        const res = await fetch(`https://vvri.pythonanywhere.com/api/${type}/${id}`, {
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

async function patchFunction(test, id, type) {
    try {
        const res = await fetch(`https://vvri.pythonanywhere.com/api/${type}/${id}`, {
           method: 'PATCH',
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

async function deleteFunction(id, type) {
    try {
        const res = await fetch (`https://vvri.pythonanywhere.com/api/${type}/${id}`, {
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

async function addNewSomething() {
    if (chosenType == 0) {
        await addStudent();
    }
    else {
        await addCourse();
    }
}

async function modifySomething() {
    if (chosenType == 0) {
        await modifyStudent();
    }
    else {
        await modifyCourse();
    }
}
async function deleteSomething() {
    if (chosenType == 0) {
        await deleteStudent();
    }
    else {
        await deleteCourse();
    }
}

async function addStudent() {
    let courses = await getAllFunction("courses");

    working.style.display = "flex";
    working.innerHTML = "<label for='studentInput'>Új tanuló neve: </label><input type='text' id='studentInput'> ";
    working.innerHTML += "<label for='selectedCourse'>Tanuló tantárgya:</label> <select id='selectedCourse'> name='selectedCourse' </select>";

    select = document.getElementById("selectedCourse");

    writeSelectMenu(select, courses);

    working.innerHTML += "<button onclick='saveStudent()'>Új tanuló mentése</button>";
}

async function saveStudent() {
    let newName = document.getElementById("studentInput").value.trim();
    let selectedCourse = document.getElementById("selectedCourse").value;
    if (newName == "") {
        alert("Adjon meg nevet!");
        return;
    }
    let newStudent = { name: newName, course_id: selectedCourse };
    let response = await postFunction(JSON.stringify(newStudent), "students");

    if (response != undefined) {
        alert("A tanuló sikeresen hozzáadásra került.");
    }
    else {
        alert("A tanuló már létezett, vagy valami hiba történt");
    }
    working.style.display = "none";
}

async function addCourse() {
    working.style.display = "flex";
    working.innerHTML = "<label for='courseInput'>Új kurzus neve: </label><input type='text' id='courseInput'> ";

    working.innerHTML += "<button onclick='saveCourse()'>Új kurzus mentése</button>";

}

async function saveCourse() {
    let newName = document.getElementById("courseInput").value.trim();

    if (newName == "") {
        alert("Adjon meg nevet!");
        return;
    }
    let newCourse = { name: newName };
    let response = await postFunction(JSON.stringify(newCourse), "courses");

    if (response != undefined) {
        alert("A kurzus sikeresen hozzáadásra került.");
    }
    else {
        alert("A kurzus már létezett, vagy valami hiba történt");
    }
    working.style.display = "none";
}

async function modifyStudent() {
    let students = await getAllFunction("students");

    working.style.display = "flex";
    working.innerHTML = "<label for='selectedStudent'>Tanulók:</label> <select id='selectedStudent'> name='selectedStudent' </select>";
    working.innerHTML += "<label for='studentInput'>tanuló új neve: </label><input type='text' id='studentInput'> ";

    select = document.getElementById("selectedStudent");
    writeSelectMenu(select, students);

    working.innerHTML += "<label for='selectDifferentCourse'>kurzusok:</label> <select id='selectDifferentCourse'> name='selectDifferentCourse' </select>";

    let courseSelect = document.getElementById("selectDifferentCourse");
    let courses = await getAllFunction("courses");
    courses.unshift({ id: -1, name: "Nincs kiválasztva kurzus" });
    writeSelectMenu(courseSelect, courses);

    working.innerHTML += "<button onclick='saveModifiedStudent()'>tanuló módosításának mentése</button>";
}
async function saveModifiedStudent() {
    let newName = document.getElementById("studentInput").value.trim();
    let selectedStudentId = document.getElementById("selectedStudent").value;
    let newCourseId = document.getElementById("selectDifferentCourse").value;
    let selectedStudent = await getFunction(selectedStudentId, "students");
    if (newName == "") {
        newName = selectedStudent.name;
    }

    if (newCourseId == -1) {
        newCourseId = await getCourseIdfroStudent(selectedStudent);
    }

    let modifiedStudent = { name: newName, course_id: newCourseId };
    let response = await putFunction(JSON.stringify(modifiedStudent), selectedStudentId, "students");

    if (response != undefined) {
        alert("A tanuló sikeresen módosítva került.");
    }
    else {
        alert("A tanuló nem került módosításra, vagy valami hiba történt");
    }
    working.style.display = "none";
}

async function getCourseIdfroStudent(studentSearched) {
    let courseId;
    let courses = await getAllFunction("courses");
    courses.forEach(course => {
        course.students.forEach(student => {
            if (student.name == studentSearched.name) {
                courseId = course.id;

            }
        }
        )
    })
    return courseId;
}

async function modifyCourse() {
    let courses = await getAllFunction("courses");

    working.style.display = "flex";
    working.innerHTML = "<label for='selectedCourse'>Kurzusok:</label> <select id='selectedCourse'> name='selectedCourse' </select>";
    working.innerHTML += "<label for='courseInput'>kurzus új neve: </label><input type='text' id='courseInput'> ";

    select = document.getElementById("selectedCourse");
    writeSelectMenu(select, courses);

    working.innerHTML += "<button onclick='saveModifiedCourse()'>kurzus módosításának mentése</button>";

}

async function saveModifiedCourse() {
    let newName = document.getElementById("courseInput").value.trim();
    let selectedCourseId = document.getElementById("selectedCourse").value;

    if (newName == "") {
        return;
    }

    let modifiedCourse = { name: newName };
    let response = await patchFunction(JSON.stringify(modifiedCourse), selectedCourseId, "courses");

    if (response!= undefined) {
        alert("A kurzus sikeresen módosításra került.");
    }
    else {
        alert("A tanuló nem került módosításra, vagy valami hiba történt");
    }

    working.style.display = "none";
}

function writeSelectMenu(parent, list) {
    list.forEach(element => {
        parent.innerHTML += `<option value='${element.id}'> ${element.name} </option>`;
    });
}


async function deleteStudent() {
    let students = await getAllFunction("students");

    working.style.display = "flex";
    working.innerHTML = "<label for='selectedStudent'>Tanulók:</label> <select id='selectedStudent'> name='selectedStudent' </select>";

    select = document.getElementById("selectedStudent");

    writeSelectMenu(select, students);

    working.innerHTML += "<button onclick='saveDeletedStudent()'>tanuló törlése</button>";
}

async function saveDeletedStudent() {
    let selectedStudent = document.getElementById("selectedStudent").value;

    let response = await deleteFunction(selectedStudent, "students");

    if (response == undefined) {
        alert("A tanuló sikeresen törlésre került.");
    }
    else {
        alert("A tanuló nem került törlésre, vagy valami hiba történt");
    }
    working.style.display = "none";
}

async function deleteCourse() {
    let courses = await getAllFunction("courses");

    working.style.display = "flex";
    working.innerHTML = "<label for='selectedCourse'>Kurzusok:</label> <select id='selectedCourse'> name='selectedCourse' </select>";

    select = document.getElementById("selectedCourse");

    writeSelectMenu(select, courses);

    working.innerHTML += "<button onclick='saveDeletedCourse()'>kurzus törlése</button>";
}

async function saveDeletedCourse() {
    let selectedCourse = document.getElementById("selectedCourse").value;

    let response = await deleteFunction(selectedCourse, "courses");

    if (response == undefined) {
        alert("A kurzus sikeresen törlésre került.");
    }
    else {
        alert("A kurzus nem került törlésre, vagy valami hiba történt");
    }
    working.style.display = "none";
}