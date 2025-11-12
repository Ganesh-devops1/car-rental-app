import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useLocation } from 'react-router-dom';

const BookCar = () => {
  const location = useLocation();
  const preselectedCar = location.state?.selectedCar || ''; // From Cars page if clicked "Book Now"

  const [user, setUser] = useState('');
  const [car, setCar] = useState(preselectedCar);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // handle booking submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(`${API_URL}/api/bookings`, {
        user,
        car,
        fromDate,
        toDate
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
      setResponse('❌ Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '40px',
          borderRadius: '15px',
          color: 'white',
          width: '400px',
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}
      >
        <h2 className="text-warning mb-3">🧾 Book Your Car</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Car name"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            required
          />

          <label className="text-light d-block text-start">From Date:</label>
          <input
            type="date"
            className="form-control mb-3"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <label className="text-light d-block text-start">To Date:</label>
          <input
            type="date"
            className="form-control mb-4"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
            disabled={loading}
            style={{
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              padding: '10px'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#f5b800')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ffc107')}
          >
            {loading ? 'Booking...' : '🚘 Book Now'}
          </button>
        </form>

        {/* Response Output */}
        <pre
          className="mt-4 text-warning bg-dark p-3 rounded"
          style={{
            minHeight: '80px',
            textAlign: 'left',
            overflowX: 'auto',
            fontSize: '0.85rem'
          }}
        >
          {response}
        </pre>
      </div>
    </div>
  );
};

export default BookCar;
