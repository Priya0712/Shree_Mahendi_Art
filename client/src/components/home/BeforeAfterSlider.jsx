import { useState, useRef } from 'react';

// Props:
//   mehendiImg  = the mehendi photo (shown on LEFT, slides away)
//   plainImg    = the plain/empty hand (shown on RIGHT, revealed)
const BeforeAfterSlider = ({ mehendiImg, plainImg }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">પરિવર્તન જુઓ</h2>
        <p className="text-[#4A2E22] text-sm mt-2">
          સ્લાઈડ કરીને જુઓ — ડાબી બાજુ મહેંદી, જમણી બાજુ ખાલી હાથ
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden select-none touch-none shadow-lg cursor-ew-resize"
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onTouchStart={() => { isDragging.current = true; }}
        onTouchEnd={() => { isDragging.current = false; }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* RIGHT base — plain empty hand (always full width behind) */}
        <img
          src={plainImg}
          alt="ખાલી હાથ"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* LEFT overlay — mehendi photo (clipped to left of slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={mehendiImg}
            alt="મહેંદી"
            className="h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-[#6B2E1F] font-bold text-sm select-none pointer-events-none border-2 border-[#D4AF37]/30">
            ⇔
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 bg-[#6B2E1F]/80 text-white text-xs px-3 py-1 rounded-full font-semibold">
          🌿 મહેંદી
        </span>
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-semibold">
          ✋ ખાલી હાથ
        </span>
      </div>

      {/* Range slider for accessibility & mobile */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4 accent-[#6B2E1F]"
        aria-label="મહેંદી અને ખાલી હાથ સ્લાઈડર"
      />
    </section>
  );
};

export default BeforeAfterSlider;
