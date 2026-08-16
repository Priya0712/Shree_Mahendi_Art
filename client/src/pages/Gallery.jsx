import { useEffect, useState } from 'react';
import api from '../services/api';
import { optimizedUrl } from '../utils/cloudinaryUrl';
import Lightbox from '../components/gallery/Lightbox';
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
        console.error('Error loading gallery section data:', err.message);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((i) => i.category?._id === activeCategory || i.category?.slug === activeCategory);

  return (
    <section id="gallery" className="py-16 bg-[#FFF8F0]/20 border-t border-[#D4AF37]/20 scroll-mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#6B2E1F] inline-block border-b-2 border-[#D4AF37] pb-2">અમારી ગેલેરી</h2>
        <p className="text-[#4A2E22] text-sm mt-2">અમારા કામની ઝલક — દરેક ડિઝાઈન અનોખી છે</p>
      </div>

      {/* Sticky category chip bar */}
      <div className="sticky top-[64px] z-30 bg-[#FFF8F0]/95 backdrop-blur border-b border-[#D4AF37]/10 py-3 mb-6">
        <div className="flex gap-2 overflow-x-auto px-4 max-w-6xl mx-auto no-scrollbar">
          <button onClick={() => setActiveCategory('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeCategory === 'all' ? 'bg-[#6B2E1F] text-white shadow-sm' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/30'
            }`}>
            બધું
          </button>
          {categories.map((c) => (
            <button key={c._id} onClick={() => setActiveCategory(c._id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeCategory === c._id ? 'bg-[#6B2E1F] text-white shadow-sm' : 'bg-white text-[#4A2E22] border border-[#D4AF37]/30'
              }`}>
              {c.nameGujarati}
            </button>
          ))}
        </div>
      </div>

      <FadeInSection>
        <div className="max-w-6xl mx-auto px-4">
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
                  className="mb-3 w-full block rounded-xl overflow-hidden shadow-sm hover:shadow-md active:scale-95 transition break-inside-avoid focus:outline-none border border-[#D4AF37]/10"
                >
                  {img.image?.url && (
                    <img src={optimizedUrl(img.image.url, 400)} alt={img.captionGujarati || 'મહેંદી ડિઝાઈન'}
                      className="w-full h-auto object-cover" loading="lazy" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </FadeInSection>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
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
