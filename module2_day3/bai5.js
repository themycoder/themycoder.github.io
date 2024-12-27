// Khai báo mảng ban đầu với 2 phần tử
let array = [1, 2];

// Nhập vào số n (n > 2)
let n = parseInt(prompt("Nhập vào số n (n > 2):"));

// Kiểm tra nếu n > 2
if (n > 2) {
  // Thêm phần tử '0' vào đầu mảng cho đến khi độ dài mảng bằng n
  while (array.length < n) {
    array.unshift(0); // unshift() thêm phần tử vào đầu mảng
  }

  // In ra mảng sau khi đã thêm phần tử '0'
  alert("Mảng sau khi thêm phần tử '0': " + array.join(", "));
} else {
  alert("Vui lòng nhập số n lớn hơn 2.");
}
