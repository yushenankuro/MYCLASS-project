import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://192.168.1.5:3000/update-password", // Halaman reset
    });

    if (error) {
      setError("Gagal mengirim email. Pastikan email terdaftar.");
      setLoading(false);
      return;
    }

    setMessage("Email reset password telah dikirim! Silakan cek inbox Anda.");
    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Lupa Password</h2>

          {message && (
            <div className="bg-green-500 text-white p-3 rounded mb-4">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-700">Masukkan Email Anda</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@gmail.com"
              className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Reset Password"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Link reset password akan dikirim ke email Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
