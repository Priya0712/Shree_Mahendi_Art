import { useState } from 'react';
import api from '../services/api';
import { Instagram, Phone, CheckCircle2 } from 'lucide-react';
import FadeInSection from '../components/common/FadeInSection';

const servicesList = [
  'બ્રાઇડલ મહેંદી', 'પાર્ટી મહેંદી', 'આર્બિક મહેંદી', 'નેઇલ આર્ટ', 'વેક્સિંગ', 'ખાટલી વર્ક', 'મહેંદી કોન', 'બીજું',
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', serviceInterested: '', eventDate: '', message: '', peopleCount: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      setSubmitted(true);
      
      const formattedDate = form.eventDate ? new Date(form.eventDate).toLocaleDateString('gu-IN') : 'નથી જણાવી';
      
      // Detailed and formatted WhatsApp message
      const waText = `*નવું મહેંદી બુકિંગ* 🌸\n--------------------\n👤 *નામ:* ${form.name}\n📞 *મોબાઈલ:* ${form.phone}\n✨ *સેવા:* ${form.serviceInterested || 'નથી પસંદ કરી'}\n📅 *તારીખ:* ${formattedDate}\n👥 *લોકોની સંખ્યા:* ${form.peopleCount || 'નથી જણાવી'}\n💬 *સંદેશો:* ${form.message || 'નથી'}`;
      
      const waUrl = `https://wa.me/918799008221?text=${encodeURIComponent(waText)}`;
      // Redirect seamlessly on mobile
      window.location.href = waUrl;
    } catch (err) {
      console.error('Error submitting inquiry form:', err.message);
      setError('કંઈક ખોટું થયું, કૃપા કરી ફરીથી પ્રયત્ન કરો અથવા WhatsApp પર સંપર્ક કરો.');
    } finally {
      setLoading(false);
    }
  };

  const waMessage = encodeURIComponent(
    `નમસ્તે, મારું નામ ${form.name || '___'} છે. મારે ${form.serviceInterested || 'મહેંદી સેવા'} વિશે જાણવું છે.`
  );

  return (
    <section id="contact" className="py-16 bg-[#FFF8F0]/30 border-t border-[#D4AF37]/20 scroll-mt-16 pb-24 md:pb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-2">સંપર્ક કરો</h2>
        <p className="text-[#4A2E22] text-sm mt-2">બુકિંગ માટે ફોર્મ ભરો અથવા સીધા WhatsApp કરો</p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <FadeInSection>
          {/* Quick contact cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <a href="https://wa.me/918799008221" target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl py-5 hover:bg-[#25D366]/20 transition duration-300">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="#25D366">
                <path d="M12.031 2C6.479 2 2 6.48 2 12.03c0 1.91.53 3.69 1.44 5.21L2 22l4.9-1.39c1.47.8 3.14 1.25 4.93 1.25 5.56 0 10.04-4.48 10.04-10.03C21.87 6.5 17.59 2 12.03 2zm4.58 13.9c-.27.8-1.57 1.47-2.18 1.54-.53.07-1.22.1-3.5-1.12-2.92-1.56-4.81-4.52-4.96-4.71-.14-.2-1.25-1.66-1.25-3.17s.78-2.27 1.05-2.54c.27-.27.6-.34.8-.34.2 0 .4.01.57.01.2 0 .44-.07.7.55.27.63.92 2.27 1 2.45.1.18.17.4.03.67-.14.27-.3.44-.54.73-.24.3-.5.67-.72.9-.24.25-.5.53-.2.98.27.46 1.22 2.01 2.62 3.26 1.8 1.6 3.32 2.1 3.79 2.3.47.2.74.17.92-.02.26-.27 1.09-1.28 1.39-1.72.3-.44.6-.37.94-.24.34.14 2.16 1 2.53 1.2.37.18.6.27.7.46.09.2.09 1.15-.18 1.95z" />
              </svg>
              <span className="text-sm font-semibold text-[#1A6B3E]">WhatsApp</span>
            </a>
            <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer"
              className="flex flex-col items-center gap-2 bg-[#E1306C]/10 border border-[#E1306C]/30 rounded-2xl py-5 hover:bg-[#E1306C]/20 transition duration-300">
              <Instagram className="text-[#E1306C]" size={24} />
              <span className="text-sm font-semibold text-[#B02358]">Instagram</span>
            </a>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#D4AF37]/10">
              <CheckCircle2 className="mx-auto text-green-600 mb-3" size={40} />
              <h3 className="font-bold text-[#6B2E1F] mb-2">તમારી વિનંતી મળી ગઈ છે!</h3>
              <p className="text-sm text-[#4A2E22] mb-5">અમે જલ્દી જ તમારો સંપર્ક કરીશું. જો રીડાયરેક્ટ ન થયું હોય તો નીચેના બટન પર ક્લિક કરો.</p>
              <a href={`https://wa.me/918799008221?text=${waMessage}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#20ba59] active:scale-95 transition shadow-sm">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                  <path d="M12.031 2C6.479 2 2 6.48 2 12.03c0 1.91.53 3.69 1.44 5.21L2 22l4.9-1.39c1.47.8 3.14 1.25 4.93 1.25 5.56 0 10.04-4.48 10.04-10.03C21.87 6.5 17.59 2 12.03 2zm4.58 13.9c-.27.8-1.57 1.47-2.18 1.54-.53.07-1.22.1-3.5-1.12-2.92-1.56-4.81-4.52-4.96-4.71-.14-.2-1.25-1.66-1.25-3.17s.78-2.27 1.05-2.54c.27-.27.6-.34.8-.34.2 0 .4.01.57.01.2 0 .44-.07.7.55.27.63.92 2.27 1 2.45.1.18.17.4.03.67-.14.27-.3.44-.54.73-.24.3-.5.67-.72.9-.24.25-.5.53-.2.98.27.46 1.22 2.01 2.62 3.26 1.8 1.6 3.32 2.1 3.79 2.3.47.2.74.17.92-.02.26-.27 1.09-1.28 1.39-1.72.3-.44.6-.37.94-.24.34.14 2.16 1 2.53 1.2.37.18.6.27.7.46.09.2.09 1.15-.18 1.95z" />
                </svg>
                WhatsApp પર મોકલો
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 space-y-4 border border-[#D4AF37]/10">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">તમારું નામ *</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" placeholder="દા.ત. પ્રિયા પટેલ" />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">મોબાઈલ નંબર *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" placeholder="9876543210" />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">કઈ સેવા જોઈએ છે?</label>
                <select name="serviceInterested" value={form.serviceInterested} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]">
                  <option value="">પસંદ કરો</option>
                  {servicesList.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">કેટલા લોકો માટે? *</label>
                <input name="peopleCount" value={form.peopleCount} onChange={handleChange} required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" placeholder="દા.ત. 1, 5, 10..." />
                <p className="text-[11px] text-[#8B6F5E] mt-1 leading-normal">
                  જો અલગ અલગ કેટેગરીના લોકો હોય (દા.ત. બ્રાઇડલ + ગેસ્ટ), તો તેની વિગત 'સંદેશો'માં લખો.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">પ્રસંગની તારીખ</label>
                <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" />
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2E22] block mb-1">સંદેશો</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" placeholder="વધુ વિગત લખો (ઓપ્શનલ)" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#6B2E1F] text-white rounded-full py-3.5 font-semibold hover:bg-[#5a271a] transition active:scale-95 shadow-sm">
                {loading ? 'મોકલી રહ્યા છીએ...' : 'બુકિંગ વિનંતી મોકલો'}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-[#4A2E22]">
            <Phone size={16} /> <span>8799008221</span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
