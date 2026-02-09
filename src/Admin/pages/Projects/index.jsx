import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'; 
import Table from '../../components/Table';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', tech: '', link: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (error) {
      console.error("Projeler çekilemedi:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu projeyi silmek istediğine emin misin?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
      } catch (error) {
        console.error("Silme hatası:", error);
      }
    }
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setNewProject({
      name: project.name,
      tech: project.tech,
      link: project.link,
      date: project.date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const projectRef = doc(db, "projects", editingId);
        await updateDoc(projectRef, {
          name: newProject.name,
          tech: newProject.tech,
          link: newProject.link,
        });
        alert("Proje güncellendi!");
      } else {
        await addDoc(collection(db, "projects"), {
          ...newProject,
          date: new Date().toLocaleDateString()
        });
        alert("Proje eklendi!");
      }
      
      setNewProject({ name: '', tech: '', link: '', date: '' });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("İşlem hatası:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e1e2d' }}>
        {editingId ? "Projeyi Düzenle ✏️" : "Yeni Proje Ekle "}
      </h2>
      
      <form onSubmit={handleSave} style={formContainerStyle}>
        <input 
          placeholder="Proje Adı" 
          value={newProject.name} 
          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
          style={inputStyle} required 
        />
        <input 
          placeholder="Teknolojiler" 
          value={newProject.tech} 
          onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
          style={inputStyle} required 
        />
        <input 
          placeholder="Link (GitHub/Live)" 
          value={newProject.link} 
          onChange={(e) => setNewProject({...newProject, link: e.target.value})}
          style={inputStyle} 
        />
        
        <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px' }}>
          <button type="submit" style={buttonStyle}>
            {editingId ? "Güncelle" : "Ekle"}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setNewProject({ name: '', tech: '', link: '', date: '' }); }}
              style={{ ...buttonStyle, backgroundColor: '#64748b' }}
            >
              İptal
            </button>
          )}
        </div>
      </form>

      <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table 
          headers={["Proje Adı", "Teknolojiler", "Link", "Tarih"]} 
          data={projects.map(p => ({ 
            id: p.id, 
            name: p.name, 
            tech: p.tech, 
            link: p.link || "-", 
            date: p.date 
          }))}
          onEdit={handleEditClick}
          onDelete={(item) => handleDelete(item.id)}
        />
      </div>
    </div>
  );
};

const formContainerStyle = { 
  background: '#fff', 
  padding: '25px', 
  borderRadius: '15px', 
  marginBottom: '30px', 
  boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px'
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

export default Projects;