import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [state, setState] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:5000/", { task:state })
            .then((result) => {
                console.log("data sent", result);
            })
            .catch((err) => {
                console.log("error", err);
            });
        setState("");
    }

    return (
        <div>
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
