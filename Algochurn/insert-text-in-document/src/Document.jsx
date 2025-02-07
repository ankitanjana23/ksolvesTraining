import {React,useState} from 'react'

function Document() {

    const [text,setText] = useState("")

    const handleSubmit = (e) =>{
         e.preventDefault()
         const list = document.getElementById('div');
         const p = document.createElement('p');
         p.innerText = text;
         p.style.color = 'blue'
         // remove blue highlighted after 2s 
         setTimeout(()=>{
           p.style.color = 'black'
         },2000)
         list.appendChild(p); //p display
         setText(()=> " ") //text empty 
    }

  return (
    <div>
      <div id= "div"></div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='write text...' value = {text} id = 'value' onChange = {(e) => setText(e.target.value) }
         required />
        <button type = "submit" >Add Text</button>
      </form>
    </div>
  )
}

export default Document
