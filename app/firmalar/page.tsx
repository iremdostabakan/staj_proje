"use client";

import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import FirmaPublicList from "./components/FirmaPublicList";
import { FirmaProvider } from '../context/FirmaContext';
import { Divider } from "@mantine/core";
import { HeroSection } from "./components/HeroSection";

export default function FirmalarPage() {
  return (
    <>
    <HeroSection/>
      <title>Firmalar</title>
      <Header />

      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Firmalar</h1>
      <Divider my="md" />

      <FirmaProvider>
      <FirmaPublicList />
    </FirmaProvider>

      <FooterSection />
    </>
  );
}
