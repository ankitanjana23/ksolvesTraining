import { useState , useEffect, act} from "react"
import React from 'react'

function App() {
  
  const colors = ['red' , 'yellow' , 'green'];
  const [active , setActive] = useState(0); //currently active 

  //zero second than increment 

  useEffect(()=>{
     const interval = setTimeout(()=>{
       setActive(prevActive =>((prevActive+1)%colors.length));
     },2000)
     return ()=> clearTimeout(interval);
  },[active])

  return (
    <div className="traffic-light-container">
      {
        colors.map((color,idx) => (
         <p key={idx} 
         className={`light ${color} ${idx === active ? "active" : ""}`}></p>
        ))
      }
    </div>
  )
}

export default App
