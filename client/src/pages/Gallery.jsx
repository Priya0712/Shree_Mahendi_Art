import React from 'react';

export default function Gallery() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 text-center">અમારી ગેલેરી</h1>
      <p className="text-center text-dark-light mb-8">અમારી લેટેસ્ટ ડિઝાઇનો અને વર્ક પોર્ટફોલિયો જુઓ.</p>
      
      {/* Category filter placeholder */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['બધા', 'મહેંદી', 'નેઇલ આર્ટ', 'ખાટલી વર્ક', 'વેક્સિંગ'].map((cat, idx) => (
          <button 
            key={idx} 
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors ${
              idx === 0 ? 'bg-primary text-cream' : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Placeholder images grid */}
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="aspect-square bg-white border border-primary/10 rounded-xl overflow-hidden shadow-sm flex items-center justify-center text-primary/40 font-bold">
            ફોટો {num}
          </div>
        ))}
      </div>
    </div>
  );
}
