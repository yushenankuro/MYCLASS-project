import React from 'react';
import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  return (
<div className="min-h-screen bg-gradient-to-b from-[#01162b] to-[#00385a]">
  <Navbar />

  <div className="max-w-7xl mx-auto p-8 text-center text-white">
    <h1 className="text-4xl font-bold mb-4">Selamat Datang di Website Kelas</h1>
    <p className="text-xl opacity-90 mb-8">
      Platform manajemen kelas online terbaik untuk siswa dan guru
    </p>
  </div>
</div>
  );
};

export default Home;