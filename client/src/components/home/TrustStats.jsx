import { useEffect, useState, useRef } from 'react';

const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return [count, ref];
};

const stats = [
  { end: 500, suffix: '+', label: 'ડિઝાઈન' },
  { end: 300, suffix: '+', label: 'ખુશ ગ્રાહકો' },
  { end: 5, suffix: '+', label: 'વર્ષોનો અનુભવ' },
];

const TrustStats = () => (
  <section className="bg-[#6B2E1F] py-8">
    <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
      {stats.map((s) => {
        const [count, ref] = useCountUp(s.end);
        return (
          <div key={s.label} ref={ref}>
            <p className="text-2xl sm:text-4xl font-bold text-[#D4AF37]">{count}{s.suffix}</p>
            <p className="text-white text-xs sm:text-sm mt-1">{s.label}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default TrustStats;
