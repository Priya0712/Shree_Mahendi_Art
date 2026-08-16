import { useEffect, useState } from 'react';
import api from '../services/api';
import { Star } from 'lucide-react';
import FadeInSection from '../components/common/FadeInSection';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/testimonials')
      .then((res) => {
        setTestimonials(res.data.filter((t) => t.isApproved));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching testimonials:', err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-[#FFF8F0]/30 border-t border-[#D4AF37]/20 scroll-mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-2">ગ્રાહકોના અભિપ્રાય</h2>
        <p className="text-[#4A2E22] text-sm mt-2">અમારા સંતુષ્ટ ગ્રાહકો શું કહે છે</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <FadeInSection>
          {loading ? (
            <p className="text-center text-[#4A2E22] py-8">લોડ થઈ રહ્યું છે...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-[#4A2E22] py-8">હજુ સુધી કોઈ સમીક્ષા ઉપલબ્ધ નથી.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t._id} className="bg-white rounded-2xl shadow-sm p-5 border border-[#D4AF37]/10 hover:shadow-md transition duration-300">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4A2E22] mb-4 leading-relaxed">"{t.messageGujarati}"</p>
                  <p className="text-sm font-semibold text-[#6B2E1F]">— {t.customerName}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 bg-[#FFF3E0]/70 border border-[#D4AF37]/10 rounded-2xl p-6 max-w-xl mx-auto">
            <p className="text-[#6B2E1F] font-medium mb-3">તમે પણ અમારી સેવાનો અનુભવ કર્યો છે?</p>
            <a href="https://wa.me/918799008221?text=નમસ્તે,%20મારે%20મારો%20અનુભવ%20શેર%20કરવો%20છે"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#20ba59] active:scale-95 transition">
              <WhatsAppIcon /> તમારો અભિપ્રાય મોકલો
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Testimonials;
