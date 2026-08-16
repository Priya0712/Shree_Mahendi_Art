import React from 'react';

export default function ManageTestimonials() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">સમીક્ષા મેનેજમેન્ટ</h1>
      <button className="btn-maroon mb-6">નવી સમીક્ષા ઉમેરો</button>
      <div className="bg-white p-6 rounded-xl border border-primary/10 text-center text-dark-light">
        કોઈ સમીક્ષા ઉપલબ્ધ નથી.
      </div>
    </div>
  );
}
