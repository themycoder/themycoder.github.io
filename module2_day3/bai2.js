let intger = [-2, 0, 30,23];
console.log('số chỉ số 0', intger[0]);
console.log("số chỉ số 0", intger[3]);
console.log("công số thứ 1 và 2 trong chuỗi", intger[1]+intger[2]);
let temp = intger[1];
intger[1]=intger[3];
intger[3]=temp;
console.log('mảng mới ',intger)

