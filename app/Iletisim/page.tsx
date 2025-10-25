"use client"


import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import Iletisim from "./components/Iletisim";

export default function PricingPage() {
  return (
    <>
      <Header />
      <HeroSection /> 
      <Iletisim/>
      <FooterSection />
    </>
  );
}