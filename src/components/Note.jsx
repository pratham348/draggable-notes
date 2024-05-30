/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef } from "react"

const Note = forwardRef(({ content, initialPos, ...props }, ref) => {
 return (
  <div
   ref={ref}
   style={{
    position: "absolute",
    left: `${initialPos?.x}px`,
    top: `${initialPos?.y}px`,
    border: "2px solid #C6F222",
    userSelect: "none",
    padding: "10px",
    width: "200px",
    cursor: "move",
    backgroundColor: "#E4FFC8"
   }}
   {...props}
  >
   {content}
  </div>
 )
})

export default Note
