const Textarea = ({ label, value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#444' }}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight: '100px',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ddd',
          fontSize: '14px',
          fontFamily: 'inherit'
        }}
      />
    </div>
  );
};

export default Textarea;