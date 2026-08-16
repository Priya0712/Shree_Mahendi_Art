import { useState, useRef } from 'react';

const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

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
        <p className="text-[#4A2E22] text-sm mt-2">ખાલી હાથથી સુંદર બ્રાઇડલ મહેંદી સુધી — સ્લાઈડ કરીને જુઓ</p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden select-none touch-none shadow-lg"
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      >
        <img src={afterImg} alt="બ્રાઇડલ મહેંદી - પછી" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={beforeImg} alt="ખાલી હાથ - પહેલા" className="w-full h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth || '100%' }} />
        </div>

        <div className="absolute top-0 bottom-0 w-1 bg-white shadow" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-[#6B2E1F] text-xs font-bold cursor-ew-resize">
            ⇔
          </div>
        </div>

        <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">પહેલા</span>
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">પછી</span>
      </div>

      <input
        type="range" min="0" max="100" value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4 accent-[#6B2E1F]"
        aria-label="પહેલા અને પછીની સરખામણી સ્લાઈડર"
      />
    </section>
  );
};

export default BeforeAfterSlider;
