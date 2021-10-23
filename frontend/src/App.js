import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
    const [mutatedStrings, setMutatedStrings] = useState([]);
    const [stringData, setStringData] = useState();
    const [mutationType, setMutationType] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 5000);
    });

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
        const submitResponse = await response.json();
        if (submitResponse.success) {
            setMutatedStrings((previous) => {
                return [submitResponse.mutatedString, ...previous];
            });
        } else {
            setError(submitResponse.error);
        }
    };

    const DisplayStrings = () => {
        return mutatedStrings.map((str) => (
            <div>
                <p>{str}</p>
            </div>
        ));
    };

    const getStrings = async () => {
        const response = await fetch(
            'http://localhost:4000/api/v1/broadcast/mutations',
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                redirect: 'follow',
            }
        );
        const stringMutations = await response.json();
        const dbMutations = [];
        if (stringMutations.success) {
            stringMutations.mutations.forEach((element) => {
                dbMutations.push(element.mutatedString);
            });
            setMutatedStrings(dbMutations.reverse());
        } else {
            setError(submitResponse.error);
        }
    };

    return (
        <div>
            <div>
                <div className="Error">{error}</div>
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
                    <button onClick={submit} type="button">
                        Send String to Chain!
                    </button>
                </div>
            </div>
            <div className="Button">
                <button onClick={getStrings} type="button">
                    Get Mutated Strings!
                </button>
                <h2>Mutated Strings</h2>
                {mutatedStrings.length > 0 && <DisplayStrings />}
            </div>
            <div className="List"></div>
        </div>
    );
}

export default App;
