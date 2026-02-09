const Navbar = () => {
  return (
    <header style={{
      height: '70px',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      borderBottom: '1px solid #edf2f7'
    }}>
      <div style={{ color: '#4a5568', fontWeight: '500' }}>Hoş geldin, <span style={{color: '#a855f7'}}>Özlem</span> 👋</div>
      <button style={{
        padding: '8px 15px',
        borderRadius: '20px',
        border: '1px solid #a855f7',
        color: '#a855f7',
        background: 'none',
        cursor: 'pointer',
        fontSize: '12px'
      }}>Çıkış Yap</button>
    </header>
  );
};

export default Navbar;