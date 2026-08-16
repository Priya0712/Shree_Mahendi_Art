import { useSiteSettings } from '../../context/SiteSettingsContext';

const Hero = () => {
  const { heroImage } = useSiteSettings();

  return (
    <section className="relative bg-gradient-to-b from-[#FFF3E0] to-[#FFF8F0] overflow-hidden">
      {/* Decorative mehendi paisley pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/mehendi-pattern.svg')] bg-repeat opacity-5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs tracking-wide bg-[#D4AF37]/20 text-[#8B3A2A] px-3 py-1 rounded-full mb-4 font-medium">
            ✨ બ્રાઇડલ • પાર્ટી • સાઇડર મહેંદી
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6B2E1F] leading-tight mb-4">
            તમારા ખાસ પ્રસંગને <br className="hidden sm:block" />
            <span className="text-[#C1662F]">સુંદર મહેંદી</span> થી શણગારો
          </h1>
          <p className="text-[#4A2E22] text-base sm:text-lg mb-6 max-w-lg mx-auto md:mx-0">
            બ્રાઇડલ મહેંદી, દરેક પ્રકારની મહેંદી, નેઇલ આર્ટ, વેક્સિંગ અને ખાટલી વર્ક — બધું એક જ જગ્યાએ, અનુભવી હાથે.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a href="#contact"
              className="bg-[#6B2E1F] text-white px-6 py-3 rounded-full font-semibold text-center active:scale-95 transition">
              હમણાં બુક કરો
            </a>
            <a href="#gallery"
              className="border-2 border-[#6B2E1F] text-[#6B2E1F] px-6 py-3 rounded-full font-semibold text-center active:scale-95 transition">
              ડિઝાઈન જુઓ
            </a>
          </div>
        </div>

        <div className="flex-1 w-full">
          <img
            src={heroImage || '/images/hero-bridal-mehendi.jpg'}
            alt="બ્રાઇડલ મહેંદી ડિઝાઈન"
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-3xl shadow-xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
