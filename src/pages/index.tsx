import React from 'react';
import Navbar from '@/components/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Website Kelas</h1>
        <p className="text-xl text-gray-600 mb-8">
          Platform manajemen kelas online terbaik untuk siswa dan guru
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Materi Lengkap</h3>
            <p className="text-gray-600">Akses semua materi pembelajaran</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Manajemen Siswa</h3>
            <p className="text-gray-600">Kelola data siswa dengan mudah</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Laporan</h3>
            <p className="text-gray-600">Pantau progress belajar siswa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;