import React, { useState } from 'react'

function Document1() {
const [text,setText] = useState("");
const [items,setItems] = useState([]);
const [highlightItem, setHighlightItem] = useState(null);

const handleEnter = () => {
      setItems(prevItem => [...prevItem,text])
      setHighlightItem(items.length-1);  //currect index pass
      setText("") //set empty 
}

  return (
    <>
      <textarea placeholder='write text' value={text} required onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleEnter}>Enter</button>
      {
        items.map((item,idx) => (
            <div key = {idx}>{item}</div>
        ))
      }
    </>
  )
}

export default Document1
