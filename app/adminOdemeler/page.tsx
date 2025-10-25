"use client";
import { HeroSection } from "../dashboard/components/HeroSection";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { useState } from "react";
import { OdemeProvider } from "../../app/context/OdemeContext";
import { FirmaProvider } from "../../app/context/FirmaContext"; // ✅ EKLE
import { Button, Container, Group, Divider } from "@mantine/core";
import OdemeList from "./components/OdemeList";
import OdemeEditForm from "./components/OdemeEditForm";
export default function Page() {
  const [mode, setMode] = useState<"listele" | "duzenle" | null>(null);

  return (
    <>
      <Header />
      <HeroSection />

      <Container size="md" py="xl">
        {!mode && (
          <Group>
            <Button onClick={() => setMode("listele")}>Listele</Button>
            <Button onClick={() => setMode("duzenle")}>Düzenle</Button>
          </Group>
        )}
        <FirmaProvider>
          <OdemeProvider>
            {mode === "listele" && <OdemeList onBack={() => setMode(null)} />}
            {mode === "duzenle" && <OdemeEditForm onBack={() => setMode(null)} />}
          </OdemeProvider>
        </FirmaProvider>
      </Container>
      <Divider my="md" />
      <FooterSection />
    </>











  );
}
