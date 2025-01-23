let mpp = new Map([
    ['apple' , 3],
    ['mango' , 5],
    ['greps' , 7]
    ])

//set new value 
mpp.set('banana' , 10)
    
let arr = Array.from(mpp);
console.log("Print Array " , arr);
console.log("Print Map" , mpp);

let text = ""; //empty
for(let [key,value] of mpp){
    text += key + " " + value + " , ";
}
console.log(text);

mpp.forEach((value,key)=> console.log(value,key))

//get value 
console.log("apple " , mpp.get('apple'))

//Map method => set- set new key value , get - getting value based on key , entries , keys , values 
// size , delete , clear 
mpp.delete('apple')
console.log(mpp.size)


console.log("new Method")
for(let it of mpp.entries()){
      console.log(it)
}
for(let it of mpp.keys()){
    console.log(it , mpp.get(it))
}
for(let it of mpp.values()){
    console.log(it)
}





// mpp.clear() //clear complete map 