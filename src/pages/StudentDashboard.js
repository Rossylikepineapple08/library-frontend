import React, { useState } from 'react';

const StudentDashboard = ({ user, onLogout }) => {
  // 1. Data tugas simulasi (State)
  const [tasks, setTasks] = useState([
    { id: 1, text: "PR Matematika (Halaman 42) 🔢", done: false },
    { id: 2, text: "Gambar Pemandangan Gunung 🎨", done: true },
    { id: 3, text: "Bawa bekal bekal sehat 🍎", done: false },
  ]);

  // Fungsi untuk mencentang tugas
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="dashboard-wrapper student-theme">
      {/* --- SIDEBAR --- */}
      <nav className="sidebar student-sidebar">
        <div className="brand">🎒 Sekolahku</div>
        <div className="user-info">
          <div className="avatar-circle">✨</div>
          <p>Halo, {user?.name || "Siswa"}</p>
        </div>
        <ul>
          <li className="active">🏠 Beranda</li>
          <li>📖 Jadwal Pelajaran</li>
          <li>🏆 Nilai & Prestasi</li>
        </ul>
        <button onClick={onLogout} className="logout-btn">Pulang 👋</button>
      </nav>

      {/* --- KONTEN UTAMA --- */}
      <main className="dashboard-content">
        <header className="content-header">
          <h1>Selamat Belajar! 🌈</h1>
          <p>Hari ini kamu punya {tasks.filter(t => !t.done).length} tugas baru.</p>
        </header>

        {/* Kartu Statistik Lucu */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>A+</h3>
            <p>Rata-rata Nilai</p>
          </div>
          <div className="stat-card pink">
            <h3>95%</h3>
            <p>Kehadiran</p>
          </div>
          <div className="stat-card yellow">
            <h3>12</h3>
            <p>Bintang Diraih</p>
          </div>
        </div>

        {/* Daftar Tugas (To-Do List) */}
        <section className="todo-section">
          <h3>Daftar Tugas Hari Ini ✍️</h3>
          <div className="todo-list">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`todo-item ${task.done ? 'is-done' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="check-box">{task.done ? '✅' : '⚪'}</div>
                <span className="task-text">{task.text}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;