import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">એડમિન ડેશબોર્ડ</h1>
      <p className="text-dark-light">શ્રી મહેંદી વેબસાઇટના મેનેજમેન્ટ પોર્ટલમાં આપનું સ્વાગત છે.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h3 className="text-sm font-semibold text-dark-light">કુલ ગેલેરી ફોટો</h3>
          <p className="text-3xl font-bold text-primary mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h3 className="text-sm font-semibold text-dark-light">સેવાઓ</h3>
          <p className="text-3xl font-bold text-primary mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h3 className="text-sm font-semibold text-dark-light">નવી પૂછપરછ</h3>
          <p className="text-3xl font-bold text-primary mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10">
          <h3 className="text-sm font-semibold text-dark-light">સમીક્ષાઓ</h3>
          <p className="text-3xl font-bold text-primary mt-2">4</p>
        </div>
      </div>
    </div>
  );
}
