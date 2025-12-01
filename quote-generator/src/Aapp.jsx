import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getData = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name!");
      setData(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1a96b9ab25e2d48c94d6241c1f49249&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod !== 200) {
          setError("City not found! Try again.");
          setData(null);
        } else {
          setData(finalRes);
          setError("");
        }
      })
      .catch(() => {
        setError("Error fetching data. Try again later.");
        setData(null);
      });
  };

  return (
    <div
      style={{
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '50px auto',
        borderRadius: '8px',
        textAlign: 'left'
      }}
    >
      <form onSubmit={getData}>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px',
          }}
        />
        <button
          type="submit"
          style={{
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            background: '#28a745',
            color: '#fff',
            cursor: 'pointer',
            marginLeft: '5px',
          }}
        >
          Get Data
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: '20px' }}>
          <h2>Weather Information</h2>
          <p>
            City: <strong>{data?.name}</strong>
          </p>
          <p>
            Temperature: <strong>{data?.main?.temp}°C</strong>
          </p>
          <p>
            Condition: <strong>{data?.weather?.[0]?.description}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
