import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Admin from "./Admin/Admin";
import Login from "./Admin/pages/Login";
import Home from "./Admin/pages/Home";
import Dashboard from './Admin/pages/Dashboard';
import Projects from './Admin/pages/Projects/index';
import Skills from './Admin/pages/Skills/index'; 
import Messages from './Admin/pages/Messages/index';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <BrowserRouter>
  <Routes>
    {/* Ana Sayfa ve Login */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    {/* Admin Paneli ve Alt Sayfaları */}
    <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<Projects />} />
      <Route path="skills" element={<Skills />} />
      <Route path="messages" element={<Messages />} />
    </Route>
    
    {/* Eğer yukarıdakilerin hiçbiri değilse ana sayfaya at */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</BrowserRouter>
  );
}

export default App;