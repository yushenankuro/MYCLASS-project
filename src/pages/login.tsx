import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Query user dari database
      const { data: users, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password) // NOTE: Di production, pakai hash password!
        .single();

      if (queryError || !users) {
        setError('Username atau password salah!');
        setLoading(false);
        return;
      }

      // Simpan session
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', users.username);
      localStorage.setItem('userId', users.id);

      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
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
            <p className="font-bold text-sm">Note:</p>
            <p className="text-sm">Buat akun baru dulu via Register</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;