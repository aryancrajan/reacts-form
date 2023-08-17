import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [savedId, setSavedId] = useState(null);
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5500/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Error saving form data');
      }

      const data = await response.json();
      setSavedId(data.id);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleViewClick = async () => { 
    if (savedId) {
      try {
        const response = await fetch(`http://localhost:5500/data?id=${savedId}`);
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div>
      <h1>Simple React Form</h1>
      <form onSubmit={handleSubmit}>
         <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        {savedId && <p>Form Data saved with ID: {savedId}</p>}
        <button onClick={handleViewClick} disabled={!savedId}>View Data</button>
        {data.length > 0 && (
      <div>
        <h2>Fetched Data:</h2>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.fetchedData}</li>
          ))}
        </ul>
      </div>
    )}
      </form>
      
    </div>
  );
}

export default App;
