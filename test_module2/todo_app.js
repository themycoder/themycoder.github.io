let todoList = JSON.parse(localStorage.getItem("todoList")) ?? [];

const $btnAdd = document.getElementById("add-task");
const $btnClearAll = document.getElementById("clear-all");
const $inputTask = document.getElementById("task-input");
const $taskList = document.getElementById("task-list");
const $filters = document.querySelectorAll(".filter-btn");

let filter = "all";

function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function renderTodoList() {
  let content = "";
  let filteredTasks = todoList.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  for (let i = 0; i < filteredTasks.length; i++) {
    content += `
    <li class="task-item ${filteredTasks[i].completed ? "completed" : ""}">
        <input type="checkbox" ${
          filteredTasks[i].completed ? "checked" : ""
        } onclick="toggleTask(${i})">
        <span>${filteredTasks[i].text}</span>
        <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
    </li>
    `;
  }
  $taskList.innerHTML = content;
  saveTasks();
}
renderTodoList();

$btnAdd.onclick = function () {
  const taskText = $inputTask.value.trim();
  if (taskText) {
    todoList.push({ text: taskText, completed: false });
    renderTodoList();
    $inputTask.value = "";
  }
};

function deleteTask(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

function toggleTask(index) {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
}

$filters.forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");
    renderTodoList();
  });
});

$btnClearAll.onclick = function () {
  todoList = [];
  renderTodoList();
};
