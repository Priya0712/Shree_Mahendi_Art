import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const adminPath = import.meta.env.VITE_ADMIN_PATH || '/secure-yk-admin';

  const menuItems = [
    { name: 'ડેશબોર્ડ', path: `${adminPath}/dashboard` },
    { name: 'ગેલેરી', path: `${adminPath}/gallery` },
    { name: 'કેટેગરી', path: `${adminPath}/categories` },
    { name: 'સેવાઓ', path: `${adminPath}/services` },
    { name: 'સમીક્ષાઓ', path: `${adminPath}/testimonials` },
    { name: 'પૂછપરછ લિસ્ટ', path: `${adminPath}/inquiries` },
    { name: 'વેબસાઇટ સેટિંગ્સ', path: `${adminPath}/settings` },
  ];

  const handleLogout = () => {
    logout();
    navigate(`${adminPath}/login`);
  };

  return (
    <aside className="w-64 bg-primary text-cream min-h-screen flex flex-col justify-between p-4 shadow-md">
      <div className="space-y-6">
        <h2 className="font-heading text-xl font-bold text-accent text-center border-b border-cream/10 pb-4">
          એડમિન કંટ્રોલ
        </h2>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive ? 'bg-accent text-primary-dark font-bold shadow-md' : 'hover:bg-primary-light hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-bridal-dark hover:bg-bridal text-cream text-sm font-bold py-2 px-4 rounded-lg transition-colors border border-bridal mt-8"
      >
        લૉગઆઉટ
      </button>
    </aside>
  );
}
