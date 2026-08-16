import React from 'react';

export default function ManageServices() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">સેવા મેનેજમેન્ટ</h1>
      <button className="btn-maroon mb-6">નવી સેવા ઉમેરો</button>
      <div className="bg-white p-6 rounded-xl border border-primary/10 text-center text-dark-light">
        કોઈ સેવા ઉપલબ્ધ નથી.
      </div>
    </div>
  );
}
