import { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ mehendiImg, plainImg }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth);
    const ro = new ResizeObserver(() => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 md:py-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6B2E1F]">પરિવર્તન જુઓ</h2>
        <p className="text-[#4A2E22] text-sm mt-2">
          સ્લાઈડ કરીને જુઓ — ડાબી બાજુ મહેંદી, જમણી બાજુ ખાલી હાથ
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden select-none touch-none shadow-xl cursor-ew-resize"
        style={{ aspectRatio: '3 / 2' }}
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onTouchStart={() => { isDragging.current = true; }}
        onTouchEnd={() => { isDragging.current = false; }}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* RIGHT base: plain empty hand — fills full container, no letterbox */}
        <img
          src={plainImg}
          alt="ખાલી હાથ"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* LEFT overlay: mehendi photo — clips to slider position
            The image is always full container width so it looks like a "window" 
            revealing left-to-right. object-position: top keeps hands in view */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={mehendiImg}
            alt="બ્રાઇડલ મહેંદી"
            className="absolute top-0 left-0 h-full object-cover object-[center_30%]"
            style={{ width: containerWidth > 0 ? `${containerWidth}px` : '100%' }}
          />
        </div>

        {/* Divider line + drag handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center text-[#6B2E1F] font-bold border-2 border-[#D4AF37]/40">
            ⇔
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 bg-[#6B2E1F]/80 text-white text-xs px-3 py-1.5 rounded-full font-semibold pointer-events-none shadow">
          🌿 મહેંદી
        </span>
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full font-semibold pointer-events-none shadow">
          ✋ ખાલી હાથ
        </span>
      </div>

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
