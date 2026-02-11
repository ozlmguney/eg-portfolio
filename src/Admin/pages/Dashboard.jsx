import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [aboutText, setAboutText] = useState('');

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "settings", "about"), {
        text: aboutText
      });
      alert("Hakkımda yazısı kaydedildi!");
    } catch (error) {
      alert("Hata: " + error.message);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: '#1e1e2d', marginBottom: '20px' }}>Dashboard</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(116, 56, 108, 0.05)' }}>
        <h3>Portfolyo Hakkımda Metni</h3>
        <textarea 
          style={{ width: '100%', height: '150px', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '10px' }}
          placeholder="Kendini tanıt..."
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        <button 
          onClick={handleSave}
          style={{ marginTop: '15px', padding: '10px 25px', backgroundColor: '#a855f7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Veriyi Firebase'e Gönder
        </button>
      </div>
    </div>
  );
};

export default Dashboard;