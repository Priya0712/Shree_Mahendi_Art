import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="ornate-card bg-white max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">એડમિન લૉગિન</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">યુઝરનેમ</label>
            <input type="text" className="w-full border border-primary/20 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">પાસવર્ડ</label>
            <input type="password" className="w-full border border-primary/20 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>
          <button className="btn-maroon w-full py-3 mt-2">લૉગિન કરો</button>
        </form>
      </div>
    </div>
  );
}
