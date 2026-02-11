import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Table from '../../components/Table';

const Skills = () => {
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));
    setSkills(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "skills"), {
        name: skillName,
        level: skillLevel, 
      });
      setSkillName(''); setSkillLevel('');
      fetchSkills();
      alert("Yetenek eklendi!");
    } catch (error) { alert(error.message); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Silinsin mi?")) {
      await deleteDoc(doc(db, "skills", id));
      fetchSkills();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e1e2d' }}>Yetenekleri Yönet</h2>
      
      <form onSubmit={handleAddSkill} style={formContainerStyle}>
        <input 
          placeholder="Yetenek (Örn: React)" 
          value={skillName} 
          onChange={(e) => setSkillName(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <input 
          placeholder="Seviye (Örn: 90)" 
          type="number" 
          value={skillLevel} 
          onChange={(e) => setSkillLevel(e.target.value)} 
          style={inputStyle} 
          required 
        />
        <button type="submit" style={buttonStyle}>Ekle</button>
      </form>

      <div style={tableWrapperStyle}>
        <Table 
          headers={["Yetenek Adı", "Seviye"]} 
          data={skills.map(s => ({ 
            id: s.id, 
            name: s.name, 
            level: s.level 
          }))}
          onDelete={(item) => handleDelete(item.id)}
        />
      </div>
    </div>
  );
};

const formContainerStyle = { 
  background: '#fff', 
  padding: '25px', 
  borderRadius: '0px', 
  marginBottom: '30px', 
  boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px'
};

const tableWrapperStyle = { 
  background: 'white', 
  borderRadius: '0px', 
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  overflow: 'hidden' 
};

const inputStyle = { 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #ddd', 
  flex: '1',
  minWidth: '200px',
  outline: 'none'
};

const buttonStyle = { 
  padding: '12px 25px', 
  backgroundColor: '#a855f7', 
  color: 'white', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s'
};

export default Skills;