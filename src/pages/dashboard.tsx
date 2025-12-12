import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import Select from 'react-select';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  nisn: string;
  birth_date: string;
  created_at?: string;
}

interface FormData {
  name: string;
  email: string;
  class: string;
  nisn: string;
  birth_date: string;
}

const classOptions = [
  { value: "X RPL 1", label: "X RPL 1" },
  { value: "X RPL 2", label: "X RPL 2" },
  { value: "XI RPL 1", label: "XI RPL 1" },
  { value: "XI RPL 2", label: "XI RPL 2" },
  { value: "XII RPL 1", label: "XII RPL 1" },
  { value: "XII RPL 2", label: "XII RPL 2" },
  { value: "XII RPL 3", label: "XII RPL 3" }
];

const Dashboard: React.FC = () => {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    class: '',
    nisn: '',
    birth_date: ''
  });

  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // CEK LOGIN USER
  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push('/login');
      return;
    }

    setUserEmail(data.session.user.email || '');
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data siswa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({ name: '', email: '', class: '', nisn: '', birth_date: '' });
  };

  const handleEdit = (student: Student) => {
    setShowForm(true);
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      class: student.class,
      nisn: student.nisn,
      birth_date: student.birth_date
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus siswa ini?')) return;

    try {
      const { error } = await supabase.from('students').delete().eq('id', id);

      if (error) throw error;

      setStudents(students.filter((s) => s.id !== id));
      alert('Siswa berhasil dihapus!');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus siswa');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from('students')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        alert('Siswa berhasil diupdate!');
      } else {
        const { error } = await supabase.from('students').insert([formData]);

        if (error) throw error;
        alert('Siswa berhasil ditambahkan!');
      }

      fetchStudents();
      setShowForm(false);
      setFormData({ name: '', email: '', class: '', nisn: '', birth_date: '' });
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan data siswa');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-400">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-slate-700 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-400">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard Admin</h1>
          <p className="text-slate-700 text-lg">Selamat datang, {userEmail}!</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        {/* Action Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Daftar Siswa</h2>
              <p className="text-slate-600 mt-1">Total: {students.length} siswa</p>
            </div>
            <button
              onClick={handleAdd}
              className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition-colors shadow-md font-medium"
            >
              + Tambah Siswa
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {editingId ? 'Edit Siswa' : 'Tambah Siswa Baru'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Nama */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    placeholder="contoh@email.com"
                    required
                  />
                </div>

                {/* NISN */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">NISN</label>
                  <input
                    type="text"
                    value={formData.nisn}
                    onChange={(e) =>
                      setFormData({ ...formData, nisn: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    placeholder="10 digit NISN"
                    required
                  />
                </div>

                {/* Tgl Lahir */}
                <div>
                  <label className="block text-slate-700 font-medium mb-2">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) =>
                      setFormData({ ...formData, birth_date: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* KELAS - */}
                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-medium mb-2">Kelas</label>

                  <Select
                    options={classOptions}
                    value={
                      formData.class
                        ? classOptions.find(o => o.value === formData.class)
                        : null
                    }
                    onChange={(selected) =>
                      setFormData({ ...formData, class: selected?.value || "" })
                    }
                    placeholder="Pilih kelas..."
                    className="text-left"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors shadow-md font-medium"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-400 text-white px-8 py-3 rounded-full hover:bg-slate-500 transition-colors font-medium"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">No</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">NISN</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Tanggal Lahir</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Kelas</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                      <p className="text-lg">Belum ada data siswa</p>
                      <p className="text-sm text-slate-400 mt-1">Klik "Tambah Siswa" untuk memulai</p>
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-700">{index + 1}</td>
                      <td className="px-6 py-4 text-slate-800 font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-slate-700">{student.nisn}</td>
                      <td className="px-6 py-4 text-slate-700">{student.email}</td>
                      <td className="px-6 py-4 text-slate-700">{formatDate(student.birth_date)}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {student.class}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
