import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resMsg, setResMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/users/register`, { name, email });
      setResMsg(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResMsg("❌ Error: " + err.message);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1502877338535-766e1452684a')",
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        padding: '40px',
        borderRadius: '15px',
        color: 'white',
        width: '400px'
      }}>
        <h2 className="text-center text-warning mb-3">👤 Register</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <button className="btn btn-warning w-100">Register</button>
        </form>
        <pre className="mt-3 text-warning bg-dark p-2" style={{ borderRadius: '10px' }}>{resMsg}</pre>
      </div>
    </div>
  );
};

export default Register;
