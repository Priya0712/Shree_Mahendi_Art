import { X, MessageCircle } from 'lucide-react';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const ServiceDetailModal = ({ service, onClose }) => {
  const waMessage = encodeURIComponent(`નમસ્તે, મારે "${service.titleGujarati}" વિશે જાણવું છે.`);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {service.image?.url && (
            <img src={optimizedUrl(service.image.url, 700)} alt={service.titleGujarati}
              className="w-full h-56 sm:h-64 object-cover" />
          )}
          <button onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 rounded-full p-2" aria-label="બંધ કરો">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-[#6B2E1F]">{service.titleGujarati}</h2>
          {service.titleEnglish && <p className="text-sm text-[#8B6F5E] mb-2">{service.titleEnglish}</p>}
          <p className="text-[#4A2E22] text-sm leading-relaxed mt-2">{service.descriptionGujarati}</p>

          <a
            href={`https://wa.me/918799008221?text=${waMessage}`}
            target="_blank" rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-full font-semibold"
          >
            <MessageCircle size={18} /> આ ડિઝાઈન બુક કરો
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
