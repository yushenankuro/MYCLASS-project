import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
}

interface FormData {
  name: string;
  email: string;
  class: string;
}

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Budi Santoso', email: 'budi@email.com', class: '10A' },
    { id: 2, name: 'Ani Wijaya', email: 'ani@email.com', class: '10B' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    class: ''
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) setUsername(user);
  }, []);

  const handleAdd = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({ name: '', email: '', class: '' });
  };

  const handleEdit = (student: Student) => {
    setShowForm(true);
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      class: student.class
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus siswa ini?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setStudents(students.map(s => 
        s.id === editingId ? { ...s, ...formData } : s
      ));
    } else {
      const newStudent: Student = {
        id: students.length + 1,
        ...formData
      };
      setStudents([...students, newStudent]);
    }
    
    setShowForm(false);
    setFormData({ name: '', email: '', class: '' });
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
          <p className="text-gray-600 mb-8">Selamat datang, {username}!</p>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Daftar Siswa</h2>
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              + Tambah Siswa
            </button>
          </div>

          {showForm && (
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">
                {editingId ? 'Edit Siswa' : 'Tambah Siswa Baru'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Nama</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Kelas</label>
                  <input
                    type="text"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">Nama</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Kelas</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.class}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;