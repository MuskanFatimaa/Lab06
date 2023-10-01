// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Initialize todos array with stored data or empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load and display todos from localStorage
function loadTodos() {
    todos.forEach(todo => createTodoElement(todo.text, todo.completed));
}

// Load and display todos when the page loads
loadTodos();

// Add event listener to the form for adding new todos
todoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload on form submission

    const todoText = todoInput.value.trim(); // Remove leading/trailing whitespace
    if (todoText === '') return; // Ignore empty todos

    createTodoElement(todoText); // Create a new todo element
    saveTodos(); // Save todos to localStorage
    todoInput.value = ''; // Clear the input field
});

// Function to create a new todo element
function createTodoElement(text, completed = false) {
    const todoItem = document.createElement('li');
    const todoText = document.createElement('span');
    const deleteButton = document.createElement('button');

    todoText.textContent = text;
    deleteButton.textContent = 'Delete';

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);

    // Add event listener to the delete button for removing todos
    deleteButton.addEventListener('click', function () {
        todoItem.remove();
        todos = todos.filter(todo => todo.text !== text); // Remove from todos array
        saveTodos(); // Save updated todos to localStorage
    });

    // Add event listener to the todo text for marking as completed
    todoText.addEventListener('click', function () {
        todoText.classList.toggle('completed');
        todos = todos.map(todo => {
            if (todo.text === text) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        saveTodos(); // Save updated todos to localStorage
    });

    // Add todo object to the todos array
    todos.push({ text, completed });
    saveTodos(); // Save updated todos to localStorage
}
