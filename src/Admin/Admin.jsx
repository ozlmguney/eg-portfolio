import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Admin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '30px', 
        minHeight: '100vh', 
        background: '#f4f5f7' 
      }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Admin;