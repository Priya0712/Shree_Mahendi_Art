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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3E1B12] via-[#6B2E1F] to-[#2B1810] px-4 relative overflow-hidden font-sans">
      {/* Paisley patterned decoration */}
      <div className="absolute inset-0 bg-[url('/patterns/mehendi-pattern.svg')] bg-repeat opacity-5 pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 sm:p-10 border border-[#D4AF37]/35 relative z-10 transition duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <img src="/images/logo.jpg" alt="Shree Mahendi" className="h-20 w-20 rounded-full object-cover border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
            <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-[#2B1810] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#3E1B12]">
              PRO
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-[#6B2E1F] tracking-wide">શ્રી મહેંદી આર્ટ</h1>
          <p className="text-center text-xs text-[#8B6F5E] font-semibold uppercase tracking-widest mt-1">Artist Admin Portal</p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#C1662F] mt-3"></div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3 mb-5 text-center font-medium">
            {error}
          </div>
        )}
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">યુઝરનેમ</label>
            <input
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none transition duration-300 bg-gray-50/50 text-[#2B1810] font-medium"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-[#6B2E1F] uppercase tracking-wider mb-1.5">પાસવર્ડ</label>
            <input
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/15 outline-none transition duration-300 bg-gray-50/50 text-[#2B1810]"
              required
            />
          </div>
        </div>

        <button
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#6B2E1F] to-[#C1662F] hover:from-[#C1662F] hover:to-[#6B2E1F] text-white rounded-xl py-3.5 font-bold tracking-wide active:scale-95 transition duration-300 shadow-md shadow-[#6B2E1F]/20 cursor-pointer text-sm"
        >
          {loading ? 'પ્રવેશ કરી રહ્યા છીએ...' : 'સાઇન ઇન કરો'}
        </button>
      </form>
    </div>
  );
};

export default Login;
