import React from 'react'


export default function Display({tasks,deletetodo}) {
   
  return (
    <div><div>List</div><ul>{tasks.map((val) => (
        <li key={val._id}>
          {val.task}{" "}
          <button onClick={() => deletetodo(val._id)}>Delete</button>
        </li>
      ))}</ul></div>
  )
}
