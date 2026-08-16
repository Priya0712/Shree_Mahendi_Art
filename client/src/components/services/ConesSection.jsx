import { MessageCircle } from 'lucide-react';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const ConesSection = ({ cones }) => {
  if (!cones?.length) return null;

  return (
    <section className="bg-[#FFF3E0] py-10 mt-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#6B2E1F]">મહેંદી કોન</h2>
          <p className="text-[#4A2E22] text-sm mt-1">ઘરે વાપરવા માટે ઉચ્ચ ગુણવત્તાવાળા મહેંદી કોન</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cones.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl p-3 shadow-sm text-center">
              {c.image?.url && (
                <img src={optimizedUrl(c.image.url, 300)} alt={c.titleGujarati} className="w-full h-24 object-cover rounded-xl mb-2" loading="lazy" />
              )}
              <p className="text-sm font-medium">{c.titleGujarati}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="https://wa.me/918799008221?text=નમસ્તે,%20મારે%20મહેંદી%20કોન%20ઓર્ડર%20કરવા%20છે"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold text-sm">
            <MessageCircle size={16} /> ઓર્ડર માટે WhatsApp કરો
          </a>
        </div>
      </div>
    </section>
  );
};

export default ConesSection;
