import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'હોમ', path: '/' },
    { name: 'અમારા વિશે', path: '/about' },
    { name: 'સેવાઓ', path: '/services' },
    { name: 'ગેલેરી', path: '/gallery' },
    { name: 'સમીક્ષાઓ', path: '/testimonials' },
    { name: 'સંપર્ક', path: '/contact' }
  ];

  return (
    <nav className="bg-primary text-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-1.5">
            <span className="font-heading text-2xl md:text-3xl font-bold text-accent tracking-wide hover:text-accent-light transition-colors">
              શ્રી મહેંદી
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold transition-colors py-1 ${
                    isActive ? 'text-accent border-b-2 border-accent' : 'text-cream/90 hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream hover:text-accent focus:outline-none p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark border-t border-primary/20">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-semibold ${
                    isActive ? 'bg-primary text-accent' : 'text-cream/95 hover:bg-primary/50 hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
