"use client";
import HeroVideo from '../components/HeroVideo';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import PhotoGallery from '../components/PhotoGallery';
import ContactInfo from '../components/ContactInfo';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <AboutUs />
      <PhotoGallery />
      <Testimonials />
    
      <ContactInfo />
       <FAQ />
      <Footer />
    </>
  );
}
