import React, { useState } from "react";

export default function Display({ tasks, deletetodo, updatetodo }) {
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {editId === task._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => { updatetodo(task._id, editText); setEditId(null); }}>
                                    Save
                                </button>
                                <button onClick={() => setEditId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {task.task}
                                <button onClick={() => deletetodo(task._id)}>Delete</button>
                                <button onClick={() => { setEditId(task._id); setEditText(task.task); }}>
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
