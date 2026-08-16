import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Convert Western digits to Gujarati digits for authenticity (e.g. 2026 -> ૨૦૨૬)
  const toGujaratiDigits = (num) => {
    const gujaratiDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
    return num.toString().split('').map(digit => gujaratiDigits[parseInt(digit)] || digit).join('');
  };

  const gujaratiYear = toGujaratiDigits(currentYear);

  return (
    <footer className="bg-dark text-cream border-t border-primary/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-accent">શ્રી મહેંદી</h3>
            <p className="text-sm text-cream/70 leading-relaxed max-w-xs">
              તમારા દરેક તહેવાર, લગ્ન અને ખાસ પળો માટે સુંદર અને આકર્ષક ડિઝાઇન્સ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-accent">ઝડપી લિંક્સ</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-cream/80">
              <Link to="/" className="hover:text-accent transition-colors">હોમ</Link>
              <Link to="/about" className="hover:text-accent transition-colors">અમારા વિશે</Link>
              <Link to="/services" className="hover:text-accent transition-colors">સેવાઓ</Link>
              <Link to="/gallery" className="hover:text-accent transition-colors">ગેલેરી</Link>
              <Link to="/testimonials" className="hover:text-accent transition-colors">સમીક્ષાઓ</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">સંપર્ક</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-base font-semibold text-accent font-heading">સંપર્ક કરો</h4>
            <ul className="text-sm text-cream/80 space-y-2">
              <li>મોબાઈલ: <a href="https://wa.me/918799008221" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">8799008221</a></li>
              <li>ઇન્સ્ટાગ્રામ: <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">@pili_mahendi_nail_art_007</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 mt-8 pt-6 text-center text-xs text-cream/60">
          <p>&copy; {gujaratiYear} શ્રી મહેંદી અને નેઇલ આર્ટ. સર્વાધિકાર સુરક્ષિત.</p>
        </div>
      </div>
    </footer>
  );
}
