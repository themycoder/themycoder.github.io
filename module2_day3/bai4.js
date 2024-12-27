
let numbers = [];

let n = parseInt(prompt("Nhập vào số n (n > 0):"));


if (n > 0) {
  
  for (let i = 0; i < n; i++) {
   
    numbers.push(Math.floor(Math.random() * 100) + 1); 
  }

  alert("Mảng chứa các số ngẫu nhiên: " + numbers.join(", "));
} 
