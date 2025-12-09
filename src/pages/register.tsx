import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      router.push('/dashboard');
    } else {
      setError('Username atau password salah!');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Lupa Password?
            </Link>
            <span className="mx-2">|</span>
            <Link href="/register" className="text-blue-500 hover:underline">
              Daftar Akun Baru
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="font-bold">Demo Account:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;