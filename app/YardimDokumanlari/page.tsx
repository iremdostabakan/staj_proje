'use client';

import { Header } from '../components/Header';
import { FooterSection } from '../components/FooterSection';

// HeroSection bileşenini doğru şekilde import ediyoruz.
// components klasörü page.tsx ile aynı seviyede olduğu için göreceli yol kullanılmıştır.
import  HeroSection  from './components/HeroSection';
import OnBasvuru from './components/OnBasvuru';

 export default  function YardimDokumanlari() {
  return (
    <>
      <Header/>
      <HeroSection />
      <OnBasvuru/>
      {/* Burada sayfanın diğer içerikleri yer alacak */}
      <FooterSection/>
    </>
  );
}