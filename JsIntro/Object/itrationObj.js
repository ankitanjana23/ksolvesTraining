const Person = {
      name: "Ankit" ,
      age: "23",
      address: "ujjain",
      speak: function func(){
           console.log(`${this.name} is speaking english Language`)
      }
}
//Updation modification 
Person.age = 25;
// console.log(Person);



//itration 
//for in loop containe key
let text = "" ;
for(let key in Person){
    // console.log(typeof key); //type string 
    // console.log(typeof Person[key])
    if(typeof Person[key] === "function" )continue;
    text += Person[key] + " ";
}
console.log(text);