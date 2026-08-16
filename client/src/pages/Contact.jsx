import React from 'react';

export default function Contact() {
  const whatsappUrl = 'https://wa.me/918799008221';
  const instagramUrl = 'https://www.instagram.com/pili_mahendi_nail_art_007';

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-8 text-center">સંપર્ક કરો</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="ornate-card bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">અમારો સંપર્ક વિગત</h3>
            <p className="mb-4">શ્રી મહેંદી અને નેઇલ આર્ટ માટે બુકિંગ અથવા પૂછપરછ માટે નીચેના માધ્યમથી સંપર્ક કરો.</p>
            <div className="space-y-3">
              <div>
                <strong className="text-primary block">મોબાઈલ (WhatsApp):</strong>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline">
                  8799008221
                </a>
              </div>
              <div>
                <strong className="text-primary block">ઇન્સ્ટાગ્રામ:</strong>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline">
                  @pili_mahendi_nail_art_007
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold block text-center">
              વોટ્સએપ ચેટ શરૂ કરો
            </a>
          </div>
        </div>

        {/* Contact Form Placeholder */}
        <div className="ornate-card bg-white">
          <h3 className="text-xl font-bold text-primary mb-4">પૂછપરછ ફોર્મ</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">તમારું નામ</label>
              <input type="text" className="w-full border border-primary/20 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">મોબાઈલ નંબર</label>
              <input type="tel" className="w-full border border-primary/20 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">સંદેશો / પૂછપરછ</label>
              <textarea rows="4" className="w-full border border-primary/20 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
            </div>
            <button className="btn-maroon w-full">મોકલો</button>
          </form>
        </div>
      </div>
    </div>
  );
}
