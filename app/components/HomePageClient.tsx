"use client";

import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { CorporateSection } from "./CorporateSection";
import { NewsSection } from "./NewsSection";
import { Container } from "@mantine/core";
import { FooterSection } from "./FooterSection";
import { BasvuruSection } from "./BasvuruSection";
import Firmalar from "./Firmalar";
import HeroCards from "./HeroCards";
import { DuyurularPreview } from "../Duyurular/components/DuyurularPreview";


export default function HomePageClient() {
  return (
    <>
      <Header />
      <HeroSection />
      <HeroCards />
      <Container size="xl" px="md">
      <CorporateSection />
      <Firmalar />
      <BasvuruSection />
      <NewsSection />
      <DuyurularPreview />
      </Container>
      <FooterSection />
    </>
  );
}
