import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const ServicesPreview = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services?featured=true')
      .then((res) => setServices(res.data.slice(0, 6)))
      .catch((err) => console.error('Error fetching services preview:', err.message));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">અમારી સેવાઓ</h2>
        <p className="text-[#4A2E22] text-sm mt-2">દરેક પ્રસંગ માટે ખાસ ડિઝાઈન</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {services.map((s) => (
          <Link key={s._id} to={`/services#${s._id}`}
            className="group rounded-2xl overflow-hidden shadow-md bg-white active:scale-95 transition">
            <div className="relative h-32 sm:h-40 overflow-hidden">
              {s.image?.url && (
                <img src={optimizedUrl(s.image.url, 400)} alt={s.titleGujarati}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm text-[#2B1810] truncate">{s.titleGujarati}</p>
              {s.priceNote && <p className="text-xs text-[#C1662F] mt-1">{s.priceNote}</p>}
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/services" className="inline-block border-2 border-[#6B2E1F] text-[#6B2E1F] px-6 py-2.5 rounded-full font-semibold text-sm">
          બધી સેવાઓ જુઓ
        </Link>
      </div>
    </section>
  );
};

export default ServicesPreview;
