import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      background: 'rgba(0,0,0,0.6)',
      padding: '50px',
      borderRadius: '20px',
      textAlign: 'center'
    }}>
      <h1 className="fw-bold text-warning mb-3">🚘 Welcome to Car Rental</h1>
      <p className="fs-5 mb-4">Find and book your dream car anytime, anywhere.</p>
      <Link to="/cars" className="btn btn-warning btn-lg">Explore Cars</Link>
    </div>
  </div>
);

export default Home;
