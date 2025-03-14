import React, { useState } from 'react';


function Create({createtodo}) {
    const [state, setState] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
       createtodo(state)
       setState("");
    }

    return (
        <div> <h1 >hallo i am create</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                />
                <button type='submit'>ADD</button>
            </form>
        </div>
    );
}

export default Create;
