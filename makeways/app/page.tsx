import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import AboutMakeways from '@/components/AboutMakeways';
import Clientele from '@/components/Clientele';
import Services from '@/components/Services';
import CoreValues from '@/components/CoreValues';
import Testimonials from '@/components/Testimonials';
import Founder from '@/components/Founder';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSlider />
        <AboutMakeways />
        <Clientele />
        <Services />
        <CoreValues />
        <Testimonials />
        <Founder />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}