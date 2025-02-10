let students = JSON.parse(localStorage.getItem("students")) || [];
let currentPage = 1;
let editingIndex = -1;
const studentsPerPage = 5;

const getElement = (id) => document.getElementById(id);
const saveToLocalStorage = () =>
  localStorage.setItem("students", JSON.stringify(students));

function renderStudents(page = 1) {
  let tbody = getElement("studentTableBody");
  tbody.innerHTML = "";

  let start = (page - 1) * studentsPerPage;
  let paginatedStudents = students.slice(start, start + studentsPerPage);

  paginatedStudents.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.gender}</td>
        <td>${s.math}</td>
        <td>${s.english}</td>
        <td>${s.literature}</td>
        <td>${s.average}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" onclick="updateStudent(${
            start + i
          })">Update</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent(${
            start + i
          })">Clear</button>
        </td>
      </tr>`;
  });

  renderPagination();
}

function renderPagination() {
  let pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  let totalPages = Math.ceil(students.length / studentsPerPage);

  // Nút Previous
  if (currentPage > 1) {
    pagination.innerHTML += `<li class="page-item">
      <a class="page-link" href="#" onclick="changePage(${
        currentPage - 1
      })">Previous</a>
    </li>`;
  }

  // Các trang số
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }">
      <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
    </li>`;
  }

  // Nút Next
  if (currentPage < totalPages) {
    pagination.innerHTML += `<li class="page-item">
      <a class="page-link" href="#" onclick="changePage(${
        currentPage + 1
      })">Next</a>
    </li>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderStudents(page);
}

function getStudentFromForm() {
  return {
    name: getElement("studentName").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    math: parseFloat(getElement("mathScore").value),
    english: parseFloat(getElement("englishScore").value),
    literature: parseFloat(getElement("literatureScore").value),
    average: (
      (parseFloat(getElement("mathScore").value) +
        parseFloat(getElement("englishScore").value)+parseFloat(getElement("literatureScore").value)) /
      3
    ).toFixed(1),
  };
}

/** 📌 Thêm hoặc cập nhật sinh viên */
function saveStudent(event) {
  event.preventDefault();
  let student = getStudentFromForm();

  if (editingIndex >= 0) {
    // Nếu đang cập nhật
    students[editingIndex] = student;
    editingIndex = -1;
  } else {
    // Nếu đang thêm mới
    students.push(student);
  }

  saveToLocalStorage();
  renderStudents(currentPage);
  resetForm();
}

/** 📌 Cập nhật sinh viên */
function updateStudent(index) {
  let student = students[index];
  getElement("studentName").value = student.name;
  getElement("mathScore").value = student.math;
  getElement("englishScore").value = student.english;
  getElement("literatureScore").value = student.literature;
  document.querySelector(
    `input[name="gender"][value="${student.gender}"]`
  ).checked = true;

  editingIndex = index;
}

/** 📌 Xóa sinh viên */
function deleteStudent(index) {
  if (confirm("Bạn có chắc muốn xóa không?")) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderStudents(currentPage);
  }
}

/** 📌 Tìm kiếm sinh viên */
function searchStudent() {
  let query = getElement("searchStudentName").value.toLowerCase();
  students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.name.toLowerCase().includes(query));
  renderStudents(1);
}

/** 📌 Reset form */
function resetForm() {
  document.querySelector("form").reset();
  editingIndex = -1;
}

/** 📌 Khởi tạo sự kiện */
document.addEventListener("DOMContentLoaded", () => renderStudents());
document.querySelector("form").addEventListener("submit", saveStudent);
getElement("searchButton").addEventListener("click", searchStudent);
