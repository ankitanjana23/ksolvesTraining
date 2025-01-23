
let head1 = document.getElementsByTagName('h1')
let head2 = document.querySelector('.head2')

let p1 = document.getElementsByClassName('text')
let p2 = document.querySelectorAll('p')

console.log(head1 , "Select using tag name");
console.log(head2 , "select using query Selector");
console.log(p1 , "Select using class name");
console.log(p2 , "select using query Selector All");

//DOM manulation 
head2.innerHTML = 'change second line';
// head2.textContent = 'change third time' ;

//DOM style manipulation '
head2.style.color = 'red'
head2.style.backgroundColor = "blue"


//create new node and add inside div tag
let div = document.querySelector('div')
div.style.textAlign = 'center';

let node = document.createElement('div');
let text = document.createTextNode('simple div node for result')
node.append(text);
div.append(node);