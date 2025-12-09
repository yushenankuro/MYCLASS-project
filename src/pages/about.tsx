import React from 'react';
import Navbar from '@/components/Navbar';

const About: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
        <p className="text-lg text-gray-700 mb-6">
          Website Kelas adalah platform manajemen pembelajaran online yang memudahkan 
          guru dalam mengelola siswa dan materi pembelajaran.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Fitur Utama</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Manajemen data siswa</li>
          <li>Dashboard admin yang intuitif</li>
          <li>Keamanan data terjamin</li>
          <li>Mudah digunakan</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Kontak</h2>
        <p className="text-gray-700">Email: info@websitekelas.com</p>
        <p className="text-gray-700">Telepon: 0812-3456-7890</p>
      </div>
    </div>
  );
};

export default About;