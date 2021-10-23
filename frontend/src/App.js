import React, { useState } from 'react';
import './App.css';
import './index.css';

function App() {
    const [mutatedStrings, setMutatedStrings] = useState([]);
    const [stringData, setStringData] = useState();
    const [mutationType, setMutationType] = useState();

    const submit = async () => {
        setStringData('');
        setMutationType('');
        let body = { stringData, mutationType };
        const response = await fetch(
            'http://localhost:4000/api/v1/broadcast/broadcaster',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                redirect: 'follow',
                body: JSON.stringify(body),
            }
        );
        const data = await response.json();
        setMutatedStrings((previous) => {
            return [...previous, data.mutatedString];
        });
        console.log(data);
    };

    const DisplayStrings = () => {
        return mutatedStrings.map((str) => (
            <div>
                <p>{str}</p>
            </div>
        ));
    };

    return (
        <div>
            <div>
                <div className="Container">
                    &nbsp;&nbsp;
                    <input 
                        value={stringData}
                        onChange={(e) => setStringData(e.target.value)}
                        type="text"
                        name="string"
                        placeholder="Some Random String"
                    ></input>
                    &nbsp;&nbsp;
                    <input
                        value={mutationType}
                        onChange={(e) => setMutationType(e.target.value)}
                        type="text"
                        name="string"
                        placeholder="rot13, sha256, cipher"
                    ></input>
                    &nbsp;&nbsp;
                    <button type="reset" onClick={submit} type="button">
                        Send String to Chain!
                    </button>
                </div>
            </div>
            <div className="List"><h2>Mutated Strings</h2>{mutatedStrings.length > 0 && <DisplayStrings />}</div>
        </div>
    );
}

export default App;
