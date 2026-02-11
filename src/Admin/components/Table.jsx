import React from 'react';

const Table = ({ headers, data, onDelete, onEdit }) => { 
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i} style={thStyle}>{h}</th>)}
            <th style={{ ...thStyle, textAlign: 'center' }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} style={{ borderBottom: '1px solid #eee' }}>
              {Object.keys(item).filter(k => k !== 'id').map(key => (
                <td key={key} style={tdStyle}>{item[key]}</td>
              ))}

              <td style={{ ...tdStyle, textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
  <button 
    onClick={() => onEdit(item)} 
    style={{ 
      color: '#000000', 
      border: '1px solid #4c1d95', 
      background: 'transparent', 
      padding: '6px 14px', 
      borderRadius: '6px', 
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      transition: '0.2s ease', 
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#4c1d95'; 
      e.currentTarget.style.color = '#ffffff'; 
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent'; 
      e.currentTarget.style.color = '#000000';
    }}
  >
    Düzenle
  </button>

  <button 
    onClick={() => onDelete(item)} 
    style={{ 
      color: '#000000',  
      border: '1px solid #881337', 
      background: 'transparent',
      padding: '6px 14px', 
      borderRadius: '6px', 
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      transition: '0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#881337';
      e.currentTarget.style.color = '#ffffff'; 
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#000000'; 
    }}
  >
    Sil
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { padding: '15px', textAlign: 'left', background: '#f8f9fa', color: '#6c757d', borderBottom: '2px solid #dee2e6', whiteSpace: 'nowrap' };
const tdStyle = { padding: '15px', color: '#212529', borderBottom: '1px solid #eee', verticalAlign: 'middle' };
const trStyle = { transition: 'background 0.2s' };
const deleteBtnStyle = { color: '#dc3545', border: '1px solid #dc3545', background: 'transparent', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', width: '80px' };
const editBtnStyle = {
  color: '#0ea5e9',
  border: '1px solid #0ea5e9',
  background: 'transparent',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default Table;