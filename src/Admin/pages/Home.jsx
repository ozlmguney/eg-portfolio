import React, { useEffect, useState } from 'react';

import { db } from '../../firebase';

import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore'; 

import { motion } from 'framer-motion';



const Home = () => {

  const [aboutData, setAboutData] = useState('');

  const [projects, setProjects] = useState([]);

  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });



  useEffect(() => {

    const fetchData = async () => {

      const aboutSnap = await getDoc(doc(db, "settings", "about"));

      if (aboutSnap.exists()) setAboutData(aboutSnap.data().text);

      const projSnap = await getDocs(collection(db, "projects"));

      setProjects(projSnap.docs.map(doc => doc.data()));

      const skillSnap = await getDocs(collection(db, "skills"));

      setSkills(skillSnap.docs.map(doc => doc.data()));

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

      <div style={blobOne}></div>

      <div style={blobTwo}></div>



      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={heroWrapperModern}>

        <div style={heroTextContent}>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} style={badge}>

          Çalışmaya Hazır 🚀

          </motion.div>

          <h1 style={heroTitle}>Beyza <span style={gradientText}>Portfolio</span></h1>

          <p style={heroSub}>
            {aboutData ? aboutData : "Yükleniyor"} 
          </p>          

          <div style={socialWrapper}>

            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" style={socialBtn}>LinkedIn</a>

            <a href="https://github.com/" target="_blank" rel="noreferrer" style={socialBtn}>GitHub</a>

            <a href="https://instagram.com/" target="_blank" rel="noreferrer" style={socialBtn}>Instagram</a>

          </div>

        </div>



        <motion.div initial={{ opacity: 0, x: 50, rotate: 5 }} animate={{ opacity: 1, x: 0, rotate: -3 }} whileHover={{ rotate: 0, scale: 1.05 }} style={photoCardContainer}>

          <div style={photoCardFrame}>

            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop" alt="Lara" style={photoStyle} />

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

              <div style={barBg}><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1 }} style={barFill} /></div>

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
      <a 
        href={proj.link || "#"} 
        target="_blank" 
        rel="noreferrer" 
        style={linkStyle}
      >
        Detayları Gör →
      </a>
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



const mainContainer = { backgroundColor: '#0a0a0c', color: '#fff', minHeight: '100vh', padding: '60px 20px', fontFamily: "'Inter', sans-serif", overflow: 'hidden', position: 'relative' };

const blobOne = { position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.15)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 };

const blobTwo = { position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 };

const heroWrapperModern = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto 100px auto', padding: '100px 20px', gap: '50px', flexWrap: 'wrap', position: 'relative', zIndex: 1 };

const heroTextContent = { flex: 1, textAlign: 'left', minWidth: '300px' };

const badge = { display: 'inline-block', padding: '8px 20px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '30px', color: '#a855f7', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '20px' };

const heroTitle = { fontSize: '4rem', margin: '0 0 20px 0', letterSpacing: '-2px' };

const gradientText = { background: 'linear-gradient(90deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '900' };

const heroSub = { fontSize: '1.2rem', color: '#a2a3b7', maxWidth: '600px', lineHeight: '1.6', marginBottom: '20px' };

const socialWrapper = { display: 'flex', gap: '15px', marginTop: '20px' };

const socialBtn = { padding: '10px 20px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', color: '#a855f7', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', transition: '0.3s' };

const photoCardContainer = { flex: '0 1 350px', display: 'flex', justifyContent: 'center', perspective: '1000px', cursor: 'pointer' };

const photoCardFrame = { background: 'white', padding: '15px 15px 40px 15px', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', width: '280px', textAlign: 'center' };

const photoStyle = { width: '100%', height: '350px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' };

const photoCardFooter = { display: 'flex', flexDirection: 'column', color: '#333' };

const contentSection = { maxWidth: '1200px', margin: '0 auto 120px auto', position: 'relative', zIndex: 1 };

const sectionHeading = { fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' };

const skillGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };

const skillCardModern = { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '25px', borderRadius: '20px' };

const barBg = { height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' };

const barFill = { height: '100%', background: 'linear-gradient(90deg, #a855f7, #6366f1)' };

const projGridModern = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' };

const glassCard = { background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.08)' };

const projIcon = { fontSize: '2rem', marginBottom: '20px' };

const projName = { fontSize: '1.6rem', marginBottom: '10px' };

const projTech = { color: '#a2a3b7', fontSize: '1rem', marginBottom: '30px' };

const projFooter = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' };

const contactFlexContainer = { display: 'flex', gap: '40px', flexWrap: 'wrap' };

const contactInfoSide = { flex: '1', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '280px' };

const smallContactCard = { background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' };

const messageForm = { flex: '2', display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', minWidth: '300px' };

const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', color: '#fff', outline: 'none' };

const submitBtn = { background: 'linear-gradient(90deg, #a855f7, #6366f1)', border: 'none', padding: '15px', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' };

const linkStyle = { color: '#a855f7', textDecoration: 'none', fontWeight: '600',cursor: 'pointer' };

export default Home; 