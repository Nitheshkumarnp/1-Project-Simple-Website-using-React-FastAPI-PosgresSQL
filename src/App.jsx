import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [quotes, setQuotes] = useState([]);

    const fetchRandomQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/');
            setQuotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={fetchRandomQuotes}>Get Random Quotes</button>

            {quotes.length > 0 && (
                <ul>
                    {quotes.map((quote) => (
                        <li key={quote.quote}>
                            "{quote.quote}" - {quote.author}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
