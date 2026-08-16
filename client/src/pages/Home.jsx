import { useEffect } from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import About from './About';
import Services from './Services';
import Gallery from './Gallery';
import BeforeAfterSlider from '../components/home/BeforeAfterSlider';
import InstagramSection from '../components/home/InstagramSection';
import Testimonials from './Testimonials';
import Contact from './Contact';
import FadeInSection from '../components/common/FadeInSection';
import QuickBookBar from '../components/common/QuickBookBar';

const Home = () => {
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const offset = 70;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 500); // 500ms delay to allow sections to load/render
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <SEO
        title="બ્રાઇડલ મહેંદી અને નેઇલ આર્ટ"
        description="શ્રી મહેંદી - બ્રાઇડલ મહેંદી, પાર્ટી મહેંદી, નેઇલ આર્ટ, વેક્સિંગ અને ખાટલી વર્ક માટે વિશ્વસનીય નામ. હમણાં જ WhatsApp પર બુક કરો."
        image="/images/logo.jpg"
      />
      
      {/* Home / Hero Section */}
      <div id="home">
        <Hero />
      </div>
      
      <FadeInSection>
        <TrustStats />
      </FadeInSection>

      {/* About Section */}
      <FadeInSection>
        <About />
      </FadeInSection>
      
      {/* Services Section */}
      <Services />

      {/* Before/After slider — ડાબી: મહેંદી, જમણી: ખાલી હાથ */}
      <FadeInSection>
        <BeforeAfterSlider
          mehendiImg="/images/mehendi-both-hands.jpg"
          plainImg="/images/before-plain-hand.jpg"
        />
      </FadeInSection>
      
      <FadeInSection>
        <InstagramSection />
      </FadeInSection>

      {/* Gallery Section */}
      <Gallery />
      
      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Global conversion Quick Book Bar */}
      <QuickBookBar />
    </>
  );
};

export default Home;
