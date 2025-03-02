import { users } from "./users.js";
import { posts } from "./posts.js";
document.getElementById("searchUserBtn").addEventListener("click", listUsers);
document.getElementById("viewPostBtn").addEventListener("click", viewPost);
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.innerText = "Hãy nhập đầy đủ thông tin";
    message.style.color = "red";
    return;
  }

  let user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    message.innerText = `Xin chào ${user.first_name} ${user.last_name}`;
    message.style.color = "green";
  } else {
    message.innerText = "Thông tin tài khoản không chính xác";
    message.style.color = "red";
  }
});


document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let first_name = document.getElementById("firstName").value;
  let last_name = document.getElementById("lastName").value;
  let email = document.getElementById("registerEmail").value;
  let password = document.getElementById("registerPassword").value;
  let message = document.getElementById("registerMessage");
  if (!first_name || !password|| !last_name || !email) {
    message.innerText = "Hãy nhập đầy đủ thông tin";
    message.style.color = "red";
    return;
  }else
  if (users.some((u) => u.email === email)) {
    document.getElementById("registerMessage").innerText =
      "Email này đã có tài khoản";
    return;
  }

  let newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  users.push({ id: newId, first_name, last_name, email, password });
  document.getElementById("registerMessage").innerText = "Đăng ký thành công!";
});


function listPosts() {
  document.getElementById("postList").innerHTML = posts.map((p) => `<li>${p.id}: ${p.title} - ${p.created_at}</li>`).join("");
}
listPosts();


function listUsers() {
    let keyword = document.getElementById("searchUser").value.trim().toLowerCase();
    let userList = document.getElementById("userList");
    userList.innerHTML = "";

    let filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(keyword) ||
        user.last_name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );

    if (filteredUsers.length === 0) {
        userList.innerHTML = "<li>Không tìm thấy user nào</li>";
        return;
    }

    filteredUsers.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.id} - ${user.first_name} ${user.last_name} - ${user.email}`;
        userList.appendChild(li);
    });
}

function viewPost() {
    let postId = document.getElementById("postId").value;
    let postDetail = document.getElementById("postDetail");
    let post = posts.find(p => p.id == postId);

    if (!post) {
        postDetail.textContent = "Không tìm thấy bài viết.";
        return;
    }

    let user = users.find(u => u.id == post.user_id);
    let authorName = user ? `${user.first_name} ${user.last_name}` : "Không xác định";

    postDetail.innerHTML = `
        <strong>ID:</strong> ${post.id} <br>
        <strong>Tiêu đề:</strong> ${post.title} <br>
        <strong>Nội dung:</strong> ${post.content} <br>
        <strong>Ảnh:</strong> <img src="${post.image}" alt="Post Image" width="100"> <br>
        <strong>Người tạo:</strong> ${authorName} <br>
        <strong>Ngày tạo:</strong> ${post.created_at} <br>
        <strong>Ngày cập nhật:</strong> ${post.updated_at}
    `;
}
document.getElementById("searchPostBtn").addEventListener("click", function () {
  let email = document.getElementById("searchPostEmail").value.trim();
  let user = users.find((user) => user.email === email);

  let searchPostList = document.getElementById("searchPostList");
  searchPostList.innerHTML = ""; 

  if (!user) {
    searchPostList.innerHTML =
      "<li>Không tìm thấy người dùng với email này.</li>";
    return;
  }

  let userPosts = posts.filter((post) => post.user_id === user.id);

  if (userPosts.length === 0) {
    searchPostList.innerHTML = "<li>Người dùng này chưa có bài viết nào.</li>";
  } else {
    userPosts.forEach((post) => {
      let li = document.createElement("li");
      li.textContent = `ID: ${post.id} - ${post.title} - Ngày tạo: ${post.created_at} - Người đăng: ${user.first_name} ${user.last_name}`;
      searchPostList.appendChild(li);
    });
  }
});


