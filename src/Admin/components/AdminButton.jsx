import { useNavigate } from "react-router-dom";
import { UserLock } from "lucide-react"; 

const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1000 }}>
      <button
        onClick={() => navigate("/login")}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          backgroundColor: 'rgba(30, 30, 31, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: '#a2a3b7',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          transition: '0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#a855f7';
          e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#a2a3b7';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <UserLock size={18} />
        <span>Admin Girişi</span>
      </button>
    </div>
  );
};

export default AdminButton;