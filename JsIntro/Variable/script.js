
// var - older version used before ES6 

var age = 23;
var age = 'ankit' ; //redeclaration is valid for var 

function func() {
    if(true){
        var x = 23;
    }
    console.log(x);  //access and print 23
}

func();

//let gives error it valid inside the scope or block 
//const if you decalare 

const value = 23; //this variable container is fixed don't change 

const arr = [2,4,6,10]; //still change element 

//access last character 
// console.log("last element: " , arr.pop())
console.log("last Element : " , arr[arr.length-1])

//convert set map object string into array
const newArr = Array.from(arr);