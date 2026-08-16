import React from 'react';

export default function Home() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">શ્રી મહેંદી અને નેઇલ આર્ટ</h1>
      <p className="text-lg md:text-xl text-dark-light mb-8 max-w-2xl mx-auto">
        તમારા ખાસ દિવસો માટે સુંદર મહેંદી, સ્ટાઇલિશ નેઇલ આર્ટ, વેક્સિંગ અને ટ્રેડિશનલ ખાટલી વર્ક સેવાઓ.
      </p>
      <div className="flex justify-center gap-4">
        <button className="btn-gold">બુકિંગ કરો</button>
        <button className="btn-outline">સેવાઓ જુઓ</button>
      </div>
    </div>
  );
}
