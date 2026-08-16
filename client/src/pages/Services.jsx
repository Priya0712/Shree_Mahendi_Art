import { useEffect, useState } from 'react';
import api from '../services/api';
import { optimizedUrl } from '../utils/cloudinaryUrl';
import ServiceDetailModal from '../components/services/ServiceDetailModal';
import ConesSection from '../components/services/ConesSection';
import FadeInSection from '../components/common/FadeInSection';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/services')])
      .then(([cat, svc]) => {
        setCategories(cat.data);
        setServices(svc.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching services section data:', err.message);
        setLoading(false);
      });
  }, []);

  const isConeCategory = (c) => {
    return c?.nameEnglish?.toLowerCase().includes('cone') ||
           c?.nameGujarati?.includes('કોન') ||
           c?.slug?.toLowerCase().includes('cone');
  };

  const regularServices = services.filter((s) => !isConeCategory(s.category));
  const conesServices = services.filter((s) => isConeCategory(s.category));

  // Filter categories to show only non-cone categories in main filters
  const regularCategories = categories.filter((c) => !isConeCategory(c));

  const filtered = activeCategory === 'all'
    ? regularServices
    : regularServices.filter((s) => s.category?._id === activeCategory || s.category?.slug === activeCategory);

  return (
    <section id="services" className="py-16 bg-[#FFF8F0]/30 border-t border-[#D4AF37]/20 scroll-mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-2">અમારી સેવાઓ</h2>
        <p className="text-[#4A2E22] text-sm mt-2">બ્રાઇડલ મહેંદીથી લઈને નેઇલ આર્ટ સુધી — દરેક પ્રસંગ માટે</p>
      </div>

      {/* Sticky category chip bar */}
      <div className="sticky top-[64px] z-30 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#D4AF37]/10 py-3 mb-6">
        <div className="flex gap-2 overflow-x-auto px-4 max-w-6xl mx-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === 'all' ? 'bg-[#6B2E1F] text-white shadow-sm' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/30'
            }`}
          >
            બધું
          </button>
          {regularCategories.map((c) => (
            <button
              key={c._id}
              onClick={() => setActiveCategory(c._id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeCategory === c._id ? 'bg-[#6B2E1F] text-white shadow-sm' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/30'
              }`}
            >
              {c.nameGujarati}
            </button>
          ))}
        </div>
      </div>

      <FadeInSection>
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <ServiceGridSkeleton />
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#4A2E22] py-12">આ કેટેગરીમાં હાલમાં કોઈ સેવા ઉપલબ્ધ નથી.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <button
                  key={s._id}
                  id={s._id}
                  onClick={() => setSelectedService(s)}
                  className="text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md active:scale-95 transition focus:outline-none border border-[#D4AF37]/10"
                >
                  <div className="h-32 sm:h-40 overflow-hidden">
                    {s.image?.url && (
                      <img src={optimizedUrl(s.image.url, 400)} alt={s.titleGujarati}
                        className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-[#2B1810] truncate">{s.titleGujarati}</p>
                    {s.titleEnglish && <p className="text-[11px] text-[#8B6F5E]">{s.titleEnglish}</p>}
                    {s.priceNote && <p className="text-xs text-[#C1662F] mt-1 font-medium">{s.priceNote}</p>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </FadeInSection>

      {/* Mehendi Cones dedicated section */}
      {!loading && conesServices.length > 0 && (
        <FadeInSection>
          <div className="mt-12">
            <ConesSection cones={conesServices} />
          </div>
        </FadeInSection>
      )}

      {selectedService && (
        <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
};

const ServiceGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
        <div className="h-32 sm:h-40 bg-[#EFE3D3]" />
        <div className="p-3 space-y-2">
          <div className="h-3 bg-[#EFE3D3] rounded w-3/4" />
          <div className="h-3 bg-[#EFE3D3] rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default Services;
