import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';
import api from '../../services/api';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const InstagramSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('/gallery?featured=true')
      .then((res) => setImages(res.data.slice(0, 6)))
      .catch((err) => console.error('Error fetching Instagram preview:', err.message));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-6">
        <Instagram className="mx-auto text-[#E1306C] mb-2" size={28} />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">અમને Instagram પર ફોલો કરો</h2>
        <p className="text-[#4A2E22] text-sm mt-2">@pili_mahendi_nail_art_007</p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-6">
        {images.map((img) => (
          <a key={img._id} href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer"
            className="aspect-square overflow-hidden rounded-lg relative group">
            {img.image?.url && (
              <img src={optimizedUrl(img.image.url, 300)} alt="" className="w-full h-full object-cover" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
              <Instagram className="text-white opacity-0 group-hover:opacity-100 transition" size={20} />
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <a href="https://www.instagram.com/pili_mahendi_nail_art_007" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 border-2 border-[#E1306C] text-[#E1306C] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#E1306C] hover:text-white transition">
          <Instagram size={16} /> Instagram પર જુઓ
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
