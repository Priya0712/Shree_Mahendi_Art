import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/918799008221?text=નમસ્તે%2C%20મારે%20મહેંદી%20બુકિંગ%20વિશે%20જાણવું%20છે"
    target="_blank" rel="noreferrer"
    className="fixed bottom-5 right-4 z-40 bg-[#25D366] w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition"
    aria-label="WhatsApp પર સંપર્ક કરો"
  >
    <MessageCircle size={28} color="white" fill="white" />
  </a>
);

export default WhatsAppFloat;
