import React from 'react';

export default function Testimonials() {
  const reviews = [
    { name: 'પ્રિયા પટેલ', rating: 5, text: 'ખૂબ જ સરસ બ્રાઇડલ મહેંદી ડિઝાઇન બનાવી આપી! બધાને બહુ જ ગમી.' },
    { name: 'અંજલી શાહ', rating: 5, text: 'નેઇલ આર્ટ માટે બેસ્ટ જગ્યા છે. ફિનિશિંગ ખૂબ જ સરસ છે.' },
    { name: 'કોમલ મહેતા', rating: 5, text: 'હોમ સર્વિસ પણ ખૂબ જ ટાઈમસર અને વ્યવસ્થિત હતી. થેન્ક યુ!' }
  ];

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 text-center">ગ્રાહકોના અભિપ્રાયો</h1>
      <p className="text-center text-dark-light mb-8">અમારા ખુશ ગ્રાહકો તરફથી મળેલ સુંદર સમીક્ષાઓ.</p>

      <div className="space-y-6">
        {reviews.map((rev, idx) => (
          <div key={idx} className="ornate-card bg-white flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <div className="flex text-amber-500 mb-2">
                {Array(rev.rating).fill().map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="italic text-lg text-dark-light">&ldquo;{rev.text}&rdquo;</p>
            </div>
            <span className="font-bold text-primary text-sm whitespace-nowrap bg-primary/5 px-3 py-1 rounded-full">
              - {rev.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
