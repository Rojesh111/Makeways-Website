import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import AboutMakeways from '@/components/AboutMakeways';
import Clientele from '@/components/Clientele';
import Services from '@/components/Services';
import CoreValues from '@/components/CoreValues';
import Testimonials from '@/components/Testimonials';
import Founder from '@/components/Founder';
import Footer from '@/components/Footer';
import Awards from '@/components/Awards';
import Portfolio from '@/components/Portfolio';

export default function Home() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSlider />
        <AboutMakeways />
        <CoreValues />
        <Services />
        <Testimonials />
        <Founder />
        <Awards />
        <Clientele />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}