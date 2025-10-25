"use client";

import {HeroSection} from "./components/HeroSection";
import {PricingSection} from "./components/PricingSection";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

export default function PricingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <PricingSection />
      <FooterSection />
    </>
  );
}
