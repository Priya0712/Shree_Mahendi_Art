import { useState } from 'react';
import api from '../services/api';
import { MessageCircle, Instagram, Phone, CheckCircle2 } from 'lucide-react';
import FadeInSection from '../components/common/FadeInSection';

const servicesList = [
  'બ્રાઇડલ મહેંદી', 'પાર્ટી મહેંદી', 'આર્બિક મહેંદી', 'નેઇલ આર્ટ', 'вексિંગ (Waxing)', 'ખાટલી વર્ક', 'મહેંદી કોન', 'બીજું',
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', serviceInterested: '', eventDate: '', message: '' });
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
              <MessageCircle className="text-[#25D366]" size={24} />
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
              <p className="text-sm text-[#4A2E22] mb-5">અમે જલ્દી જ તમારો સંપર્ક કરીશું. ઝડપી જવાબ માટે WhatsApp પર પણ સંદેશો મોકલી શકો છો.</p>
              <a href={`https://wa.me/918799008221?text=${waMessage}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#20ba59] active:scale-95 transition shadow-sm">
                <MessageCircle size={16} /> WhatsApp પર પણ મોકલો
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
