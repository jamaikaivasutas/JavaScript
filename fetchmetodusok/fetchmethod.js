// GET 
fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => console.log("GET Response:", json))
  .catch(error => console.error("GET Error:", error));

// POST 
fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  body: JSON.stringify({
    title: "New Todo",
    completed: false,
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log("POST Response:", json))
  .catch(error => console.error("POST Error:", error));

// PUT 
fetch("https://jsonplaceholder.typicode.com/todos/1", {
  method: "PUT",
  body: JSON.stringify({
    id: 1,
    title: "Updated Todo",
    completed: true,
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log("PUT Response:", json))
  .catch(error => console.error("PUT Error:", error));

// PATCH 
fetch("https://jsonplaceholder.typicode.com/todos/1", {
  method: "PATCH",
  body: JSON.stringify({
    title: "Partially Updated Todo"
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log("PATCH Response:", json))
  .catch(error => console.error("PATCH Error:", error));

// DELETE 
fetch("https://jsonplaceholder.typicode.com/todos/1", {
  method: "DELETE",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => {
    if (response.ok) {
      console.log("DELETE Response: Resource deleted successfully");
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .catch(error => console.error("DELETE Error:", error));
