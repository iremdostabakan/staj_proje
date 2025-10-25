'use client';

import { Header } from '../components/Header';
import { FooterSection } from '../components/FooterSection';

// HeroSection bileşenini doğru şekilde import ediyoruz.
// components klasörü page.tsx ile aynı seviyede olduğu için göreceli yol kullanılmıştır.
import  HeroSection  from './components/HeroSection';
import ArgeVideolar from './components/ArgeVideo';
import PlaylistButton from './components/PlaylistButton';


 export default  function YardimDokumanlari() {
  return (
    <>
      <Header />
      <HeroSection />
      <ArgeVideolar />
      <PlaylistButton />
      {/* Burada sayfanın diğer içerikleri yer alacak */}
      <FooterSection />
    </>
  );
}