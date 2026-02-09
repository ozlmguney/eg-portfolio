import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import Table from '../../components/Table';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "messages"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => {
        const res = doc.data();
        return {
          id: doc.id,
          name: res.name || "İsimsiz",
          email: res.email || "E-posta yok",
          message: res.message || "Mesaj içeriği boş"
        };
      });
      
      setMessages(data);
    } catch (error) {
      console.error("Mesajlar çekilemedi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu mesajı silmek istediğine emin misin?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        fetchMessages();
      } catch (error) {
        alert("Silme işlemi sırasında bir hata oluştu.");
      }
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e1e2d' }}>Gelen Mesajlarınız</h2>
      
      <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table 
          headers={["Gönderen", "E-posta", "Mesaj"]} 
          data={messages.map(m => ({ 
            id: m.id, 
            name: m.name, 
            email: m.email, 
            message: m.message 
          }))}
          onDelete={(item) => handleDelete(item.id)}
        />
      </div>
    </div>
  );
};

export default Messages;