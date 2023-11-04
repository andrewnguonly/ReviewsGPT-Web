import React, { useState } from 'react';
import './App.css';

function App() {
  const [businessUrl, setBusinessUrl] = useState('');
  const [question, setQuestion] = useState('');

  const handleAskReviews = async () => {
    console.log("asking reviews...")
  };

  return (
    <div className="App">
      <div className="container">
        <input
          type="text"
          placeholder="Copy and paste a Yelp business page URL here..."
          value={businessUrl}
          onChange={(e) => setBusinessUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ask any question about the reviews"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAskReviews}>Ask reviews!</button>
      </div>
    </div>
  );
}

export default App;
