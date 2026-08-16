import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { optimizedUrl } from '../../utils/cloudinaryUrl';

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const [touchStart, setTouchStart] = useState(null);
  const image = images[currentIndex];

  const goNext = () => onNavigate((currentIndex + 1) % images.length);
  const goPrev = () => onNavigate((currentIndex - 1 + images.length) % images.length);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    setTouchStart(null);
  };

  const waMessage = encodeURIComponent('નમસ્તે, મને આ ડિઝાઈન ગમી — શું આ ઉપલબ્ધ છે?');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white z-10" aria-label="બંધ કરો">
        <X size={28} />
      </button>

      <button onClick={goPrev} className="hidden sm:flex absolute left-4 text-white" aria-label="પાછળ">
        <ChevronLeft size={32} />
      </button>
      <button onClick={goNext} className="hidden sm:flex absolute right-4 text-white" aria-label="આગળ">
        <ChevronRight size={32} />
      </button>

      <div className="max-w-3xl w-full px-4">
        {image.image?.url && (
          <img src={optimizedUrl(image.image.url, 900)} alt={image.captionGujarati || 'મહેંદી ડિઝાઈન'}
            className="w-full max-h-[70vh] object-contain rounded-lg mx-auto" />
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          {image.captionGujarati && <p className="text-white text-sm text-center sm:text-left">{image.captionGujarati}</p>}
          <a href={`https://wa.me/918799008221?text=${waMessage}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold shrink-0 active:scale-95 transition">
            <MessageCircle size={16} /> આ ડિઝાઈન વિશે પૂછો
          </a>
        </div>
        <p className="text-center text-white/50 text-xs mt-3">{currentIndex + 1} / {images.length}</p>
      </div>
    </div>
  );
};

export default Lightbox;
