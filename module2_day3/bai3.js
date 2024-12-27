let a=[1,4,5,6];
 console.log('các số chẵn trong mãng')
for(i=0;i<a.length;i++){
   if(a[i]%2===0){
    console.log(a[i])
   }
}
let sum = 0;
for (i = 0; i < a.length; i++) {
  sum+= a[i];
}
console.log(sum);
let min=a[0];
for(i=0;i< a.length;i++){
    if(a[i]<min){
        min=a[i]
    }
}
console.log('phần từ nhỏ nhất là',min)