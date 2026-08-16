import { useEffect, useState } from 'react';
import api from '../services/api';
import { Star, MessageCircle } from 'lucide-react';
import FadeInSection from '../components/common/FadeInSection';

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
              <MessageCircle size={16} /> તમારો અભિપ્રાય મોકલો
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Testimonials;
