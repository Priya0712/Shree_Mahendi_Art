import { useState } from 'react';
import api from '../services/api';
import { Instagram, Phone, CheckCircle2 } from 'lucide-react';
import FadeInSection from '../components/common/FadeInSection';

const servicesList = [
  'બ્રાઇડલ મહેંદી', 'પાર્ટી મહેંદી', 'આર્બિક મહેંદી', 'દરેક પ્રકારની મહેંદી', 'નેઇલ આર્ટ', 'વેક્સિંગ', 'ખાટલી વર્ક', 'મહેંદી કોન', 'બીજું',
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
              <svg viewBox="0 0 448 512" width="26" height="26" fill="#25D366">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
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
                <svg viewBox="0 0 448 512" width="16" height="16" fill="white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
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
