import PageHeader from '../components/common/PageHeader';
import { Instagram, MessageCircle, Award, Heart, Sparkles } from 'lucide-react';

const highlights = [
  { icon: Award, title: '૫+ વર્ષનો અનુભવ', desc: 'બ્રાઇડલ અને પાર્ટી મહેંદીમાં નિપુણતા' },
  { icon: Heart, title: '૩૦ઓવર ગ્રાહકો', desc: 'દરેક ડિઝાઈનમાં વ્યક્તિગત ધ્યાન' },
  { icon: Sparkles, title: 'બધા પ્રકારની સેવા', desc: 'મહેંદી, નેઇલ આર્ટ, વેક્સિંગ, ખાટલી વર્ક' },
];

const About = () => (
  <>
    <PageHeader title="અમારા વિશે" subtitle="શ્રી મહેંદી પાછળની વાર્તા" />

    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
        <img src="/images/owner-portrait.jpg" alt="શ્રી મહેંદી - કલાકાર"
          className="w-full md:w-72 h-64 md:h-80 object-cover rounded-3xl shadow-lg" loading="lazy" />
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
          <div key={title} className="bg-[#FFF3E0] rounded-2xl p-5 text-center">
            <Icon className="mx-auto text-[#C1662F] mb-2" size={28} />
            <p className="font-semibold text-[#6B2E1F] text-sm">{title}</p>
            <p className="text-xs text-[#4A2E22] mt-1">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#6B2E1F] rounded-3xl p-6 sm:p-8 text-center">
        <p className="text-white text-base sm:text-lg font-medium mb-4">
          અમારું કામ Instagram પર જુઓ અથવા સીધા WhatsApp પર વાત કરો
        </p>
        <div className="flex justify-center gap-3">
          <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white text-[#6B2E1F] px-5 py-2.5 rounded-full font-semibold text-sm">
            <Instagram size={16} /> Instagram
          </a>
          <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-sm">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </>
);

export default About;
