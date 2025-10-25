"use client";
import { useEffect, useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { Card, Image, Text, Container, Stack,Button,Group } from "@mantine/core";
import { Header } from "../../components/Header";
import { FooterSection } from "../../components/FooterSection";
import { HeroSection } from "./components/HeroSection";

type Haber = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export default function HaberDetay() {
  const params = useParams();
  const { id } = params;
   const router = useRouter();
  const [haber, setHaber] = useState<Haber | null>(null);

  useEffect(() => {
    async function fetchHaber() {
      try {
        const res = await fetch(`/api/haberler?id=${id}`);
        const data: Haber = await res.json();
        setHaber(data);
      } catch (error) {
        console.error("Haber detay alınamadı:", error);
      }
    }

    fetchHaber();
  }, [id]);

  if (!haber) return <Text>Yükleniyor...</Text>;

  return (
    <>
      <Header  />
      <HeroSection height={150}/>
      <Container  size="md" mt={50} mb={50}>
        <Card shadow="md" padding="lg" radius="md" withBorder   style={{
            overflow: "hidden",
            transition: "all 0.3s",
          }}>
          <Stack gap="md" >
            <Image src={haber.image} alt={haber.title} height={300} radius="md" fit="cover" style={{ transition: "transform 0.3s" }} />
            <Text fw={700} size="xl" style={{ lineHeight: 1.3 }}>{haber.title}</Text>
            <Text size="md" style={{ whiteSpace: "pre-line" }}>{haber.description}</Text>
            <Text size="sm" c="dimmed">{new Date(haber.createdAt).toLocaleDateString()}</Text>

<Group align="right" mt="md">
              <Button
                variant="outline"
                color="blue"
                onClick={() => {
                  // Scroll pozisyonunu koruyarak önceki sayfaya dön
                  router.push(`/News?scroll=${window.scrollY}`);
                }}
              >
                Geri
              </Button>
            </Group>

          </Stack>
        </Card>
      </Container>
      <FooterSection />
    </>
  );
}
