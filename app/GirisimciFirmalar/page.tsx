'use client';

import { Header } from '../components/Header';
import { FooterSection } from '../components/FooterSection';

// HeroSection bileşenini doğru şekilde import ediyoruz.
// components klasörü page.tsx ile aynı seviyede olduğu için göreceli yol kullanılmıştır.
import  HeroSection  from './components/HeroSection';
import FaaliyetAdimlari from './components/FaaliyetAdimlari';

 export default  function GirisimciFirmalar() {
  return (
    <>
      <Header/>
      <HeroSection />
      <FaaliyetAdimlari/>
      {/* Burada sayfanın diğer içerikleri yer alacak */}
      <FooterSection/>
    </>
  );
}