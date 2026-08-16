import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Star } from 'lucide-react';

const TestimonialsPreview = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get('/testimonials')
      .then((res) => setTestimonials(res.data.filter((t) => t.isApproved).slice(0, 6)))
      .catch((err) => console.error('Error fetching testimonials preview:', err.message));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">ગ્રાહકોના અભિપ્રાય</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
        {testimonials.map((t) => (
          <div key={t._id} className="snap-start shrink-0 w-72 bg-white rounded-2xl shadow-md p-5 border border-[#D4AF37]/10">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <p className="text-sm text-[#4A2E22] mb-4 min-h-[4rem]">"{t.messageGujarati}"</p>
            <p className="text-sm font-semibold text-[#6B2E1F]">— {t.customerName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsPreview;
