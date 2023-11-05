import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';


function App() {
  const [businessUrl, setBusinessUrl] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAskReviews = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://us-central1-sails-dev-384021.cloudfunctions.net/ReviewsGPT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yelp_url: businessUrl,
          question: question,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setAnswer(result.answer);
        setModalIsOpen(true);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAnswer('');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="title">ReviewsGPT</div>
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
        <button onClick={handleAskReviews} disabled={loading}>
          {loading ? 'Asking reviews...' : 'Ask reviews!'}
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Answer Modal"
        className="modal-content"
      >
        <div className="modal-content-text">
          <p>Prompt: {question}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>Response:<br/>{answer}</p>
        </div>
        <button onClick={closeModal}>Ask reviews again!</button>
      </Modal>
    </div>
  );
}

export default App;
