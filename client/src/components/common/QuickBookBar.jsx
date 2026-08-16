import { MessageCircle } from 'lucide-react';

const QuickBookBar = () => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#D4AF37]/30 p-3 flex gap-2 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
    <a href="tel:8799008221" className="flex-1 text-center border-2 border-[#6B2E1F] text-[#6B2E1F] rounded-full py-2.5 text-sm font-semibold active:scale-95 transition">
      કૉલ કરો
    </a>
    <a href="https://wa.me/918799008221?text=નમસ્તે%2C%20મારે%20મહેંદી%20બુકિંગ%20વિશે%20જાણવું%20છે" target="_blank" rel="noreferrer"
      className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white rounded-full py-2.5 text-sm font-semibold active:scale-95 transition">
      <MessageCircle size={16} /> બુક કરો
    </a>
  </div>
);

export default QuickBookBar;
