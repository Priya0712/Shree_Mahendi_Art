import { useEffect, useState } from 'react';
import api from '../services/api';
import { optimizedUrl } from '../utils/cloudinaryUrl';
import PageHeader from '../components/common/PageHeader';
import Lightbox from '../components/gallery/Lightbox';
import SEO from '../components/common/SEO';
import QuickBookBar from '../components/common/QuickBookBar';
import FadeInSection from '../components/common/FadeInSection';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/gallery')])
      .then(([cat, img]) => {
        setCategories(cat.data);
        setImages(img.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading gallery page data:', err.message);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((i) => i.category?._id === activeCategory || i.category?.slug === activeCategory);

  return (
    <>
      <SEO title="ગેલેરી" description="અમારા મહેંદી અને નેઇલ આર્ટ ડિઝાઈનની ફોટો ગેલેરી જુઓ." />
      <PageHeader title="અમારી ગેલેરી" subtitle="અમારા કામની ઝલક — દરેક ડિઝાઈન અનોખી છે" />

      <div className="sticky top-[57px] z-30 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#D4AF37]/20 py-3">
        <div className="flex gap-2 overflow-x-auto px-4 max-w-6xl mx-auto no-scrollbar">
          <button onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === 'all' ? 'bg-[#6B2E1F] text-white' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/40'
            }`}>
            બધું
          </button>
          {categories.map((c) => (
            <button key={c._id} onClick={() => setActiveCategory(c._id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeCategory === c._id ? 'bg-[#6B2E1F] text-white' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/40'
              }`}>
              {c.nameGujarati}
            </button>
          ))}
        </div>
      </div>

      <FadeInSection>
        <section className="max-w-6xl mx-auto px-4 py-8">
          {loading ? (
            <GallerySkeleton />
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#4A2E22] py-12">આ કેટેગરીમાં હાલમાં કોઈ ફોટો ઉપલબ્ધ નથી.</p>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {filtered.map((img, idx) => (
              <button
                key={img._id}
                onClick={() => setLightboxIndex(idx)}
                className="mb-3 w-full block rounded-xl overflow-hidden active:scale-95 transition break-inside-avoid focus:outline-none"
              >
                {img.image?.url && (
                  <img
                    src={optimizedUrl(img.image.url, 500)}
                    alt={img.captionGujarati || 'મહેંદી ડિઝાઈન'}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        )}
        </section>
      </FadeInSection>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
      <QuickBookBar />
    </>
  );
};

const GallerySkeleton = () => (
  <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="mb-3 h-40 bg-[#EFE3D3] rounded-xl animate-pulse break-inside-avoid" />
    ))}
  </div>
);

export default Gallery;
