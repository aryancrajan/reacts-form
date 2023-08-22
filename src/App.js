import React, { useState } from 'react';
import Ticket from './ticket';
import Timings from "./timings";

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gender: '',
    destination:''
  });
  const [savedId, setSavedId] = useState(null);
  const [data, setData] = useState({});
  let tick=false;
  const t=<Timings />
  const handleChange = (event) => {
    const { name, value} = event.target;
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
        tick=true;
        console.log(t);
        // const keys = Object.keys(fetchedData);
        // console.log("res", keys);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div>
      <h1>Plane Ticket Booking</h1>
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
        </label> <br />
        <label>
        Gender:
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
        /> Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
        /> Female
      </label>

        <br />
        <label>
            Destination:
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="india">India</option>
              <option value="china">China</option>
              <option value="indonasia">Indonasia</option>
              <option value="japan">Japan</option>
              <option value="germany">Germany</option>
              <option value="australia">Australia</option>
              <option value="brazil">Brazil</option>
              <option value="argentina">Argentina</option>
            </select>
          </label>
          <br /><br /><br />
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
        </form>
        {savedId && <p>Form Data saved with ID: {savedId}</p>}
        <button onClick={handleViewClick} disabled={!savedId}>View Data</button>
        {/* {Object.entries(data).length > 0 && (
          <div>
            <h2>Fetched Data:</h2>
            <ul>
              {Object.entries(data).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        )} */}
        { Object.entries(data).length > 0 && <Ticket destination={data.destination} values={t}/> }
        
    </div>
  );
} 

export default App;
