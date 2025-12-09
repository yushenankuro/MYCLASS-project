import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Link reset password telah dikirim ke email Anda!');
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Lupa Password</h2>
          <p className="text-gray-600 mb-6">
            Masukkan email Anda untuk reset password
          </p>
          
          {message && (
            <div className="bg-green-500 text-white p-3 rounded mb-4">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Kirim Link Reset
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-500 hover:underline">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;