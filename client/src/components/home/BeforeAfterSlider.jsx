import { useState, useRef } from 'react';

// mehendiImg = left side (full, no crop)
// plainImg   = right side (plain hand)
const BeforeAfterSlider = ({ mehendiImg, plainImg }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">પરિવર્તન જુઓ</h2>
        <p className="text-[#4A2E22] text-sm mt-2">
          સ્લાઈડ કરીને જુઓ — ડાબી બાજુ મહેંદી, જમણી બાજુ ખાલી હાથ
        </p>
      </div>

      {/*
        The container uses a tall aspect ratio (3:4) to naturally fit the portrait
        mehendi photo. Both images use object-contain so NOTHING is cropped.
      */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden select-none touch-none shadow-xl bg-[#FFF8F0] cursor-ew-resize"
        style={{ aspectRatio: '3 / 4' }}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onTouchStart={() => { isDragging.current = true; }}
        onTouchEnd={() => { isDragging.current = false; }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* RIGHT base: plain empty hand — full, no crop */}
        <img
          src={plainImg}
          alt="ખાલી હાથ"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* LEFT overlay: full mehendi photo clipped to slider position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={mehendiImg}
            alt="બ્રાઇડલ મહેંદી"
            className="absolute inset-0 h-full object-contain bg-[#FFF8F0]"
            style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          />
        </div>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 shadow-lg pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-[#6B2E1F] font-bold text-sm border-2 border-[#D4AF37]/40">
            ⇔
          </div>
        </div>

        {/* Corner labels */}
        <span className="absolute bottom-3 left-3 bg-[#6B2E1F]/80 text-white text-xs px-3 py-1 rounded-full font-semibold pointer-events-none">
          🌿 મહેંદી
        </span>
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-semibold pointer-events-none">
          ✋ ખાલી હાથ
        </span>
      </div>

      {/* Range slider — accessible and mobile-friendly */}
      <input
        type="range" min="0" max="100" value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4 accent-[#6B2E1F]"
        aria-label="સ્લાઈડ કરો"
      />
    </section>
  );
};

export default BeforeAfterSlider;
