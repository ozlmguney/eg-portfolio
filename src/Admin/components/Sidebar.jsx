import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // signOut(auth) işlemini siliyoruz çünkü bu seni login'e zorlar.
    // Sadece ana sayfaya (portfolyona) dönmek istiyorsan:
    navigate('/'); 
  };

  const menuItems = [
    { name: 'Genel Bakış', path: '/admin' },
    { name: 'Projeler', path: '/admin/projects' },
    { name: 'Yetenekler', path: '/admin/skills' },
    { name: 'Mesajlar', path: '/admin/messages' },
  ];

  // --- STİL TANIMLAMALARI (Hata Almamak İçin Bileşen İçinde veya Hemen Altında Olmalı) ---
  const sidebarContainer = {
    width: '260px',
    backgroundColor: '#0f0a15',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #1a1425',
  };

  const logoWrapper = {
    padding: '40px 25px',
    marginBottom: '20px'
  };

  const logoText = {
    fontSize: '16px',
    fontWeight: '800',
    color: '#fff',
    margin: 0,
    letterSpacing: '1px'
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    marginBottom: '4px'
  };

  const sidebarFooter = {
    padding: '30px 20px',
    marginTop: 'auto'
  };

  const footerBtn = {
    width: '100%',
    padding: '12px',
    background: '#1a1425',
    border: '1px solid #2d243d',
    borderRadius: '8px',
    color: '#d8b4fe',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: '0.2s ease',
  };

  return (
    <div style={sidebarContainer}>
      <div style={logoWrapper}>
        <h2 style={logoText}>Hoşgeldin 
          <span style={{ color: '#d8b4fe' }}> BEYZA</span>
        </h2>
      </div>

      <nav style={{ flex: 1, padding: '0 15px' }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              background: isActive ? 'rgba(216, 180, 254, 0.05)' : 'transparent',
              color: isActive ? '#d8b4fe' : '#71717a',
              borderLeft: isActive ? '2px solid #a855f7' : '2px solid transparent',
            })}
            end={item.path === '/admin'}
          >
            <span style={{ letterSpacing: '0.5px' }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={sidebarFooter}>
        <button 
          onClick={handleLogout}
          style={footerBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4c1d95';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1a1425';
            e.currentTarget.style.color = '#d8b4fe';
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Sidebar;