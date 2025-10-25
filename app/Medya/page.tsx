"use client";

import { useEffect, useState } from "react";
import { SimpleGrid, Container, Title } from "@mantine/core";
import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import AOS from "aos";
import "aos/dist/aos.css";

interface MediaItem {
  title: string;
  url: string;
}

export default function MedyaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => setMedia(data))
      .catch((err) => setMedia([]));
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <Container mt="xl">
        <Title order={1} ta="center" mb={50} c="rgb(52, 73, 94)" fw={700}>
          Bizden Kareler
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="1rem">
          {media.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              style={{
                width: "100%",
                paddingTop: "75%",
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={item.url}
                alt={item.title || "Fotoğraf"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </SimpleGrid>
      </Container>
      <FooterSection />
    </>
  );
}
