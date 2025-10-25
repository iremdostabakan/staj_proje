"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Title, Text, Image, Paper, Loader, Center } from "@mantine/core";
import { HeroSection } from "./components/HeroSection";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";

type Firma = {
  id: string;
  firmaAd: string;
  logo: string;
  sektor: string;
  hakkimizda: string;
  firmaEmail: string;
  firmaWeb: string;
  yetkiliAd: string;
  yetkiliTel: string;
  yetkiliEmail: string;
};


export default function FirmaDetayPage() {
  const { id } = useParams();
  const [firma, setFirma] = useState<Firma | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirma() {
      try {
        const res = await fetch(`/api/firmalar/${id}`);
        const data = await res.json();
        setFirma(data);
      } catch (err) {
        console.error("Firma çekilemedi", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchFirma();
  }, [id]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="dots" />
      </Center>
    );
  }

  if (!firma) {
    return <Text>Firma bulunamadı.</Text>;
  }

  return (
    <>
      <Header />
      <HeroSection />

      <Container size="sm" py="xl">
        <Paper shadow="md" radius="md" p="lg" withBorder>
          <Image
            src={firma.logo || "https://placehold.co/400x200?text=No+Logo"}
            alt={`${firma.firmaAd} logosu`}
            height={120}
            fit="contain"
            mb="md"
            style={{ maxWidth: "180px" }}
          />
          <Title order={2} mb="sm">{firma.firmaAd}</Title>
          <Text mt="sm"><strong>Sektör : </strong> {firma.sektor}</Text>
          <Text mt="sm"><strong>Hakkımızda : </strong> {firma.hakkimizda}</Text>
          <Text mt="sm"><strong>E-posta Adresi : </strong> {firma.firmaEmail}</Text>
          <Text mt="sm"><strong>Web Sitesi : </strong> {firma.firmaWeb}</Text>
        </Paper>
      </Container>
      <FooterSection />
    </>
  );
}
