import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#2B1810] text-[#FFF8F0] pt-10 pb-24 md:pb-10 px-4">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
      <div>
        <h3 className="text-xl font-bold text-[#D4AF37] mb-2">શ્રી મહેંદી</h3>
        <p className="text-sm text-[#D9C4B0]">બ્રાઇડલ મહેંદી, નેઇલ આર્ટ, વેક્સિંગ અને ખાટલી વર્ક નિષ્ણાત</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">ઝડપી લિંક</h4>
        <ul className="text-sm text-[#D9C4B0] space-y-1">
          <li><a href="/services">સેવાઓ</a></li>
          <li><a href="/gallery">ગેલેરી</a></li>
          <li><a href="/contact">સંપર્ક</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2">અમારો સંપર્ક કરો</h4>
        <div className="flex justify-center sm:justify-start gap-4 mt-2">
          <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle className="text-[#25D366]" />
          </a>
          <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram className="text-[#E1306C]" />
          </a>
        </div>
      </div>
    </div>

    <p className="text-center text-xs text-[#D9C4B0]/60 mt-8">© {new Date().getFullYear()} શ્રી મહેંદી. બધા હકો સુરક્ષિત.</p>
  </footer>
);

export default Footer;
