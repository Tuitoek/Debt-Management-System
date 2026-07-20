import React from 'react'

function Infinity() {
  return (
     <div className="relative w-64 h-40 flex items-center justify-center">
      <span className="absolute w-28 h-16 border-4 border-blue-500 rounded-xl rotate-45"></span>
      <span className="absolute w-28 h-16 border-4 border-green-500 rounded-xl -rotate-45"></span>
    </div>
  )
}

export default Infinity