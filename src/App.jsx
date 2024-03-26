import React, { useState, useEffect } from 'react';

function App() {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://working-fastapi.onrender.com/details');
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetails = async () => {
    setIsLoading(false);
    setError(null);
    setDetails([]);
  };

  // commented because of initial load of page itself the quotes are coming
  // useEffect(() => {
  //   fetchDetails();
  // }, []);

  return (
    <div>
      <h1>Details fetching from posgres SQL</h1>
      <button onClick={fetchDetails} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Data'}
      </button>
      <button onClick={resetDetails} disabled={details.length == 0}>
        Reset
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {details.length > 0 ?
        <div>
          {details.map((data, index1) => (
            <div>
              {data.map((da, index2) => {
                let first;
                if(index1 == 0) {
                  first = 'A'
                } else {
                  first = 'B'
                }
                let second;
                if(index2 == 0) {
                  second = 'id'
                } else if (index2 == 1) { 
                  second = 'name'
                } else if (index2 == 2) { 
                  second = 'email id'
                } else {
                  second = 'password'
                }
                return <p>{first} - {second} - {da}</p>
              })}
            </div>
          ))}
        </div> : null}
    </div>
  );
}

export default App;
