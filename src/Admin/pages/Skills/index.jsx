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
      <h2>Yetenekleri Yönet</h2>
      <form onSubmit={handleAddSkill} style={formStyle}>
        <input placeholder="Yetenek (Örn: React)" value={skillName} onChange={(e) => setSkillName(e.target.value)} style={inputStyle} required />
        <input placeholder="Seviye (Örn: 90)" type="number" value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} style={inputStyle} required />
        <button type="submit" style={buttonStyle}>Ekle</button>
      </form>

        <Table 
        headers={["Yetenek Adı", "Seviye"]} 
        data={skills.map(s => ({ 
        id: s.id, 
        name: s.name, 
        level: s.level // m.email veya m.message göndermiyoruz burada!
        }))}
        onDelete={(item) => handleDelete(item.id)}
        />
    </div>
  );
};

const formStyle = { background: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '20px' };
const inputStyle = { padding: '10px', marginRight: '10px', border: '1px solid #ddd', borderRadius: '5px' };
const buttonStyle = { padding: '10px 20px', background: '#a855f7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Skills;