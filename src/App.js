import React, { useState } from 'react';
import axios from 'axios';
import ReactJson from '@microlink/react-json-view'
import './App.css';

const App = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [payload, setPayload] = useState('{}');
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState('');

  const handleRequest = async () => {
    try {
      const config = {
        method: method.toLowerCase(),
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: JSON.parse(payload)
      };

      const res = await axios(config);
      setResponse(res.data);
    } catch (error) {
      setResponse(error.response ? error.response.data : { message: 'Error making request' });
    }
  };

  return (
    <div className="App">
      <h1>AWS API Tester</h1>
      <div className="form-group">
        <label>Request Type:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Payload (JSON):</label>
        <textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows="5"></textarea>
      </div>
      <div className="form-group">
        <label>Bearer Token:</label>
        <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
      </div>
      <button onClick={handleRequest}>Send Request</button>
      <div className="response">
        {response && <ReactJson theme="monokai" src={response} />}
      </div>
    </div>
  );
};

export default App;
