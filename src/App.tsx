import React, { useEffect, useState } from 'react';
import './App.css';
import { hentInnloggetBruker } from './rest-service';

function App() {
    const [loggetInn, setLoggetInn] = useState();
    useEffect(() => {
        hentInnloggetBruker()
            .then(() => setLoggetInn(true))
            .catch(() => setLoggetInn(false));
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                {loggetInn === false && (
                    <a
                        className="App-link"
                        href="http://localhost:8080/local/cookie?cookiename=aad-idtoken&redirect=http://localhost:3000/"
                        rel="noopener noreferrer"
                    >
                        Logg inn
                    </a>
                )}
                {loggetInn === true && <p>Er logget inn</p>}
            </header>
        </div>
    );
}

export default App;
