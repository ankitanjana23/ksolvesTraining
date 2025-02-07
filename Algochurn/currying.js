
const sum = (a) => {
    return function (b){
        return (b !== undefined)? sum(a+b):a;
    }
}
console.log(sum(1)(2)(3)());

// guess the output 

let lol = {
    name: 'Andrew Tate',
    first() {
      console.log(this.name + ' Loves AngularJS');
    },
    second: () => {
      console.log(this.name + ' Loves himself. F Frameworks.');
    },
  };
  
  lol.first();
  lol.second();