let arr = new Array(10,5,7,99,7,5);
console.log(arr);
let arr2 = [5,0,9]

let newArr = [];
newArr = newArr.concat(arr,arr2);
//newArr = [...arr,arr2] //spread operator 
console.log(newArr);

//convert to set 
let st = new Set(arr);
console.log(st);
st.add(98)
console.log(st);
for(let it of st) console.log(it)