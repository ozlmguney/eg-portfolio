import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Admin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      {/* İÇERİK ALANI BURADA BAŞLIYOR */}
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', // Sidebar genişliği kadar boşluk bıraktık!
        padding: '30px', 
        minHeight: '100vh', 
        background: '#f4f5f7' 
      }}>
        <Outlet /> {/* Sayfalar (Projeler, Mesajlar vs.) burada görünecek */}
      </main>
    </div>
  );
};

export default Admin;