import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'હોમ' },
  { id: 'about', label: 'અમારી વિશે' },
  { id: 'services', label: 'સેવાઓ' },
  { id: 'gallery', label: 'ગેલેરી' },
  { id: 'testimonials', label: 'સમીક્ષાઓ' },
  { id: 'contact', label: 'સંપર્ક' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120; // offset for sticky navbar

      // Check if scrolled to the absolute bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin, location.pathname]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setOpen(false);

    if (isAdmin) {
      navigate(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#D4AF37]/30">
      <div className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto">
        <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2">
          <img src="/images/logo.jpg" alt="શ્રી મહેંદી" className="h-10 w-10 rounded-full object-cover border border-[#D4AF37]" />
          <span className="text-xl font-bold text-[#6B2E1F]">શ્રી મહેંદી</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => handleNavClick(e, l.id)}
              className={`relative py-1 text-sm font-medium transition duration-300 ${
                activeSection === l.id && !isAdmin ? 'text-[#6B2E1F] font-semibold' : 'text-[#4A2E22] hover:text-[#6B2E1F]'
              }`}
            >
              {l.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] transition-transform duration-300 origin-left ${
                  activeSection === l.id && !isAdmin ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                }`}
              />
            </a>
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
              <div className="flex items-center gap-2">
                <img src="/images/logo.jpg" alt="શ્રી મહેંદી" className="h-9 w-9 rounded-full object-cover border border-[#D4AF37]" />
                <span className="text-lg font-bold text-[#6B2E1F]">શ્રી મહેંદી</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="બંધ કરો"><X size={24} /></button>
            </div>
            
            <nav className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  className={`py-3 text-base border-b border-[#D4AF37]/20 transition-all ${
                    activeSection === l.id && !isAdmin ? 'text-[#6B2E1F] font-bold border-l-4 border-l-[#D4AF37] pl-2' : 'text-[#4A2E22]'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer"
              className="mt-8 bg-[#25D366] text-white text-center py-3 rounded-full font-semibold shadow-md active:scale-95 transition">
              WhatsApp બુકિંગ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
