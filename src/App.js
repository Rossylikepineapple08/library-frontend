import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

// --- KOMPONEN HALAMAN LOGIN ---
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook untuk pindah halaman

  const handleLoginProcess = (role) => {
    if (!email) {
      alert("Isi email dulu ya! ✨");
      return;
    }

    // 1. Simpan data user ke State utama (App.js)
    const userData = {
      name: email.split('@')[0], // Ambil nama dari email
      role: role
    };
    onLogin(userData);

    // 2. Redirect/Pindah ke halaman yang sesuai
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/siswa');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="admin-badge">Portal Sekolah Ceria 🏫</div>
        <h2>Halo! Selamat Datang</h2>
        <p>Mau masuk sebagai siapa hari ini?</p>
        
        <input 
          type="email" 
          placeholder="Ketik emailmu di sini..." 
          className="cute-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="login-options">
          <button onClick={() => handleLoginProcess('siswa')} className="login-button user-btn">
            Masuk sebagai Siswa 🎒
          </button>
          <button onClick={() => handleLoginProcess('admin')} className="login-button admin-btn">
            Masuk sebagai Admin 👑
          </button>
        </div>
      </div>
    </div>
  );
}

// --- KOMPONEN DASHBOARD ADMIN (SEDERHANA) ---
function AdminDashboard({ user, onLogout }) {
  return (
    <div className="dashboard-wrapper admin-theme">
      <nav className="sidebar admin-sidebar">
        <div className="brand">👑 Admin Panel</div>
        <ul><li className="active">📊 Ringkasan</li><li>👥 Data Siswa</li></ul>
        <button onClick={onLogout} className="logout-btn">Keluar</button>
      </nav>
      <main className="dashboard-content">
        <h1>Selamat Bekerja, Admin {user.name}!</h1>
        <div className="stat-card"><h3>1,240</h3><p>Total Siswa Aktif</p></div>
      </main>
    </div>
  );
}

// --- KOMPONEN UTAMA (ROUTING) ---
export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* Halaman Utama adalah Login */}
        <Route path="/" element={<LoginPage onLogin={setUser} />} />

        {/* Jalur ke Dashboard Siswa */}
        <Route 
          path="/siswa" 
          element={user?.role === 'siswa' ? <StudentDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />

        {/* Jalur ke Dashboard Admin */}
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}