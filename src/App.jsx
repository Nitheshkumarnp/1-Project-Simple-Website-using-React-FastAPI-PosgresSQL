import React, { useState, useEffect } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuotes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/quotes');
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div>
      <h1>Random Quotes</h1>
      <button onClick={fetchQuotes} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Quotes'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
