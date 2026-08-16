import { Instagram, Award, Heart, Sparkles } from 'lucide-react';

const highlights = [
  { icon: Award, title: '૫+ વર્ષનો અનુભવ', desc: 'બ્રાઇડલ અને પાર્ટી મહેંદીમાં નિપુણતા' },
  { icon: Heart, title: '૩૦૦+ ગ્રાહકો', desc: 'દરેક ડિઝાઈનમાં વ્યક્તિગત ધ્યાન' },
  { icon: Sparkles, title: 'બધા પ્રકારની સેવા', desc: 'મહેંદી, નેઇલ આર્ટ, વેક્સિંગ, ખાટલી વર્ક' },
];

/* Official WhatsApp brand SVG */
const WhatsAppIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 448 512" width={size} height={size} fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

const About = () => (
  <section id="about" className="py-16 bg-gradient-to-b from-[#FFF8F0] to-white border-t border-[#D4AF37]/20 scroll-mt-16">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-2">અમારા વિશે</h2>
      <p className="text-[#4A2E22] text-sm mt-2">શ્રી મહેંદી પાછળની વાર્તા</p>
    </div>

    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
        <img src="/images/owner-portrait.jpg" alt="શ્રી મહેંદી - કલાકાર"
          className="w-full md:w-72 h-64 md:h-80 object-cover rounded-3xl shadow-lg border-2 border-[#D4AF37]/30" loading="lazy" />
        <div>
          <h2 className="text-xl font-bold text-[#6B2E1F] mb-3">નમસ્તે, હું છું શ્રી મહેંદીની કલાકાર!</h2>
          <p className="text-[#4A2E22] text-sm leading-relaxed mb-3">
            વર્ષોના અનુભવ સાથે, હું દરેક ગ્રાહકને તેમના ખાસ પ્રસંગ માટે સુંદર અને અનોખી મહેંદી ડિઝાઈન બનાવી આપું છું.
            બ્રાઇડલ મહેંદીથી લઈને રોજિંદા નેઇલ આર્ટ સુધી, દરેક કામમાં પ્રેમ અને ચોકસાઈથી ધ્યાન આપવામાં આવે છે.
          </p>
          <p className="text-[#4A2E22] text-sm leading-relaxed">
            મહેંદી ઉપરાંત, અમે વેક્સિંગ અને પરંપરાગત ખાટલી વર્ક (બીડ અને મિરર એમ્બ્રોઇડરી) પણ કરીએ છીએ —
            જેથી તમારે અલગ-અલગ જગ્યાએ જવાની જરૂર ન પડે.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {highlights.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-[#FFF3E0]/70 rounded-2xl p-5 text-center border border-[#D4AF37]/10">
            <Icon className="mx-auto text-[#C1662F] mb-2" size={28} />
            <p className="font-semibold text-[#6B2E1F] text-sm">{title}</p>
            <p className="text-xs text-[#4A2E22] mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#6B2E1F] rounded-3xl p-6 sm:p-8 text-center shadow-md">
        <p className="text-white text-base sm:text-lg font-medium mb-4">
          અમારું કામ Instagram પર જુઓ અથવા સીધા WhatsApp પર વાત કરો
        </p>
        <div className="flex justify-center gap-3">
          <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white text-[#6B2E1F] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#FFF8F0] active:scale-95 transition">
            <Instagram size={16} /> Instagram
          </a>
          <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#20ba5a] active:scale-95 transition">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default About;
