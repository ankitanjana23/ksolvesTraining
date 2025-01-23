console.log('callback Code')

function calculate(sq,arr){
     let n = arr.length;
     let result = new Array;
     for(let i = 0;i<n;i++){
         result[i] = sq(arr[i]);
     }
     return result;
}

function squre(x) {
    return x*x;
}

const res = calculate(squre,[1,4,8,10,12]); //find squre and return as array
console.log(res);
