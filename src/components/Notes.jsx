/* eslint-disable react/prop-types */

import { createRef, useEffect, useRef } from "react"
import Note from "./Note"

const Notes = ({ notes = [], setNotes = () => {} }) => {
 /* The `useEffect` hook in the provided code snippet is responsible for updating the notes based on the
saved notes in the local storage. Here's a breakdown of what it does: */
 useEffect(() => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || []

  const updatedNotes = notes.map((note) => {
   const savedNote = savedNotes.find((n) => n.id === note.id)
   if (savedNote) {
    return { ...note, position: savedNote.position }
   } else {
    const position = determineNewPosition()
    return { ...note, position }
   }
  })

  setNotes(updatedNotes)
  localStorage.setItem("notes", JSON.stringify(updatedNotes))
 }, [notes.length])

 const noteRefs = useRef([])

 /**
  * The function `determineNewPosition` calculates a random x and y position within the window
  * boundaries for an element to be placed.
  * @returns An object with randomly generated x and y coordinates within the specified ranges.
  */
 const determineNewPosition = () => {
  const maxX = window.innerWidth - 250
  const maxY = window.innerHeight - 250

  return {
   x: Math.floor(Math.random() * maxX),
   y: Math.floor(Math.random() * maxY)
  }
 }

 /**
  * The handleDragStart function in JavaScript React allows for dragging and moving a note element
  * within a container while checking for overlap with other elements.
  */
 const handleDragStart = (note, e) => {
  const { id } = note
  const noteRef = noteRefs.current[id].current
  const rect = noteRef.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  const offsetY = e.clientY - rect.top

  const startPos = note.position

  /**
   * The handleMouseMove function updates the position of an element based on the mouse cursor movement.
   */
  const handleMouseMove = (e) => {
   const newX = e.clientX - offsetX
   const newY = e.clientY - offsetY

   noteRef.style.left = `${newX}px`
   noteRef.style.top = `${newY}px`
  }

  /**
   * The function `handleMouseUp` in a JavaScript React component handles the mouse up event by checking
   * for overlap and updating the note position accordingly.
   */
  const handleMouseUp = () => {
   document.removeEventListener("mousemove", handleMouseMove)
   document.removeEventListener("mouseup", handleMouseUp)

   const finalRect = noteRef.getBoundingClientRect()
   const newPosition = { x: finalRect.left, y: finalRect.top }

   if (checkForOverlap(id)) {
    // check for overlap
    noteRef.style.left = `${startPos.x}px`
    noteRef.style.top = `${startPos.y}px`
   } else {
    updateNotePosition(id, newPosition)
   }
  }

  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
 }

 /**
  * The function `checkForOverlap` determines if a given note overlaps with any other notes on the
  * screen based on their positions.
  * @returns The `checkForOverlap` function is returning a boolean value indicating whether there is an
  * overlap between the current note (specified by the `id` parameter) and any other notes in the
  * `notes` array. If there is an overlap, the function returns `true`, otherwise it returns `false`.
  */
 const checkForOverlap = (id) => {
  const currentNoteRef = noteRefs.current[id].current
  const currentRect = currentNoteRef.getBoundingClientRect()

  return notes.some((note) => {
   if (note.id === id) return false

   const otherNoteRef = noteRefs.current[note.id].current
   const otherRect = otherNoteRef.getBoundingClientRect()

   const overlap = !(
    currentRect.right < otherRect.left ||
    currentRect.left > otherRect.right ||
    currentRect.bottom < otherRect.top ||
    currentRect.top > otherRect.bottom
   )

   return overlap
  })
 }

 /**
  * The function `updateNotePosition` updates the position of a note with a specific id in a list of
  * notes and saves the updated notes to local storage.
  */
 const updateNotePosition = (id, newPosition) => {
  const updatedNotes = notes.map((note) =>
   note.id === id ? { ...note, position: newPosition } : note
  )
  setNotes(updatedNotes)
  localStorage.setItem("notes", JSON.stringify(updatedNotes))
 }

 return (
  <div>
   {notes.map((note) => {
    return (
     <Note
      key={note.id}
      ref={
       noteRefs.current[note.id]
        ? noteRefs.current[note.id]
        : (noteRefs.current[note.id] = createRef())
      }
      initialPos={note.position}
      content={note.text}
      onMouseDown={(e) => handleDragStart(note, e)}
     />
    )
   })}
  </div>
 )
}

export default Notes
