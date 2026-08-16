import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/images/logo.jpg" alt="Shree Mahendi" className="h-16 w-16 rounded-full object-cover border-2 border-[#D4AF37] mb-2" />
          <h1 className="text-2xl font-bold text-center text-[#6B2E1F] mb-1">Shree Mahendi</h1>
          <p className="text-center text-sm text-gray-500">Admin Panel</p>
        </div>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <input
          type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-4 text-base"
          required
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-6 text-base"
          required
        />
        <button
          type="submit" disabled={loading}
          className="w-full bg-[#6B2E1F] text-white rounded-lg py-3 font-semibold active:scale-95 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
