import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore'; 
import { motion } from 'framer-motion';
import AdminButton from "../components/AdminButton";

const Home = () => {
  const [aboutData, setAboutData] = useState('');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutSnap = await getDoc(doc(db, "settings", "about"));
        if (aboutSnap.exists()) setAboutData(aboutSnap.data().text);

        const projSnap = await getDocs(collection(db, "projects"));
        setProjects(projSnap.docs.map(doc => doc.data()));

        const skillSnap = await getDocs(collection(db, "skills"));
        setSkills(skillSnap.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        date: new Date().toISOString()
      });
      alert("Mesajınız başarıyla gönderildi!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div style={mainContainer}>
      <AdminButton />

      <div style={blobOne}></div>
      <div style={blobTwo}></div>

      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={heroWrapperModern}>
        <div style={heroTextContent}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} style={badge}>
            Çalışmaya Hazır 🚀
          </motion.div>
          <h1 style={heroTitle}>Beyza <span style={gradientText}>Portfolio</span></h1>
          <p style={heroSub}>
            {aboutData ? aboutData : "Yükleniyor..."} 
          </p>          

          <div style={socialWrapper}>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" style={socialBtn}>LinkedIn</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" style={socialBtn}>GitHub</a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" style={socialBtn}>Instagram</a>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50, rotate: 5 }} animate={{ opacity: 1, x: 0, rotate: -3 }} whileHover={{ rotate: 0, scale: 1.05 }} style={photoCardContainer}>
          <div style={photoCardFrame}>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop" alt="Profile" style={photoStyle} />
            <div style={photoCardFooter}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Beyza</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Developer & Designer</span>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <section style={contentSection}>
        <h2 style={sectionHeading}>Yeteneklerim</h2>
        <div style={skillGrid}>
          {skills.map((skill, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} style={skillCardModern}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: '700' }}>{skill.name}</span>
                <span style={{ color: '#a855f7' }}>%{skill.level}</span>
              </div>
              <div style={barBg}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1 }} style={barFill} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={contentSection}>
        <h2 style={sectionHeading}>Projelerim</h2>
        <div style={projGridModern}>
          {projects.map((proj, index) => (
            <motion.div key={index} whileHover={{ y: -10 }} style={glassCard}>
              <div style={projIcon}>📂</div>
              <h3 style={projName}>{proj.name}</h3>
              <p style={projTech}>{proj.tech}</p>
              <div style={projFooter}>
                <a href={proj.link || "#"} target="_blank" rel="noreferrer" style={linkStyle}>Detayları Gör →</a>
                <span>{proj.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={contentSection}>
        <h2 style={sectionHeading}>Bana Ulaşın</h2>
        <div style={contactFlexContainer}>
          <div style={contactInfoSide}>
            <motion.div whileHover={{ x: 10 }} style={smallContactCard}>📧 beyzayilmaz@gmail.com</motion.div>
            <motion.div whileHover={{ x: 10 }} style={smallContactCard}>📞 +90 502 012 63 22</motion.div>
            <motion.div whileHover={{ x: 10 }} style={smallContactCard}>📍 İstanbul, Türkiye</motion.div>
          </div>
          <motion.form onSubmit={handleSubmit} style={messageForm} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <input type="text" placeholder="Adınız" style={inputStyle} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="email" placeholder="E-posta" style={inputStyle} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <textarea placeholder="Mesajınız" style={{...inputStyle, height: '120px', resize: 'none'}} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
            <button type="submit" style={submitBtn}>Gönder ✨</button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Home; 