import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'હોમ' },
  { to: '/about', label: 'અમારી વિશે' },
  { to: '/services', label: 'સેવાઓ' },
  { to: '/gallery', label: 'ગેલેરી' },
  { to: '/testimonials', label: 'સમીક્ષાઓ' },
  { to: '/contact', label: 'સંપર્ક' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#D4AF37]/30">
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold text-[#6B2E1F]">શ્રી મહેંદી</Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              `text-sm font-medium ${isActive ? 'text-[#6B2E1F] border-b-2 border-[#D4AF37]' : 'text-[#4A2E22]'}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button className="md:hidden text-[#6B2E1F]" onClick={() => setOpen(true)} aria-label="મેનુ ખોલો">
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-[#FFF8F0] shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-[#6B2E1F]">શ્રી મહેંદી</span>
              <button onClick={() => setOpen(false)} aria-label="બંધ કરો"><X size={24} /></button>
            </div>
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={({ isActive }) => `py-3 text-base border-b border-[#D4AF37]/20 ${isActive ? 'text-[#6B2E1F] font-semibold' : 'text-[#4A2E22]'}`}>
                {l.label}
              </NavLink>
            ))}
            <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer"
              className="mt-6 bg-[#25D366] text-white text-center py-3 rounded-full font-semibold">
              WhatsApp બુકિંગ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
