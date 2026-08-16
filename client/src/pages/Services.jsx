import React from 'react';

export default function Services() {
  const servicesList = [
    { title: 'બ્રાઇડલ મહેંદી (Bridal Mehendi)', desc: 'લગ્ન પ્રસંગ માટે ખાસ ટ્રેડિશનલ અને મોર્ડન હેન્ડક્રાફ્ટ ડિઝાઇન.' },
    { title: 'નેઇલ આર્ટ (Nail Art)', desc: 'તમારા નખની સુંદરતા વધારવા માટે ટ્રેન્ડી અને કસ્ટમ આર્ટ ડિઝાઇન.' },
    { title: 'ખાટલી વર્ક (Khatli Work)', desc: 'મોતી, કાચ અને દોરાની પરંપરાગત સુંદર હસ્તકલા.' },
    { title: 'વેક્સિંગ સેવાઓ (Waxing Services)', desc: 'હાઇજીનિક અને સેફ સ્કીન કેર વેક્સિંગ.' },
    { title: 'મહેંદી કોન (Mehendi Cones)', desc: '૧૦૦% નેચરલ, ઓર્ગેનિક અને ડાર્ક કલર આપતા હોમમેઇડ કોન.' }
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-8 text-center">અમારી સેવાઓ</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => (
          <div key={index} className="ornate-card bg-white">
            <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
            <p className="text-dark-light">{service.desc}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-semibold text-secondary">પ્રીમિયમ ક્વોલિટી</span>
              <button className="text-accent-dark hover:text-accent font-bold">વિગતો જુઓ &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
