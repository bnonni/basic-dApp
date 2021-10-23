import React, { useState } from 'react';
import './App.css';
import './index.css';

function App() {
    const [stringData, setStringData] = useState();
    const [mutationType, setMutationType] = useState();

    const submit = async () => {
        let body = { stringData };
        console.log(body);
        const response = await fetch('http://localhost:4000/string', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            redirect: 'follow',
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <div>
                <div className="Container">
                    <input
                        onChange={(e) => setStringData(e.target.value)}
                        type="text"
                        name="string"
                        placeholder="rot13, sha256, aes-256, "
                    ></input>
                    <input
                        onChange={(e) => setMutationType(e.target.value)}
                        type="text"
                        name="string"
                        placeholder="Some Random String"
                    ></input>
                    <button onClick={submit} type="button">
                        Send String to Chain!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
