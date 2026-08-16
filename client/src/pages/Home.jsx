import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import ServicesPreview from '../components/home/ServicesPreview';
import SeasonalBanner from '../components/home/SeasonalBanner';
import GalleryPreview from '../components/home/GalleryPreview';
import BeforeAfterSlider from '../components/home/BeforeAfterSlider';
import InstagramSection from '../components/home/InstagramSection';
import TestimonialsPreview from '../components/home/TestimonialsPreview';
import FadeInSection from '../components/common/FadeInSection';

const Home = () => (
  <>
    <SEO
      title="બ્રાઇડલ મહેંદી અને નેઇલ આર્ટ"
      description="શ્રી મહેંદી - બ્રાઇડલ મહેંદી, પાર્ટી મહેંદી, નેઇલ આર્ટ, વેક્સિંગ અને ખાટલી વર્ક માટે વિશ્વસનીય નામ. હમણાં જ WhatsApp પર બુક કરો."
      image="/images/logo.jpg"
    />
    <Hero />
    
    <FadeInSection>
      <TrustStats />
    </FadeInSection>
    
    <FadeInSection>
      <ServicesPreview />
    </FadeInSection>
    
    <FadeInSection delay={0.1}>
      <SeasonalBanner />
    </FadeInSection>
    
    <FadeInSection>
      <GalleryPreview />
    </FadeInSection>

    <FadeInSection>
      <BeforeAfterSlider 
        beforeImg="/images/before-plain-hand.jpg" 
        afterImg="/images/after-bridal-mehendi.jpg" 
      />
    </FadeInSection>
    
    <FadeInSection>
      <InstagramSection />
    </FadeInSection>
    
    <FadeInSection>
      <TestimonialsPreview />
    </FadeInSection>
  </>
);

export default Home;
