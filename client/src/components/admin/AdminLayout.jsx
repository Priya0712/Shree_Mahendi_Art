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
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-60 bg-white border-r p-4">
        <h2 className="font-bold text-[#6B2E1F] text-lg mb-6">Shree Mahendi</h2>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm font-medium ${isActive ? 'bg-[#6B2E1F] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2 mt-auto text-red-600 text-sm">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-grow p-4 md:p-6">
        <Outlet />
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 md:hidden z-50">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex flex-col items-center text-[10px] gap-0.5 ${isActive ? 'text-[#6B2E1F]' : 'text-gray-500'}`}>
            <Icon size={20} /> {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminLayout;
