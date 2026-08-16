import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Image, Sparkles, FolderTree, Inbox, LogOut } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
];

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-16 md:pb-0 md:flex font-sans">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#3E1B12] text-white border-r border-[#D4AF37]/20 p-5 shadow-2xl">
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#D4AF37]/20">
          <img src="/images/logo.jpg" alt="Shree Mahendi" className="h-10 w-10 rounded-full object-cover border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
          <div>
            <h2 className="font-bold text-[#D4AF37] text-base leading-none">શ્રી મહેંદી</h2>
            <span className="text-[10px] text-[#FFF8F0]/60 uppercase tracking-widest mt-1 inline-block">Artist Portal</span>
          </div>
        </div>
        <nav className="flex-grow space-y-1.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C1662F] text-[#2B1810] shadow-md shadow-[#D4AF37]/10' 
                  : 'text-[#FFF8F0]/70 hover:bg-white/5 hover:text-white'
              }`
            }>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 mt-auto text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition duration-300 cursor-pointer">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#3E1B12] border-t border-[#D4AF37]/20 flex justify-around py-2.5 md:hidden z-50 shadow-2xl">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex flex-col items-center text-[10px] font-semibold gap-1 transition duration-300 ${
              isActive ? 'text-[#D4AF37] scale-110' : 'text-[#FFF8F0]/60'
            }`
          }>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
        <button onClick={logout} className="flex flex-col items-center text-[10px] font-semibold gap-1 text-red-400">
          <LogOut size={18} /> Out
        </button>
      </nav>
    </div>
  );
};

export default AdminLayout;
