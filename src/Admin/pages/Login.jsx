import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (error) {
      alert("Giriş başarısız: " + error.message);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#a855f7', marginBottom: '20px' }}>Admin Girişi</h2>
        <input 
          type="email" 
          placeholder="E-posta" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} 
          required 
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} 
          required 
        />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#a855f7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;