import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const GalleryPreview = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/gallery?featured=true')
      .then((res) => setImages(res.data.slice(0, 8)))
      .catch((err) => console.error('Error fetching gallery preview:', err.message));
  }, []);

  return (
    <section className="bg-[#FFF3E0] py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">અમારી ગેલેરી</h2>
          <p className="text-[#4A2E22] text-sm mt-2">અમારા તાજેતરના કામની ઝલક</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {images.map((img) => (
            <div key={img._id} className="aspect-square rounded-xl overflow-hidden shadow-sm bg-white">
              {img.image?.url && (
                <img src={optimizedUrl(img.image.url, 400)} alt={img.captionGujarati || 'મહેંદી ડિઝાઈન'}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300" loading="lazy" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/gallery" className="inline-block bg-[#6B2E1F] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#5C271A] transition">
            પૂરી ગેલેરી જુઓ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
