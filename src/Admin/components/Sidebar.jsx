import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Projeler', path: '/admin/projects' },
    { name: 'Yetenekler', path: '/admin/skills' },
    { name: 'Mesajlar', path: '/admin/messages' },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={logoSection}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#a855f7', margin: 0 }}>PORTFOLIO</h2>
        <span style={{ fontSize: '10px', color: '#565674', letterSpacing: '2px' }}>ADMIN PANEL</span>
      </div>

      <nav style={{ flex: 1, paddingTop: '20px' }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...linkStyle,
              color: isActive ? '#ffffff' : '#a2a3b7',
              backgroundColor: isActive ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid #a855f7' : '4px solid transparent',
            })}
            end={item.path === '/admin'}
          >
            {item.name === 'Mesajlar' ? '📩 ' : ''} {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const sidebarStyle = {
  width: '260px',
  background: '#1e1e2d',
  height: '100vh',
  position: 'fixed', 
  left: 0,
  top: 0,
  zIndex: 1000
};

const logoSection = { padding: '30px 25px', textAlign: 'center', borderBottom: '1px solid #2d2d3f' };
const linkStyle = { display: 'block', padding: '12px 25px', textDecoration: 'none', fontSize: '14px', transition: '0.3s' };

export default Sidebar;