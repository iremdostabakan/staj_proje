"use client";

import { Box, Container, Title, Card, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useMediaQuery } from "@mantine/hooks";

type HaberTipi = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export function NewsSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [haberler, setHaberler] = useState<HaberTipi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    async function fetchHaberler() {
      try {
        const res = await fetch("/api/haberler");
        const data: HaberTipi[] = await res.json();
        setHaberler(data);
      } catch (error) {
        console.error("Haberler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHaberler();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;
  if (!haberler.length) return <p style={{ textAlign: "center" }}>Haber bulunamadı.</p>;

  return (
    <Box py={isMobile ? 30 : 80} data-aos="fade-up">
      <Container size="xl">
        <Title
          order={2}
          size={isMobile ? 28 : 40}
          mb={isMobile ? 20 : 40}
          c="rgb(52, 73, 94)"
          ta="center"
        >
          Haberler
        </Title>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={isMobile ? 15 : 20}
          slidesPerView={isMobile ? 1 : 2}
          navigation
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          style={{ paddingBottom: "20px" }}
        >
          {haberler.map((haber) => (
            <SwiperSlide key={haber._id}>
              <Card
                bg="rgb(52, 73, 94)"
                p={isMobile ? "sm" : "xl"}
                h="auto"
                style={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Group
  align="flex-start"
  gap={isMobile ? "sm" : "md"}
  style={{
    flexDirection: isMobile ? "column" : "row-reverse", // 💡 büyük ekranda sağda, küçük ekranda üstte
    width: "100%",
  }}
>
  {/* Görsel Alanı */}
  {haber.image && (
    <Box
      w={isMobile ? "100%" : 200}
      h={isMobile ? 200 : 150}
      pos="relative"
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Image
        src={haber.image}
        alt={haber.title}
        fill
        style={{ objectFit: "cover" }}
      />
    </Box>
  )}

  {/* Metin Alanı */}
  <Stack flex={1} justify="space-between">
    <Box>
      <Title order={3} c="white" size={isMobile ? 18 : 22} mb="sm">
        {haber.title}
      </Title>
      <Text c="white" size="sm" lineClamp={isMobile ? 2 : 3}>
        {haber.description}
      </Text>
    </Box>
  </Stack>
</Group>

              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
