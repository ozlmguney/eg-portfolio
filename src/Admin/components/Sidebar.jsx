import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { name: 'Genel Bakış', path: '/admin',  },
    { name: 'Projeler', path: '/admin/projects', },
    { name: 'Yetenekler', path: '/admin/skills',  },
    { name: 'Mesajlar', path: '/admin/messages',  },
  ];

  return (
    <div style={sidebarContainer}>
      <div style={logoWrapper}>
        <div style={logoCircle}>A</div>
        <div>
          <h2 style={logoText}>Hoşgeldin 
            <span style={{ color: '#d8b4fe' }}> BEYZA</span></h2>
          
        </div>
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
            <span style={{ fontSize: '18px', marginRight: '12px' }}>{item.icon}</span>
            <span style={{ letterSpacing: '0.5px' }}>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={sidebarFooter}>
        <button 
           onClick={() => window.open('/', '_blank')}
           style={footerBtn}
        >
          Siteyi Görüntüle ↗
        </button>
      </div>
    </div>
  );
};


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
  boxShadow: '10px 0 30px rgba(0,0,0,0.2)'
};

const logoWrapper = {
  padding: '40px 25px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px'
};

const logoCircle = {
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#fff',
  boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
};

const logoText = {
  fontSize: '16px',
  fontWeight: '800',
  color: '#fff',
  margin: 0,
  letterSpacing: '1px'
};

const statusWrapper = { display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' };
const statusDot = { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' };
const statusText = { fontSize: '10px', color: '#52525b', textTransform: 'uppercase', letterSpacing: '1px' };

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
  transition: '0.3s'
};

export default Sidebar;