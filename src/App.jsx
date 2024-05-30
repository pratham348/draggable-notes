import { useState } from "react"
import "./App.css"
import Notes from "./components/Notes"

function App() {
 const [note, setNote] = useState("")
 const [notes, setNotes] = useState([
  {
   id: 1,
   text: "Hello user"
  },
  {
   id: 2,
   text: "This is test note"
  }
 ])

 const handelAddNote = () => {
  setNotes([...notes, { id: notes.length + 1, text: note }])
  setNote("")
 }

 return (
  <div>
   <div
    style={{
     display: "flex",
     justifyContent: "center",
     gap: "5px",
     marginTop: "30px"
    }}
   >
    <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
    <button onClick={handelAddNote}>Add Note</button>
   </div>
   <Notes notes={notes} setNotes={setNotes} />
  </div>
 )
}

export default App
